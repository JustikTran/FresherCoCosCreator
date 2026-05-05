import { _decorator, CCInteger, Component, Node, Tween, tween, TweenSystem, Vec3 } from 'cc';
import { Config, GameState } from 'db://assets/scripts/common/Config';
import { StateManage } from 'db://assets/scripts/utils/StateManage';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property(CCInteger)
    speed = 300;
    @property(CCInteger)
    damage = 10;

    init(position: Vec3, damage?: number | null): void {
        this.node.setPosition(position);
        if (damage) {
            this.damage = damage;
        }
    }

    start(): void {
        this.onMove();
    }

    update(dt: number): void {
        if (StateManage.instance.compareState(GameState.PAUSE)) {
            TweenSystem.instance.ActionManager.pauseAllRunningActions();
            return;
        } else {
            TweenSystem.instance.ActionManager.resumeTargets([this.node]);
        }
    }

    onDestroy(): void {
        this.node.destroy();
    }

    onMove(): void {
        tween(this.node)
            .to(2, { position: new Vec3(Config.BULLET_STRAIGHT, this.node.position.y, this.node.position.z) })
            .start();
    }

    public getDamage(): number {
        return this.damage;
    }
}


