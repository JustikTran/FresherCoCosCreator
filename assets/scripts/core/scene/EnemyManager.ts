import { _decorator, CCInteger, Component, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
import { RandomIndex, RandomPosition } from 'db://assets/scripts/utils/Random';
import { Config, EnemyType, EventType } from '../../common/Config';
import { RelativePosition } from '../../game_play/enemy/RelativePosition';
import { AbsolutePosition } from '../../game_play/enemy/AbsolutePosition';
import { Boss } from '../../game_play/enemy/Boss';
import { EventManager } from '../global/EventManager';
import { GameManager } from 'db://assets/scripts/core/global/GameManager';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property(CCInteger)
    limit = 5;

    @property({ group: { name: 'AbsolutePosition', displayOrder: 1 }, type: [Prefab] })
    absoluteEnemies: Prefab[] = [];
    @property({ group: { name: "RelativePosition", displayOrder: 2 }, type: [Prefab] })
    relativeEnemies: Prefab[] = [];
    @property({ group: { name: "Boss", displayOrder: 3 }, type: [Prefab] })
    bosses: Prefab[] = [];

    private _mapEnemies: Map<string, Prefab[]> = new Map();
    private _timeSpawn: number = 0;
    private _currentTotal: number = 0;
    private _isLastBoss: boolean = false;

    start() {
        this._mapEnemies.set(EnemyType.ABSOLUTE, this.absoluteEnemies);
        this._mapEnemies.set(EnemyType.RELATIVE, this.relativeEnemies);
        this._mapEnemies.set(EnemyType.BOSS, this.bosses);

        this._timeSpawn = 0;
        this._currentTotal = 0;
        this._isLastBoss = false;
    }

    update(deltaTime: number) {
        if (this._isLastBoss) {
            return;
        }
        if (this._currentTotal >= this.limit && this.node.children.length === 0 && this._isLastBoss) {
            GameManager.instance.showGameClearPopup();
            return;
        }

        if (this._currentTotal >= this.limit && this._timeSpawn >= Config.SPAWN_BOSS_TIME) {
            this._spawnEnemy(EnemyType.BOSS);
            this._timeSpawn = 0;
            this._isLastBoss = true;
        } else if (this._currentTotal < this.limit && this._timeSpawn >= Config.SPAWN_ENEMY_TIME) {
            if (this._currentTotal >= this.limit / 2) {
                this._randomSpawn();
            } else {
                this._spawnEnemy(EnemyType.RELATIVE);
            }
            this._timeSpawn = 0;
            this._currentTotal++;
            EventManager.instance.emit(EventType.UPDATE_ENEMY_PROGRESS, (this._currentTotal / this.limit));
        } else {
            this._timeSpawn += deltaTime;
        }
    }

    private _randomSpawn() {
        const random = RandomIndex(2);
        switch (random) {
            case 0:
                this._spawnEnemy(EnemyType.ABSOLUTE);
                break;
            case 1:
                this._spawnEnemy(EnemyType.RELATIVE);
                break;
        }
    }

    private _spawnEnemy(enemyType: EnemyType): void {
        if (!this._mapEnemies.has(enemyType)) {
            return;
        }

        const enemies = this._mapEnemies.get(enemyType);
        const randomIndex = RandomIndex(enemies.length);
        let enemy = instantiate(enemies[randomIndex]);
        let randomPosition = new Vec3();
        switch (enemyType) {
            case EnemyType.RELATIVE:
                randomPosition = RandomPosition(0, 0, 0, this.node.getComponent(UITransform).height);
                enemy.getComponent(RelativePosition).init(randomPosition);
                break;
            case EnemyType.ABSOLUTE:
                randomPosition = RandomPosition(0, 0, 0, this.node.getComponent(UITransform).height);
                enemy.getComponent(AbsolutePosition).init(randomPosition);
                break;
            case EnemyType.BOSS:
                randomPosition = new Vec3(0, this.node.getComponent(UITransform).height / 2);
                enemy.getComponent(Boss).init(randomPosition);
                break;
        }
        enemy.parent = this.node;
    }


}


