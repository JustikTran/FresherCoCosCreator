import { _decorator, CircleCollider2D, Collider2D, Color, Component, Contact2DType, Label, Node, ProgressBar, Sprite, tween, Tween, Vec2, Vec3 } from 'cc';
import { BulletController } from './BulletController';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    @property({ type: Number })
    hp: number;
    @property({ type: Number })
    speed: number;
    @property({ type: Number })
    damage: number;
    @property({ type: Number })
    attackRate: number;
    @property({ type: Boolean })
    isRelativeEnemy: boolean;
    @property({ type: Label })
    dameLabel: Label | null;
    @property({ type: ProgressBar })
    hpProgress: ProgressBar | null;

    private _currentHp: number;
    private _dameLabelBase: Vec3;
    private _sprite: Sprite;

    init(position: Vec2): void {
        this.node.position.set(position.x, position.y);
    }

    onLoad(): void {
        this.dameLabel.string = "";
        this.hpProgress.progress = 1;
        let temp = this.dameLabel.node.position;
        this._dameLabelBase = new Vec3(temp.x, temp.y, 0);
        this._sprite = this.node.getComponentInChildren(Sprite);
    }

    start(): void {
        let collider = this.node.getComponent(CircleCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        } else {
            console.log('not found');
        }

        this._currentHp = this.hp;
    }

    update(deltaTime: number): void {
        this.onMove(deltaTime);
    }


    onHit() {
        Tween.stopAllByTarget(this._sprite);

        tween(this._sprite)
        tween(this._sprite)
            .to(0.1, { color: new Color(255, 0, 0, 255) })
            .to(0.1, { color: new Color(255, 255, 255, 255) })
            .start();
    }

    showDamage(damage: number) {
        const node = this.dameLabel.node;

        Tween.stopAllByTarget(node);

        // node.opacity = 255;
        // node.scale = 0.8;
        node.setPosition(this._dameLabelBase);

        this.dameLabel.string = `-${damage}`;
        node.position.set(node.position.x + (Math.random() - 0.5) * 20);

        tween(node)
            .parallel(
                tween().to(0.5, { y: node.setPosition(node.position.x, node.position.y + 40) }),
                // tween().to(0.5, { opacity: 0 }),
                // tween().to(0.1, { scale: 1.2 }).to(0.2, { scale: 1 })
            )
            .start();
    }

    onMove(dt: number): void {
        let x = this.node.position.x - (this.speed * dt);
        if (this.node.position.x > 0) {
            this.node.position.set(x, 0);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {

        const dame = otherCollider.getComponent(BulletController).getDame();
        // otherCollider.node.destroy();
        this.onHit();
        // this.showDamage(dame);
        this._currentHp -= dame;
    }
}

