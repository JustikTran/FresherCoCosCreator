import { _decorator, CCInteger, Component, Label, Node, ProgressBar, Size, tween, UITransform, Vec3 } from 'cc';
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
    @property({ group: { name: 'References', displayOrder: 1 }, type: Label })
    damageLabel: Label = null;

    private _parentWidth: number = null;

    init(position: Vec3): void {
        this.node.setPosition(position);
    }

    start(): void {
        this.damageLabel.string = '';
        this.hpProgress.progress = 1;
        this._parentWidth = this.node.parent.getComponent(UITransform).contentSize.width;
        this._onMove(0);
    }

    // update(deltaTime: number): void {
    //     if (this._checkTarget()) {
    //         console.log(this.target.position.x);

    //         this._onAttack();
    //     } else {
    //         this._onMove(deltaTime);
    //     }
    // }

    onDestroy(): void {
        this.scheduleOnce(() => {
            this.node.destroy();
        }, 0.5);
    }

    private _checkTarget(): boolean {
        const targetPosition = this.target.worldPosition;
        const localPosition = new Vec3();
        this.node.parent.getComponent(UITransform).convertToNodeSpaceAR(targetPosition, localPosition);
        return localPosition.x >= this._parentWidth;
    }

    private _onMove(deltaTime: number): void {
        // const position = this.node.position;
        // const direction = this.speed * deltaTime;
        // this.node.setPosition(position.x - direction, position.y);
        tween(this.node)
            .delay(3)
            .to(15, { position: new Vec3(-800, this.node.position.y, this.node.position.z) })
            .start();
    }

    private _onAttack(): void {

    }

    private _onHurt(damage: number): void {
        this.hp -= damage;
        this.damageLabel.string = `-${damage}`;
        this.hpProgress.progress = this.hp / 100;
    }
}


