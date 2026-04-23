import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {

    @property({ type: [Prefab] })
    enemyPrefabs: Prefab[] = [];

    @property()
    limitEnemy: number = 10;

    
    
    start() {

    }

    update(deltaTime: number) {
        
    }
}

