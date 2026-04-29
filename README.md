# 1. **Singleton**

## What

Một class có:

* **1 instance duy nhất trong lifecycle**
* Global access point

---

## Which

Dùng khi:

* Có **shared mutable state toàn game**
* Hoặc resource manager cần reuse

### Ví dụ:

* GameManager
* SceneFlowManager
* AudioManager
* SaveSystem
* PoolManager

---

## Why

### Ưu điểm:

* Truy cập nhanh, không cần inject dependency
* Đảm bảo consistency state

### Nhược điểm:

* Tight coupling → code khó maintain
* Khó unit test
* Hidden dependency (gọi ở mọi nơi)

→ Singleton nên đóng vai trò **“service locator nhẹ”**, không phải business logic container.

---

## How

### Sai lầm phổ biến:

* Tạo singleton bằng constructor → bị recreate khi reload scene
* Không handle lifecycle

---

### Trong Cocos:

```ts
@ccclass('GameManager')
export class GameManager extends Component {
    private static _instance: GameManager;

    static get instance() {
        return this._instance;
    }

    onLoad() {
        if (GameManager._instance) {
            this.node.destroy();
            return;
        }
        GameManager._instance = this;
        director.addPersistRootNode(this.node);
    }
}
```

---

### Advanced:

* Lazy init + async init
* Split thành nhiều manager nhỏ (tránh God object)

---

## Áp dụng thực tế

```text
Scene load → GameManager sống xuyên suốt
           → giữ:
                - player data
                - config
                - current state
```

---

# 2. **Flyweight**

## What

Tách object thành:

* **Intrinsic state** (shared)
* **Extrinsic state** (per-instance)

---

## Which

Khi có:

* Nhiều object giống nhau
* Memory bottleneck
* GC spike

### Ví dụ:

* Bullet
* Enemy config
* Tile map
* Particle

---

## Why

### Ưu điểm:

* Giảm memory footprint
* Tăng cache locality
* Giảm GC

### Nhược điểm:

* Tăng complexity
* Debug khó hơn

---

## How

### Model:

```ts
class EnemyType {
    hp: number;
    speed: number;
    sprite: SpriteFrame;
}

class Enemy {
    type: EnemyType;   // shared
    position: Vec3;    // riêng
    hp: number;        // runtime
}
```

---

## Áp dụng

```text
Bullet:
- sprite, speed → shared
- position → riêng

Enemy:
- config → shared (JSON, ScriptableObject)
- runtime state → riêng
```

---

# 3. **State**

## What

Tách behavior theo từng state → mỗi state là 1 class.

---

## Which

Khi object có:

* Nhiều trạng thái
* Logic thay đổi theo state

---

## Why

### Tránh:

* if/else hell
* state flag chồng chéo

### Đạt được:

* Open/Closed principle
* Dễ extend state mới

---

## How

### Core structure:

```ts
abstract class State<T> {
    protected owner: T;

    constructor(owner: T) {
        this.owner = owner;
    }

    abstract enter(): void;
    abstract update(dt: number): void;
    abstract exit(): void;
}
```

---

### State Machine:

```ts
class StateMachine<T> {
    private current: State<T>;

    change(state: State<T>) {
        this.current?.exit();
        this.current = state;
        this.current.enter();
    }

    update(dt: number) {
        this.current?.update(dt);
    }
}
```

---

### Player example:

```ts
class IdleState extends State<Player> {
    update() {
        if (this.owner.isMoving) {
            this.owner.stateMachine.change(new RunState(this.owner));
        }
    }
}
```

---

## Áp dụng thực tế

```text
Enemy AI:
Idle → Patrol → Chase → Attack → Dead

Scene flow:
Boot → Loading → Home → Gameplay → Pause
```

Đây là pattern nên dùng làm backbone

---

# 4. **Command**

## What

Encapsulate request thành object.

---

## Which

Khi cần:

* Queue action
* Replay
* Undo/Redo
* Network sync

---

## Why

### Ưu điểm:

* Decouple input và logic
* Có thể serialize command

### Nhược điểm:

* Overhead object

---

## How

### Base:

```ts
interface Command {
    execute(): void;
}
```

---

### Input → Command:

```ts
class InputHandler {
    handleInput(): Command {
        if (isKeyPressed('W')) {
            return new MoveCommand(player);
        }
        return null;
    }
}
```

---

### Queue system:

```ts
class CommandQueue {
    private queue: Command[] = [];

    push(cmd: Command) {
        this.queue.push(cmd);
    }

    process() {
        this.queue.forEach(c => c.execute());
        this.queue = [];
    }
}
```

---

## Advanced

### 1. Undo:

```ts
interface Command {
    execute(): void;
    undo(): void;
}
```

### 2. Replay system

* Save command list → replay gameplay

### 3. Lockstep multiplayer

* Sync command thay vì state

---

## Áp dụng thực tế

```text
Input → Command → Player

AI → Command → Enemy

Network → Command → Sync
```

---

# 5. **Observer**

## What

Publish–Subscribe system.

---

## Which

Khi:

* Nhiều system cần phản ứng với event

---

## Why

### Ưu điểm:

* Loose coupling
* Modular

### Nhược điểm:

* Debug khó (event chain)
* Leak nếu không unsubscribe

---

## How

### Production-ready EventBus:

```ts
type EventHandler = (data?: any) => void;

class EventBus {
    private map = new Map<string, Set<EventHandler>>();

    on(event: string, handler: EventHandler) {
        if (!this.map.has(event)) {
            this.map.set(event, new Set());
        }
        this.map.get(event).add(handler);
    }

    off(event: string, handler: EventHandler) {
        this.map.get(event)?.delete(handler);
    }

    emit(event: string, data?: any) {
        this.map.get(event)?.forEach(h => h(data));
    }
}
```

---

### Memory-safe usage:

```ts
onEnable() {
    eventBus.on('HP_CHANGE', this.onHpChange);
}

onDisable() {
    eventBus.off('HP_CHANGE', this.onHpChange);
}
```

---

## Advanced

### 1. Typed EventBus (TypeScript)

```ts
type Events = {
    HP_CHANGE: number;
    PLAYER_DIE: void;
};
```

---

### 2. Event bubbling (Cocos Node)

```ts
node.emit('event');
node.on('event', cb);
```

---

## Áp dụng thực tế

```text
Gameplay → emit event
UI → listen

Enemy chết → emit
UI + Sound + Score đều nhận
```

---

# Tổng hợp kiến trúc thực chiến

## Flow chuẩn trong game:

```text
[Input]
   ↓
Command
   ↓
State Machine
   ↓
Game Logic
   ↓
EventBus (Observer)
   ↓
UI / FX / Audio

Shared data → Flyweight
Global control → Singleton
```

---

# Những lỗi phổ biến

### 1. Lạm dụng Singleton

→ biến thành God Object

---

### 2. State nhưng vẫn dùng if/else

→ mất hết ý nghĩa pattern

---

### 3. Observer không unsubscribe

→ memory leak

---

### 4. Flyweight nhưng vẫn clone data

→ không có tác dụng

---

### 5. Command nhưng execute ngay

→ mất ý nghĩa abstraction

---

# Nếu áp dụng vào project (Cocos)

Nên thiết kế:

### Core systems:

* `GameManager` (Singleton)
* `SceneStateMachine` (State)
* `EventBus` (Observer)
* `CommandSystem` (Input layer)
* `PoolManager` + `DataConfig` (Flyweight)

---
