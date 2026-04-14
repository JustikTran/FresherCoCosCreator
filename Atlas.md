# Atlas
Atlas (Sprite Sheet) là một texture lớn (png) + file index (plist) chứa nhiều ảnh nhỏ được pack lại.

1. **Atlas = Data structure, không chỉ là một image**

Thực chất:
```
Atlas = {
  texture: GPU texture (big image),
  metadata: {
    spriteName → (x, y, width, height, rotation, trim)
  }
}
```
Khi render:
- Engine **không load nhiều texture**
- Chỉ **lấy UV region từ 1 texture lớn**.

2. **Atlas hoạt động dựa trên UV Mapping**

Sprite = Quad + UV Coordinates

Atlas chỉ thay đổi:
`
UV = sub-rectangle của texture lớn
`

3. **Relation với SpriteFrame**

- **Atlas chứa nhiều Sprite Frame**

SpriteFrame = abstraction layer giữa game logic và GPU texture

## What is Atlas do?
**Texture Packing (Memory Optimization)**:
Loại bỏ khoảng trống và giảm memory

**Reduce Draw Calls (CRITICAL)**:
Nhiều sprite từ cùng atlas → render trong 1 draw call

Nếu mỗi sprite dùng texture khác:
```
Sprite A → bind texture A → draw
Sprite B → bind texture B → draw
```
=> nhiều draw call

Với Atlas:
```
bind texture ATLAS
draw sprite A (UV1)
draw sprite B (UV2)
draw sprite C (UV3)
```
=> 1 draw call (batching)

**Resource Management**

Atlas giúp:
- Group asset theo module (UI, character, map)
- Load/unload theo bundle

## Which Atlas system to use?
1. **Static Atlas (Manual / Tool-based)**

    Tools:
    - TexturePacker
    - Zwoptex

    Use when:
    - Game production
    - Asset ổn định

2. **Auto Atlas (Cocos built-in)**

    Merge tự động khi build

    Use when:
    - Workflow đơn giản
    - Không cần control sâu

3. **Dynamic Atlas (runtime) (Cocos Forum)**
    - Merge texture tại runtime
    - Giảm draw call dynamic

Production pipline:
```
Dev phase → Separate images
Optimize phase → Static Atlas
Runtime → Dynamic Atlas hỗ trợ thêm
```

## Why has Atlas been used?
1. **Draw Call là cost lớn nhất**

    CPU phải:

    set texture → bind → draw → repeat

    Cost:
    - State change (expensive)
    - Driver overhead
    - CPU-GPU sync

    Atlas giải quyết:
    reduce state changes
    → reduce draw calls
    → increase FPS

2. **IO & Loading Performance**

    Không dùng atlas:

        100 images → 100 file reads

    Dùng atlas:

        1 atlas → 1 file read

    Giảm:
    - Disk IO
    - Network requests (web/mobile)

3.  **Trade-offs**

    Atlas không phải luôn tốt tuyệt đối:

    Downsides:
    - Load cả atlas dù dùng 1 sprite
    - Texture size lớn → VRAM pressure
    - Fragmentation khi dynamic atlas

    Solution:
    - Split atlas theo scene/module
    - Limit size (1024 / 2048 / 4096)
    - Use lazy loading

## Atlas size limit là bao nhiêu?

Atlas size không có 1 giá trị cố định, mà phụ thuộc vào: **GPU max texture size**

Các mức phổ biến

| Size	| Khi nào dùng |
|:------:| ------------- | 
|1024 x 1024 |	Mobile yếu, low-end
|2048 x 2048 |	Mobile phổ biến (safe choice)
|4096 x 4096 |	Mobile mạnh / tablet / PC
|8192 x 8192 |	PC / high-end GPU (hiếm dùng trong mobile)

Typical values:

|Device	Max  | texture |
| ---------- | ------- |
|Low-end Android |	2048 |
|Mid-range mobile |	4096 |
|High-end mobile |	8192 |
|PC	| 16384 |

**Constraint từ Cocos Dynamic Atlas**

Cocos Creator 2.4 có:

**Dynamic Atlas Manager**

Default config:
- Thường limit khoảng 2048 x 2048

Vì: dynamic atlas cần allocate runtime → phải an toàn cho mọi device

#### # ***Atlas càng lớn:***

Pros:
- Ít texture → ít draw call
- Batching tốt hơn

Cons:
- Tốn VRAM
- Load chậm
- Waste nếu chỉ dùng 1 phần
