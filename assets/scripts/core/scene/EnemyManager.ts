import { _decorator, CCInteger, Component, instantiate, Node, Prefab } from 'cc';
import { BaseEnemy } from 'db://assets/scripts/game_play/enemy/BaseEnemy';
import { RandomIndex, RandomPosition } from 'db://assets/scripts/utils/Random';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property(CCInteger)
    limit = 5;
    @property({ type: [Prefab] })
    enemies: Prefab[] = [];


    start() {

    }

    update(deltaTime: number) {
        if (
            // this.currentTime >= this.secondSpawn &&
            this.limit > this.node.children.length
        ) {
            // this.currentTime = 0;
            this._spawnEnemy();
        }
    }

    private _spawnEnemy() {
        if (this.enemies.length === 0) {
            return;
        }
        let randomIndex = RandomIndex(this.enemies.length);
        let randomPosition = RandomPosition(0, 0, 0, 0);
        let enemy = instantiate(this.enemies[randomIndex]);
        enemy.getComponent(BaseEnemy).init(randomPosition);
        enemy.parent = this.node;
    }
}


