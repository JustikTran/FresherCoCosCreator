import { _decorator, Component, instantiate, Node, Prefab, Vec2 } from 'cc';
import { mEmitter } from '../utils/EventBus';
import { EventCall } from '../config/State';
import { BulletController } from '../controller/BulletController';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends Component {
    @property({ type: [Prefab] })
    bulletPrefabs: Prefab[] = [];

    private _currentBullet: Node;

    onLoad(): void {
        mEmitter.instance.registerEvent(
            EventCall.SHOOT,
            this.onShoot.bind(this),
            this,
        );
    }

    onShoot(vector2) {
        let spawnPosition = this.node.position.set(vector2.x, vector2.y);

        this.spawnBullet(spawnPosition);
    }

    spawnBullet(position) {
        if (!this._currentBullet) {
            return;
        }

        const bullet = instantiate(this._currentBullet);
        bullet.getComponent(BulletController).init(new Vec2(position));
        bullet.parent = this.node;
    }
}

