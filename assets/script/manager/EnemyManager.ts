import { _decorator, Collider2D, Component, Contact2DType, EPhysics2DDrawFlags, IPhysics2DContact, Node, PhysicsSystem2D, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {

    @property({ type: [Prefab] })
    enemyPrefabs: Prefab[] = [];

    @property()
    limitEnemy: number = 10;

    onLoad(): void {
        PhysicsSystem2D.instance.enable = true;
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
            EPhysics2DDrawFlags.Pair |
            EPhysics2DDrawFlags.CenterOfMass |
            EPhysics2DDrawFlags.Joint |
            EPhysics2DDrawFlags.Shape;
    }

    start() {

    }

    update(deltaTime: number) {

    }

}

