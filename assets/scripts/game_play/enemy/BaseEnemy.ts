import { _decorator, CCInteger, CircleCollider2D, Collider2D, Component, Contact2DType, Label, log, Node, ProgressBar, RigidBody2D, Size, tween, UIOpacity, UITransform, Vec3 } from 'cc';
import { Bullet } from 'db://assets/scripts/game_play/bullet/Bullet';
const { ccclass, property } = _decorator;

@ccclass('BaseEnemy')
export class BaseEnemy extends Component {
    @property({ group: { name: 'Attributes', displayOrder: 0 }, type: CCInteger })
    hp = 100;
    @property({ group: { name: 'Attributes', displayOrder: 0 }, type: CCInteger })
    damage = 100;
    @property({ group: { name: 'Attributes', displayOrder: 0 }, type: CCInteger })
    speed = 100;
    @property({ group: { name: 'References', displayOrder: 1 }, type: Node })
    target: Node = null;
    @property({ group: { name: 'References', displayOrder: 1 }, type: Node })
    attackPoint: Node = null;
    @property({ group: { name: 'References', displayOrder: 1 }, type: UITransform })
    skin: UITransform = null;
    @property({ group: { name: 'References', displayOrder: 1 }, type: ProgressBar })
    hpProgress: ProgressBar = null;
    @property({ group: { name: 'References', displayOrder: 1 }, type: Node })
    damageLabel: Node = null;

    private _currentHp: number = 0;
    private _parentWidth: number = null;
    private _labelPosition: Vec3 = Vec3.ZERO;
    private _labelString: Label = null;
    private _labelOpacity: UIOpacity;
    private _collider: CircleCollider2D;

    isStopMove: boolean = false;

    init(position: Vec3): void {
        this.node.setPosition(position);
    }

    onLoad(): void {
        this._currentHp = this.hp;
        this._labelPosition = this.damageLabel.position;
        this._labelString = this.damageLabel.getComponent(Label);
        this._labelOpacity = this.damageLabel.getComponent(UIOpacity);
    }

    start(): void {
        this._labelString.string = '';
        this.hpProgress.progress = 1;
        this._parentWidth = this.node.parent.getComponent(UITransform).contentSize.width;
        this.isStopMove = false;
        this.onMove(0);

        this._collider = this.getComponent(CircleCollider2D);
        if (this._collider) {
            this._collider.on(Contact2DType.BEGIN_CONTACT, this._onBeginContact.bind(this), this);
        }
    }

    update(deltaTime: number): void {
        // if (this._checkTarget()) {
        //     console.log(this.target.position.x);

        //     this._onAttack();
        // } else {
        //     this._onMove(deltaTime);
        // }
        if (this._currentHp <= 0) {
            this._collider.off(Contact2DType.BEGIN_CONTACT, this._onBeginContact.bind(this), this);
            this.getComponent(RigidBody2D).enabled = false;

            this.scheduleOnce(() => {
                this.node.destroy();
            }, 0.5);
        }
    }

    private _checkTarget() {
        const targetPosition = this.target.worldPosition;
        const localPosition = new Vec3();
        this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(targetPosition, localPosition);
    }

    onMove(deltaTime: number): void {
        tween(this.node)
            .to(15, { position: new Vec3(-800, this.node.position.y, this.node.position.z) })
            .call(() => this.isStopMove = true)
            .start();
    }

    onAttack(): void {
    }

    private _onHurt(damage: number): void {
        this._currentHp -= damage;
        this._labelString.string = `-${damage}`;
        this.hpProgress.progress = this._currentHp / this.hp;
        this._labelOpacity.opacity = 255;
        tween(this._labelOpacity)
            .to(0.6, { opacity: 0 })
            .start();
    }

    private _onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D): void {
        const dame = otherCollider.getComponent(Bullet).getDamage();
        otherCollider.node.destroy();
        this._onHurt(dame);
    }
}


