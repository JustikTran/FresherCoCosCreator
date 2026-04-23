import { _decorator, Component, Node, Prefab } from 'cc';
import { mEmitter } from '../utils/EventBus';
import { EventCall } from '../config/State';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends Component {
    @property({ type: [Prefab] })
    bulletPrefabs: Prefab[] = [];

    onLoad(): void {
        mEmitter.instance.registerEvent(
            EventCall.SHOOT,
            this.onShoot.bind(this),
            this,
        );
    }

    onShoot(vector2) {
        let spawnPosition = this.node.convertToNodeSpaceAR(vector2);

        this.spawnBullet(spawnPosition.x, spawnPosition.y);
    }

    spawnBullet(x, y) {
        if (!this.currentBullet) {
            return;
        }

        const bullet = instantiate(this.currentBullet);
        bullet.getComponent("BulletController").init(x, y);
        bullet.parent = this.node;
    }
}

