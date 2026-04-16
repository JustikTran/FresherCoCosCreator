### CONTENT
1. [Cache Mode Of Label](#cache-mode-of-label) 
2. [Life cycle callback](#life-cycle-callback) 
----

# CACHE MODE OF LABEL 

## 1. Cache mode là gì?

Cache mode quyết định cách batch text thành texture để render trong GPU.

=> Quyết định cách Label tham gia vào batching graph của render. 

Trong Cocos Creator 2.4: 
- Label cuối cùng đều render qua Assembler &rarr; RenderData &rarr; MeshBuffer
- Texture binding là yếu tố kiểm soát batch  break.
- Text không render trực tiếp như vector
    ```
    Text → Canvas (CPU rasterize) → Texture → GPU render
    ```

Cache mode kiểm soát:
```
(text → texture generation) + (texture lifetime) + (texture sharing)
```

Cache Mode quyết định:
- **Cách tạo texture**
- **Cách reuse texture**
- **Khả năng batching (Draw Call)**

### Internal behavior theo từng mode
#### 1. **NONE** (degenerate path)
- Mỗi Label → 1 bitmap riêng
- Không reuse
- Không tham gia Dynamic Atlas

    => mỗi Label = 1 Draw Call

mỗi lần dirty:
- _updateRenderData() → re-rasterize
- upload texture mới
- texture không vào DynamicAtlasManager

renderer thấy: `unique texture → batch break ngay lập tức`

#### 2. **BITMAP** (Dynamic Atlas path)
- Text → bitmap (giống NONE)
- Có thể join vào Dynamic Atlas
- Cho phép batch với Sprite/Label khác
- rasterize → texture riêng
- sau đó:
    - đưa vào DynamicAtlasManager
    - có thể bị repack

renderer thấy: `shared atlas texture → batch được`

=> giảm Draw Call đáng kể

#### 3. **CHAR** (Glyph cache system)
- Không cache cả string
- Cache từng ký tự (glyph) vào global atlas (2048x2048)

=>  giống cơ chế BMFont runtime

- đi qua:
    
    LetterAtlas → FontAtlas → Glyph cache

- mỗi ký tự:
    - hash theo:
        
        font + size + style + outline

    - atlas global (fixed size)

=> renderer: `tất cả label dùng cùng atlas texture`

| Mode   | Granularity   | Storage             |
| ------ | ------------- | ------------------- |
| NONE   | whole string  | per-label           |
| BITMAP | whole string  | per-label + atlas   |
| CHAR   | per-character | shared global atlas |


## 2. Khi nào dùng mode nào?
### Case 1. Static UI (Menu, HUD) 
=> chọn: `BITMAP`

Lí do:
- atlas packing ổn định
- texture lifetime dài
- không có churn

Nếu dùng CHAR:
- waste atlas vì glyph set nhỏ nhưng phân tán

### Case 2 — Incremental text (score, timer)
=> chọn: `CHAR`

Key insight:
- string thay đổi nhưng `glyph set gần như không đổi`

Ví dụ:
```
"999" → "1000"
```
=> chỉ thêm glyph '1' và '0', reuse phần còn lại

### Case 3 — Large dynamic paragraph
=> KHÔNG có mode nào perfect
|Mode |	Problem |
|-----|---------|
|BITMAP	 | re-rasterize toàn bộ string |
|CHAR |	atlas overflow + layout rebuild |

=> thực tế: dùng BMFont (offline) thay vì TTF + CHAR

### Case 4 — Multi-language (Unicode lớn)
=> tránh CHAR

Vì:
glyph space → explode
→ atlas full rất nhanh

## 3. Vấn đề thật mà Cache Mode giải quyết
### 3.1 Bottleneck không nằm ở text — mà ở state change
GPU pipeline:

`DrawCall cost ≈ texture switch + material switch`

Label nếu không cache:
- mỗi label = texture riêng
- → N draw calls
### 3.2 CPU cost không phải chỉ rasterize
Text rendering gồm:
- Layout (line break, alignment)
- Font rasterization
- Texture upload (rất đắt)

=> upload texture mới mỗi frame = choke bandwidth
### 3.3 Memory fragmentation (vấn đề ít ai để ý)
`BITMAP`

- Nhiều texture nhỏ
- Dynamic Atlas phải:
    - pack
    - repack
    - copy GPU

-> cost ẩn: `GPU memcpy + fragmentation`

`CHAR`
- 1 atlas lớn
- append-only

    => predictable hơn nhưng:
- không reclaim space

## 4. Deep Mechanism — CHAR mode hoạt động thế nào
### 4.1 Glyph cache key

`key = fontFamily + fontSize + color + outline + bold + italic`

=> chỉ cần khác 1 property:
→ glyph mới → tốn atlas
### 4.2 Packing strategy
- simple grid / skyline packing (không tối ưu như bin-packing)
-   không eviction

=> hệ quả:
- fragmentation tăng dần
- cuối cùng full atlas
### 4.3 Failure mode
Khi atlas full:
- không insert glyph mới
- label render thiếu ký tự

=> đây là lỗi production rất khó debug

# 5. BITMAP vs CHAR
| Dimension         | BITMAP      | CHAR         |
| ----------------- | ----------- | ------------ |
| Texture lifecycle | per-label   | global       |
| Update cost       | O(n string) | O(new glyph) |
| Atlas pressure    | thấp        | cao          |
| Predictability    | cao         | thấp         |
| Batch stability   | tốt         | rất tốt      |

# 6. Trade-offs
## 6.1 CHAR không phải lúc nào cũng tốt hơn
Nếu:
- mỗi label dùng font khác
- size khác
- style khác

Thực tế:
- glyph reuse ≈ 0
- → tệ hơn BITMAP
## 6.2 BITMAP + Dynamic Atlas có cost ẩn
mỗi lần atlas full:
- trigger repack
- copy texture

=> spike frame time (micro-stutter)

---
# LIFE CYCLE CALLBACK

## 1. Lifecycle thực chất là gì
Theo doc, lifecycle là các callback như:
- onLoad
- start
- update
- lateUpdate
- onDestroy
- onEnable
- onDisable

Nhưng bản chất thật:
> Lifecycle = contract giữa Component và Game Loop Scheduler

Cocos runtime có 3 layer chính:
```
Scene Graph (Node tree)
→ Component System
→ Scheduler (frame loop)
```
Lifecycle chính là:
- Hook vào từng phase của frame pipeline
- Được engine gọi tự động, dev không control trực tiếp

**Core abstraction**

Lifecycle không phải “event ngẫu nhiên”, mà là:
```
INIT PHASE
→ ACTIVATION PHASE
→ FRAME LOOP
→ TEARDOWN
```
Mapping:
| Phase      | Callback           |
| ---------- | ------------------ |
| Init       | onLoad             |
| Activate   | onEnable, start    |
| Frame      | update, lateUpdate |
| Deactivate | onDisable          |
| Destroy    | onDestroy          |

## 2. EXECUTION MODEL — Cách engine thực thi lifecycle
### 2.1 Order chuẩn (theo doc)

onLoad → onEnable → start → update → lateUpdate → onDisable → onDestroy

### 2.2 Nhưng thực tế (chạy trong Game Loop)
Frame pipeline (simplified):
```
for each frame:
  1. process input
  2. update components (update)
  3. animation / physics step
  4. lateUpdate
  5. render
```
Mapping: 
| Engine phase  | Lifecycle          |
| ------------- | ------------------ |
| before frame  | start (first time) |
| update step   | update             |
| post-update   | lateUpdate         |
| destroy queue | onDestroy          |

### 2.3 Lazy execution
- start() không chạy ngay khi load
- deferred đến frame đầu tiên
 
* doc nói rõ:
- start chạy trước update lần đầu

=> nghĩa là:
```
onLoad → (wait frame) → start → update
```

## 3. Lifecycle dùng như thế nào
### onLoad — INIT
đảm bảo:
- node tree đã tồn tại
- resource đã bind

=> dùng cho:
- cache reference
- build dependency graph
- init static data

### start — RUNTIME INIT
chạy khi:
- component active
- trước frame loop

=> dùng cho:
- state có thể thay đổi runtime
- reset timer
- logic phụ thuộc activation

### update — LOGIC LOOP
- gọi mỗi frame
- là hot path

=> mọi thứ trong này = performance critical

### lateUpdate — POST-SYNC PHASE
chạy sau:
- animation
- physics
- tất cả update khác

=> dùng cho:
- camera follow
- constraint correction
- post-processing transform

### onEnable / onDisable — STATE TRANSITION
trigger khi:
- component.enabled OR node.active thay đổi

đây là:
- lifecycle của "active state", không phải lifecycle của object
### onDestroy — DEFERRED CLEANUP
gọi khi destroy()

nhưng:
- object chưa bị remove ngay
- bị collect cuối frame

=> destroy() ≠ immediate delete

## Lifecycle là “implicit dependency system”
Ví dụ:
```
A.onLoad()
B.onLoad()
```
=> không đảm bảo order giữa A và B

→ nhưng đảm bảo:

Tất cả onLoad xong → mới tới start

Đây là: `barrier synchronization`

## update là nơi dễ tạo bug nhất
Vì:
- chạy mỗi frame
- không có transaction boundary

=> bug thường:
- race logic
- order dependency
- hidden state mutation

## lateUpdate = deterministic correction layer
Use case classic:
- Player move (update)
- Camera follow (lateUpdate)

Nếu không:
- Camera lag / jitter

## onEnable/onDisable = hook cho event system
Best practice:
```
onEnable() {
  event.on(...)
}

onDisable() {
  event.off(...)
}
```
Nếu không:
- Memory leak
- Ghost listener

## Lifecycle phụ thuộc vào Node, không phải Component thuần
onLoad phụ thuộc:
- node activation

Không phải object creation

## Common Pitfalls
### Sai lầm 1 — `dùng start thay onLoad`
→ mất control init order
### Sai lầm 2 — `logic nặng trong update`
→ drop FPS
### Sai lầm 3 — `destroy trong loop`
→ side-effect khó đoán
### Sai lầm 4 — `quên unregister event`
→ memory leak
### Sai lầm 5 — `phụ thuộc order giữa component`
→ nondeterministic bug

## Lifecycle liên quan gì tới render pipeline?
Trong Cocos:
```
Lifecycle (onLoad/start/update)
    → thay đổi state (position, color, text, sprite…)
    → mark dirty
    → rebuild RenderData
    → push vào MeshBuffer
    → batch (nếu đủ điều kiện)
    → draw call
```
=> Lifecycle `không render trực tiếp`, nhưng quyết định `“khi nào và bao nhiêu dữ liệu render bị invalid”`

## Lifecycle → ảnh hưởng trực tiếp đến batching
Batching phụ thuộc vào 3 thứ:
1. texture
2. material
3. vertex buffer continuity

Lifecycle phá vỡ batching khi:
- thay đổi texture (Label, Sprite)
- thay đổi material
- làm dirty vertex liên tục