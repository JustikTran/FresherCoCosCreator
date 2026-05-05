import { _decorator, Component, Node, sp, Vec3, UITransform, CCInteger, CCFloat, Tween } from 'cc';
import { EventType, GameState } from 'db://assets/scripts/common/Config';
import { EventManager } from 'db://assets/scripts/core/global/EventManager';
import { StateManage } from 'db://assets/scripts/utils/StateManage';
const { ccclass, property } = _decorator;

@ccclass('Character')
export class Character extends Component {
    @property({ group: { name: 'Attributes', displayOrder: 0 }, type: CCInteger })
    speed = 10;
    @property({ group: { name: 'Attributes', displayOrder: 1 }, type: CCFloat })
    attackRate = 0.5;
    @property({ group: { name: 'References', displayOrder: 1 }, type: Node })
    sprite: Node = null;
    @property({ group: { name: 'References', displayOrder: 1 }, type: sp.Skeleton })
    animation: sp.Skeleton = null;
    @property({ group: { name: 'References', displayOrder: 1 }, type: Node })
    shootPoint: Node = null;

    private _direction: Vec3 = Vec3.ZERO;
    private _velocity: Vec3 = new Vec3();
    private _isShooting: boolean = false;
    private _isSpawning: boolean = false;
    private _lastShootTime: number = 0;

    start() {
        EventManager.instance.register(EventType.MOVE, this._onMove.bind(this), this);
        EventManager.instance.register(EventType.STOP, this._onStop.bind(this), this);
        EventManager.instance.register(EventType.SHOOT, this._onShoot.bind(this), this);
        this._spawn();
        this._lastShootTime = 0;
    }

    update(deltaTime: number) {
        if (StateManage.instance.compareState(GameState.PAUSE)) {
            return;
        }

        if (this._isSpawning) {
            return;
        }

        if (this._isShooting) {
            return;
        }

        this._velocity = this._velocity.clone().lerp(this._direction, 0.2);
        const parent = this.node.parent;

        let newX = this.node.position.x + this._velocity.x * this.speed * deltaTime;
        let newY = this.node.position.y + this._velocity.y * this.speed * deltaTime;

        let clampedX = Math.max(0, Math.min(parent.getComponent(UITransform).width, newX));
        let clampedY = Math.max(0, Math.min(parent.getComponent(UITransform).height, newY));

        if (clampedX !== newX) {
            this._velocity.x = 0;
        }
        if (clampedY !== newY) {
            this._velocity.y = 0;
        }

        this.node.setPosition(clampedX, clampedY);

        if (this._velocity.length() > 0.01) {
            if (this.animation.animation !== "run") {
                this.animation.setAnimation(0, 'run', true);
            }
        } else {
            if (this.animation.animation !== "idle") {
                this.animation.setAnimation(0, 'idle', true);
            }
        }
    }

    onDestroy(): void {
        EventManager.instance.unregister(EventType.MOVE, this._onMove.bind(this), this);
        EventManager.instance.unregister(EventType.STOP, this._onStop.bind(this), this);
        EventManager.instance.unregister(EventType.SHOOT, this._onShoot.bind(this), this);
    }

    private _spawn() {
        this._isSpawning = true;
        this.animation.setAnimation(0, 'portal', false);
        this.animation.setCompleteListener(() => {
            this._isSpawning = false;
            this.animation.setAnimation(0, 'idle', true);
        });
    }

    private _onMove(direction: Vec3) {
        this._direction = direction.clone();
    }

    private _onStop() {
        this._direction = Vec3.ZERO;
    }

    private _onShoot() {
        if (StateManage.instance.compareState(GameState.PAUSE)) {
            return;
        }

        if (this._isShooting || this._isSpawning) {
            return;
        }
        if (!this._canShoot()) {
            return;
        }
        const now = performance.now() / 1000;
        this._lastShootTime = now;

        this._isShooting = true;
        this.animation.setAnimation(0, 'shoot', false);
        // this.animation.setAnimation(1, 'idle', false);
        this.animation.setCompleteListener(() => {
            this._isShooting = false;
        });
        this.animation.setAnimation(0, this._velocity.length() > 0 ? "run" : "idle", true);
    }

    private _canShoot(): boolean {
        const now = performance.now() / 1000;
        return now - this._lastShootTime >= this.attackRate;
    }

    public getShootPosition(): Vec3 {
        return this.shootPoint.worldPosition;
    }
}


