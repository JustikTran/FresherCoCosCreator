import { _decorator, Component, Node, CCFloat, SpriteFrame, tween, Vec3, Sprite } from 'cc';
import * as Utils from '../utils/utils';
const { ccclass, property } = _decorator;

@ccclass('spinReel')
export class spinReel extends Component {
    @property(CCFloat)
    symbolHeight: number = 155;

    private _isSpinning = false;
    private firstPosition: Vec3;

    protected onLoad(): void {
        this.firstPosition = this.node.position.clone();
    }

    protected start(): void {
        this.spinLoop();
    }

    public spin(
        spinCount?: number,
        spriteFrames?: SpriteFrame[],
        onComplete?: Function
    ) {

        tween(this.node)
            .by(2, { position: new Vec3(0, -this.symbolHeight) }, {
                onComplete: () => {
                    // let random = Utils.random(0, spriteFrames.length - 1);
                    // this.node.children[4].getComponent(Sprite).spriteFrame = spriteFrames[random];
                    this.node.children[4].setSiblingIndex(0);

                }
            })
            .repeat(10)
            .start();
    }

    public setResult(result: number[], spriteFrames: SpriteFrame[]) {

        for (let i = 0; i < 5; i++) {

            const child =
                this.node.children[i];

            child.getComponent(Sprite).spriteFrame = spriteFrames[result[i]];
        }
    }

 private spinLoop() {
    tween(this.node)
        .by(
            0.25,
            {
                position: new Vec3(
                    0,
                    -this.symbolHeight,
                    0
                )
            },
            {
                easing: "linear"
            }
        )
        .call(() => {

            // reset reel position
            // this.node.setPosition(this.firstPosition);

            const children = this.node.children;

            // lấy symbol cuối
            const bottom = children[
                children.length - 1
            ];

            // lấy symbol đầu
            const top = children[0];

            // đưa symbol cuối lên đầu hierarchy
            bottom.setSiblingIndex(0);

            // đặt lên phía trên top
            bottom.setPosition(
                top.position.x,
                top.position.y + this.symbolHeight,
                top.position.z
            );

            // loop tiếp
            this.spinLoop();

        })
        .start();
}
}

