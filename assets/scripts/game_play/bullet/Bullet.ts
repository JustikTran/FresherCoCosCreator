import { _decorator, CCInteger, Component, Node, tween, Vec3 } from 'cc';
import { Config } from 'db://assets/scripts/common/config';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property(CCInteger)
    speed = 300;
    @property(CCInteger)
    damage = 10;

    init(position: Vec3): void {
        this.node.setPosition(position);
    }

    start(): void {
        this._onMove();
    }

    onDestroy(): void {
        this.node.destroy();
    }

    private _onMove(): void {
        tween(this.node)
            .to(2, { position: new Vec3(Config.BULLET_STRAIGHT, this.node.position.y, this.node.position.z) })
            .start();
    }

    public getDamage(): number {
        return this.damage;
    }
}


