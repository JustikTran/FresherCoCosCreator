import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
import { EventType } from 'db://assets/scripts/common/Config';
import { EventManager } from 'db://assets/scripts/core/global/EventManager';
import { Bullet } from 'db://assets/scripts/game_play/bullet/Bullet';
const { ccclass, property } = _decorator;

interface IBossAttacK {
    damage: number,
    worldPosition: Vec3
}

@ccclass('BulletManager')
export class BulletManager extends Component {
    @property({ type: [Prefab] })
    bulletPrefabs: Prefab[] = [];
    @property({ type: Prefab })
    enemyBullet: Prefab = null;

    private _currentBullet: Prefab;

    onLoad(): void {

        EventManager.instance.register(
            EventType.SPAWN_BULLET,
            this._onShoot.bind(this),
            this,
        );

        EventManager.instance.register(
            EventType.ENEMY_ATTACK,
            this._onEnemyAttack.bind(this),
            this,
        );

        EventManager.instance.register(
            EventType.BOSS_ATTACK,
            this._onBossAttack.bind(this),
            this
        )
    }

    private _onShoot(worldPosition: Vec3) {
        this._currentBullet = this.bulletPrefabs[0];
        let spawnPosition = new Vec3();
        this.node.inverseTransformPoint(spawnPosition, worldPosition);
        this._spawnBullet(spawnPosition);
    }

    private _spawnBullet(position: Vec3, damage?: number | null) {
        if (!this._currentBullet) {
            return;
        }

        const bullet = instantiate(this._currentBullet);
        bullet.getComponent(Bullet).init(position, damage);
        bullet.parent = this.node;
    }

    private _onEnemyAttack(worldPosition: Vec3) {
        this._currentBullet = this.enemyBullet;
        let spawnPosition = new Vec3();
        this.node.inverseTransformPoint(spawnPosition, worldPosition);
        this._spawnBullet(spawnPosition);
    }

    private _onBossAttack(attackInfo: IBossAttacK) {
        this._currentBullet = this.enemyBullet;
        let spawnPosition = new Vec3();
        this.node.inverseTransformPoint(spawnPosition, attackInfo.worldPosition);
        this._spawnBullet(spawnPosition, attackInfo.damage);
    }
}


