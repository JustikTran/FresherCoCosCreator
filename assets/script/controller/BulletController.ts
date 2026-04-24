import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, PhysicsSystem2D, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController extends Component {
    @property()
    speed: number = 400;
    @property()
    dame: number = 100;

    private _maxLength: number = 1600;

    init(position: Vec3) {
        this.node.setPosition(position);
    }

    start() {
        // this.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

        this._onMove();
    }

    private _onMove() {
        tween(this.node)
            .to(2, { position: new Vec3(this._maxLength, this.node.position.y, 0) })
            .start();
    }

    getDame() {
        return this.dame;
    }

    onDestroy() {
        this.node.destroy();
    }

    // onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // will be called once when two colliders begin to contact
    //     console.log('onBeginContact');
    //     console.log('self', selfCollider, 'other', otherCollider);
    //     selfCollider.node.destroy();
    // }
}

