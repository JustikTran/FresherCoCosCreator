import { _decorator, Collider2D, Component, Contact2DType, director, EPhysics2DDrawFlags, instantiate, IPhysics2DContact, log, Node, PhysicsSystem2D, Prefab, Vec2, Vec3 } from 'cc';
import { mEmitter } from '../utils/EventBus';
import { EventCall } from '../config/State';
import { BulletController } from '../controller/BulletController';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends Component {
    @property({ type: [Prefab] })
    bulletPrefabs: Prefab[] = [];

    private _currentBullet: Prefab;

    onLoad(): void {

        this._currentBullet = this.bulletPrefabs[0];
        mEmitter.instance.registerEvent(
            EventCall.SHOOT,
            this.onShoot.bind(this),
            this,
        );
    }

    start(): void {
    }

    onShoot(worldPosition: Vec3) {
        let spawnPosition = new Vec3();
        this.node.inverseTransformPoint(spawnPosition, worldPosition);
        this.spawnBullet(spawnPosition);
    }

    spawnBullet(position: Vec3) {
        if (!this._currentBullet) {
            return;
        }

        const bullet = instantiate(this._currentBullet);
        bullet.getComponent(BulletController).init(position);
        bullet.parent = this.node;
    }


}

