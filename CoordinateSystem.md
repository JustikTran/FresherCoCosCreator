# Coordinate System
1. ## What is Cocos Creator’s Coordinate system? 
### Definition
Cocos Creator sử dụng **`Cartesian right-handed  coordinate system`** (tọa độ Descartes tay phải)
    
- Origin (0,0) nằm góc dưới bên trái.
- Trục: 
    
    - X -> hướng sang phải
    - Y -> hướng lên trên
    - Z -> hướng ra ngoài màn hình

### Không phải **`screen space`**
Cocos không dùng hệ trục toạ độ màn hình (top-left origin) như iOS/Android:

| System     | Origin    | Y direction   |
| ------ | ------ | ----------- |
| Screen (UI native)     | Top-Left  | down  |
| Cocos (OpenGL)     | Bottom-left   | up   |

Cocos kế thừa từ OpenGL pipeline, nên dùng hệ này để: 
- Đồng nhất với GPU pipeline.
- Tránh transform liên tục giữa CPU <-> GPU.
### Là hệ 3 layer  coordinate system
Không chỉ có 1 hệ toạ độ:
1. #### **Local Coordinate (per node)**
- Liên quan tương đối (relative) với parent node
- Mỗi node = 1 coordinate system riêng.
2. #### **World Coordinate** 
- Hệ trục tuyệt đối (Absolute coordinate) của toàn scene
=> engine sẽ resolve từ local &rarr; world.  
3. #### **Screen Coordinate**
-  Sau khi qua camera projection

=> pipeline thực tế:
```
Local -> (parent transform) -> World  -> (Camera) -> Screen 
```
2. ## What does the Coordinate system do? 
### Chức năng chính (main feature)
Coordinate  system  dùng để :
1. #### **Define  spatial  positioning**
- Xác định vị trí của node trong không gian
- Thông qua Position(x, y)
2. #### **Drive transform system (core of engine)
    Mọi transform đều phụ thuộc coordinate:
- Position
- Rotation
- Scale 
- Anchor 

    => **Transform Matrix composition**
3. #### **Support hierarchical scene graph**
    Cocos dùng **tree structure (scene graph)**
    ```
    NodeA
 
    └── NodeB

        └── NodeC
    ```
    - NodeB position = relative NodeA
    - NodeC = relative NodeB

    **_Engine resolve_**:
    WorldPosition = ParentMatrix * LocalMatrix

4. #### **Enable relative transformations**
Ví dụ: 
- Move parent &rarr; child auto move
- Rotate parent &rarr; child rotate theo parent

    => **transform propagation**

5. #### **Anchor-based coordinate pivot**
    Anchor quyết định
```
pivot point = anchor * size
```

- (0.5, 0.5) -> center
- (0.5, 0) -> bottom-center
- (0.5, 1) -> top-center
- (0, 0.5) -> left-center
- (0, 0) -> bottom-left
- (0, 1) -> top-left
- (1, 0.5) -> center-left 
- (1, 0) -> right-bottom
- (1, 1) -> top-right

    Nó ảnh hưởng trực tiếp tới:
    - Rotation center 
    - Scaling origin 
    - Child coordinate origin

3. ## Which is the Coordinate system to be used?
Primary system: Cartesian right-handed coordinate system (Cocos/OpenGL)
1. ### Local coordinate (MOST USED)
- Khi set node.position
- Khi làm UI / gameplay logic
- Đây là coordinate bạn thao tác 90% thời gian

2. ### World coordinate
    Khi:
- Raycast
- Physics
- Global positioning
- Camera calculations

3. ### Screen coordinate
- UI interaction
- Input (touch/mouse)

    **Conversion APIs**
    ```
    node.convertToWorldSpaceAR()
    node.convertToNodeSpaceAR()
    ```

4. ## Why has the Coordinate system been used?
Engineering reasoning
1. ### Compatibility (khả năng tương thích) với Graphics Pipeline

Cocos dựa trên:

- OpenGL (và sau này WebGL / Metal / Vulkan abstraction)

GPU sử dụng:
- Right-handed Cartesian system

Nếu không dùng:
- Phải convert liên tục
- Giảm performance

2. ### Mathematical simplicity
**Vector math đơn giản:**
- position = (x, y)
- distance = sqrt(x² + y²)

**Transform matrix:**

T * R * S

**Foundation của:**
- Physics
- Animation
- Rendering

3. ### **Scene Graph architecture**
Cocos dùng:

`Hierarchical Transform System`

Nếu không có coordinate system chuẩn:
- Không thể propagate transform
- Không thể nesting UI/game objects

4. ### **Anchor-based design (Cocos-specific)**
Một điểm rất đặc biệt:

Child node lấy **anchor của parent làm origin**

**Ý nghĩa:**
- UI layout dễ hơn
- Center-based design (default 0.5,0.5)
- Align object thuận tiện

## **Flow with flow**
```
Node local → Parent → World → Camera → Screen
```