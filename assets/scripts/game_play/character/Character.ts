import { _decorator, Component, EventKeyboard, Input, input, Node, sp, Vec3, director, UITransform } from 'cc';
import { EventType } from 'db://assets/scripts/common/config';
import { EventManager } from 'db://assets/scripts/core/global/EventManager';
const { ccclass, property } = _decorator;

@ccclass('Character')
export class Character extends Component {
    @property(Number)
    speed: number = 10;

    @property({ group: { name: 'References', displayOrder: 0 }, type: Node })
    sprite: Node = null;
    @property({ group: { name: 'References', displayOrder: 0 }, type: sp.Skeleton })
    animation: sp.Skeleton = null;
    @property({ group: { name: 'References', displayOrder: 0 }, type: Node })
    shootPoint: Node = null;

    private _direction: Vec3 = Vec3.ZERO;
    private _velocity: Vec3 = new Vec3();
    private _target: Vec3 = new Vec3();
    private _isShooting: boolean = false;

    start() {
        EventManager.instance.register(EventType.MOVE, this._onMove.bind(this), this);
        EventManager.instance.register(EventType.STOP, this._onStop.bind(this), this);
    }

    update(deltaTime: number) {
        this._velocity = this._velocity.clone().lerp(this._direction, 0.2);
        if (this._isShooting) {
            return;
        }
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
    }

    private _onMove(direction: Vec3) {
        this._direction = direction.clone();
    }

    private _onStop() {
        this._direction = Vec3.ZERO;
    }

    public getShootPosition(): Vec3 {
        return this.shootPoint.worldPosition;
    }
}


