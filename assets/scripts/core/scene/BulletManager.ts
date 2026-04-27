import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
import { EventType } from 'db://assets/scripts/common/config';
import { EventManager } from 'db://assets/scripts/core/global/EventManager';
import { Bullet } from 'db://assets/scripts/game_play/bullet/Bullet';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends Component {
    @property({ type: [Prefab] })
    bulletPrefabs: Prefab[] = [];

    private _currentBullet: Prefab;

    onLoad(): void {

        this._currentBullet = this.bulletPrefabs[0];
        EventManager.instance.register(
            EventType.SPAWN_BULLET,
            this._onShoot.bind(this),
            this,
        );
    }

    private _onShoot(worldPosition: Vec3) {
        let spawnPosition = new Vec3();
        this.node.inverseTransformPoint(spawnPosition, worldPosition);
        this._spawnBullet(spawnPosition);
    }

    private _spawnBullet(position: Vec3) {
        if (!this._currentBullet) {
            return;
        }

        const bullet = instantiate(this._currentBullet);
        bullet.getComponent(Bullet).init(position);
        bullet.parent = this.node;
    }
}


