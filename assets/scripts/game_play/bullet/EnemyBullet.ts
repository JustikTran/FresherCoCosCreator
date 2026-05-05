import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { Config } from 'db://assets/scripts/common/Config';
import { Bullet } from 'db://assets/scripts/game_play/bullet/Bullet';
const { ccclass, property } = _decorator;

@ccclass('EnemyBullet')
export class EnemyBullet extends Bullet {

    start() {
        super.start();
    }

    onMove(): void {
        tween(this.node)
            .to(2, { position: new Vec3(this.node.position.x - Config.BULLET_STRAIGHT, this.node.position.y, this.node.position.z) })
            .start();
    }

    public setDame(dame: number): void {
        this.damage = dame;
    }
}


