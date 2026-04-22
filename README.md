# TOWER DEFENSE (Demo)

### **Content**

1. [Game play](#game-play)
2. [Player](#player)
3. [Enemy](#enemy)
4. [Tower](#tower)
5. [UI](#ui)

## **Game Play**

Người chơi sẽ def thành khỏi cuộc tấn công qua từng đợt của quái vật.

- Defend thành công khi vượt qua tất cả các cuộc tấn công mà không làm sập thành
- Defend thất bại khi toà thành hết máu.

## **Player**

### Attributes

- Attack (ATK)
- Speed (SPD)
- Attack Rate (ATR)
- Critical Rate (CRI)
- Critical Damage (CRD)

### Control:

- **Move**: UP, DOWN, LEFT, RIGHT (W, S, A, D)
- **Skill**:
  - Normal attack: SPACE
  - Skill 1: Q
  - Skill 2: E

## **Enemy**

### Normal Enemy

Xuất hiện ngẫu nhiên trong giai đoạn quái tấn công. Tăng dần số lượng quái xuất hiện khi càng về giai đoạn cuối của màn chơi.

#### `Relative Position`:

Random vị trí xuất hiện, tiến gần đến Tower và tấn công Tower.

- **Wolf**:
  - HP: 150
  - Speed: 200
  - Attack Damage: 10
  - Attack Rate: 0.25s

- **Two-headed Dog**:
  - HP: 250
  - Speed: 150
  - Attack Damage: 35
  - Attack Rate: 0.5s

#### `Absolute Position`:

Random vị trí xuất hiện, không di chuyển về phía thành nhưng sẽ tấn công từ xa.

- **Knight Gun**:
  - HP: 500
  - Speed Bullet: 200
  - Attack Damage: 15
  - Attack Rate: 0.5s

- **Bear Gun**:
  - HP: 200
  - Speed Bullet: 200
  - Attack Damage: 12
  - Attack Rate: 0.25s

- **Flare Gun**:
  - HP: 150
  - Speed Bullet: 200
  - Attack Damage: 10
  - Attack Rate: 0.2s

- **Box Gun**:
  - HP: 100
  - Speed Bullet: 200
  - Attack Damage: 5
  - Attack Rate: 0.1s

### Boss

Random vị trí xuất hiện và tiến gần về Tower, tấn công từ xa tầm trung. Chỉ xuất hiện vào cuối giai đoạn quái.

- **Dragon**:
  - HP: 1500
  - Speed: 100
  - Attack Damage: 150
  - Attack Rate: 1s

## **Tower**

### Attributes

- HP: 3000

## **UI**

### Control

- `Progress bar`: tiến trình tấn công của quái.
- `Progress bar`: HP của Tower.
- `Progress bar`: HP của Enemy.
- `Button`: Setting button (show popup setting).
- `Button`: Player skill.

### Popup

- `Setting Popup`: Control tiếp tục, chơi lại hay thoát game.
- `Win Popup`: Thông báo chiến thắng.
- `Defeat Popup`: Thông báo thất bại.

## **Manager**

- `PlayerManager`: Quản lý các sự kiện của player (dùng skill, di chuyển)
- `TowerManager`: Quản lý các sự kiện của Tower (nhận sát thương, reset state)
- `EnemyManager`: Quản lý các sự kiện của Enemy (spawn enemy, enemy nhận sát thương, enemy tấn công Tower, reset enemy state)
- `GameManager`: Quản lý các sự kiện toàn cục (setting, popup)
- `SkillManager`: Quản lý sự kiện tấn công (spawn bullet, skill).
- `SoundManager`: Quản lý sound và sfx.
