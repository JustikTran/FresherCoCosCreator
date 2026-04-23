import { _decorator, Component, Node, Vec2, sp, v2, UITransform } from 'cc';
import { EventCall, EventMove } from '../config/State';
import { mEmitter } from '../utils/EventBus';
const { ccclass, property } = _decorator;

@ccclass('CharacterController')
export class CharacterController extends Component {
    @property()
    speed: number = 100;
    @property({ type: sp.Skeleton })
    animation: sp.Skeleton;
    @property({ type: Node })
    sprite: Node;
    @property({ type: Node })
    shootPoint: Node;

    //#region private property
    _isShooting: boolean;
    _velocity: Vec2 = Vec2.ZERO;
    _targetDirection: Vec2 = Vec2.ZERO;
    //#endregion

    onLoad(): void {

        this.animation.setMix("idle", "shoot", 0.05);
        this.animation.setMix("walk", "shoot", 0.05);

        mEmitter.instance.registerEvent(
            EventCall.MOVE,
            this.onMove.bind(this),
            this,
        );

        mEmitter.instance.registerEvent(
            EventCall.STOP,
            this.onStopMove.bind(this),
            this,
        );

        mEmitter.instance.registerEvent(
            EventCall.SHOOT,
            this.onShoot.bind(this),
            this,
        );
    }

    start(): void {
        this._isShooting = false;
        this._velocity = Vec2.ZERO;
        this._targetDirection = Vec2.ZERO;
    }

    update(deltaTime: number): void {
        this._velocity = this._velocity.clone().lerp(this._targetDirection, 0.2);
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
            if (this.animation.animation !== "walk") {
                this.animation.setAnimation(0, 'walk', true);
            }
        } else {
            if (this.animation.animation !== "idle") {
                this.animation.setAnimation(0, 'idle', true);
            }
        }
    }

    onMove(param: EventMove): void {
        switch (param) {
            case EventMove.UP:
                this._targetDirection = new Vec2(0, 1);
                break;
            case EventMove.DOWN:
                this._targetDirection = new Vec2(0, -1);
                break;
            case EventMove.LEFT:
                this._targetDirection = new Vec2(-1, 0);
                break;
            case EventMove.RIGHT:
                this._targetDirection = new Vec2(1, 0);
                break;
        }

        this._targetDirection = this._targetDirection.normalize();
    }

    onStopMove(): void {
        this._targetDirection = Vec2.ZERO;
        this._targetDirection = this._targetDirection.normalize();
    }

    onShoot(): void {
        if (this._isShooting) {
            return;
        }
        this._isShooting = true;
        this.animation.setAnimation(1, "shoot", false);
        this.animation.setAnimation(0, "idle", false);
        this.animation.setCompleteListener(() => {
            this._isShooting = false;
        });
        this.animation.addAnimation(0, this._velocity.length() > 0 ? "walk" : "idle", true);
    }

    public getShootPoint(): Vec2 {
        return new Vec2(this.node.worldPosition.x, this.node.worldPosition.y);
    }
}

