import { _decorator, Color, Component, Label, Node, ProgressBar, tween, Tween, Vec2 } from 'cc';
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

    _dameLabelBase: Vec2;

    init(position: Vec2): void {
        this.node.position.set(position.x, position.y);
    }

    // onLoad(): void {
    //     let temp = this.dameLabel.node.position;
    //     this._dameLabelBase = new Vec2(temp.x, temp.y);
    // }

    start(): void {
        // this.dameLabel.string = "";
        // this.hpProgress.progress = 1;
    }

    update(deltaTime: number): void {
        this.onMove(deltaTime);
    }

    onHit() {
        Tween.stopAllByTarget(this.node);

        tween(this.node)
            // .to(0.1, { color: Color.RED })
            // .to(0.1, { color: Color.WHITE })
            .start();
    }

    showDamage(damage) {
        // const node = this.dameLabel.node;

        // cc.Tween.stopAllByTarget(node);

        // node.opacity = 255;
        // node.scale = 0.8;
        // node.setPosition(this.labeBase);

        // this.dameLabel.string = `-${damage}`;
        // node.x += (Math.random() - 0.5) * 20;

        // cc.tween(node)
        //     .parallel(
        //         cc.tween().to(0.5, { y: node.y + 40 }),
        //         cc.tween().to(0.5, { opacity: 0 }),
        //         cc.tween().to(0.1, { scale: 1.2 }).to(0.2, { scale: 1 })
        //     )
        //     .start();
    }

    onMove(dt: number): void {
        let x = this.node.position.x - (this.speed * dt);
        if (this.node.position.x > 0) {
            this.node.position.set(x, 0);
        }
    }
}

