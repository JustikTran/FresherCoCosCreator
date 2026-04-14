# Auto Atlas
## 1. **WHAT – Auto Atlas là gì (bản chất kỹ thuật)**
Auto Atlas = static texture packing system (offline build-time optimization)

- Là cơ chế tự động gom nhiều SpriteFrame → 1 texture atlas (sprite sheet)
- Diễn ra trong build pipeline, không phải runtime
- Input: nhiều file ảnh rời (png, jpg,…)
- Output:
    - 1 hoặc nhiều texture atlas
        - mapping UV (SpriteFrame giữ config gốc)

## 2. **WHICH – Khi nào dùng Auto Atlas**

***UI-heavy game***
- nhiều icon nhỏ
- HUD, menu

=> texture nhỏ → pack hiệu quả

***2D game sprite system***

- animation frame
- tile-based

=> batching tốt hơn

***Build optimization phase***
- project đã ổn định asset structure

=> Auto Atlas phụ thuộc folder structure

### Khi **KHÔNG** nên dùng

<u>Texture quá lớn:</u>
vượt Max Atlas size → bị “Unpacked”

<u>Asset dùng riêng lẻ (không share material):</u>
không batch được → atlas vô nghĩa

<u>Dynamic content (runtime load):</u>
nên dùng Dynamic Atlas thay vì Auto Atlas

So sánh với Dynamic Atlas
|Feature |	Auto Atlas |	Dynamic Atlas|
|--------|-------------|-----------------|
|Thời điểm |	Build-time |	Runtime |
|Control |	Static |	Dynamic |
|Performance |	ổn định |	phụ thuộc runtime |
|Use case |	UI, static sprite |	dynamic asset |

## 3. **WHY – Tại sao cần Auto Atlas**
- Giảm Draw call (tương tự dynamic Atlas)
- Memory & package optimization
    - Loại bỏ khoảng trống ảnh (packing)
    - Có thể remove asset gốc sau build