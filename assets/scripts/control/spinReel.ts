import { _decorator, Component, Node, CCFloat, SpriteFrame, tween, Vec3, Sprite } from 'cc';
import * as Utils from '../utils/utils';
const { ccclass, property } = _decorator;

@ccclass('SpinReel')
export class SpinReel extends Component {
    @property(CCFloat)
    symbolHeight: number = 155;

    private _isSpinning = false;
    private _timeSpin: number = 0;
    private _spriteFrames: SpriteFrame[] = [];
    private _result: any[] = [];

    public spin(
        spinCount: number,
        spriteFrames: SpriteFrame[],
        result: any[],
        onComplete?: Function
    ) {
        this._timeSpin = spinCount;
        this._spriteFrames = spriteFrames;
        this._result = result;

        this.spinLoop(onComplete);
    }

    private renderSymbol(symbol: number, final: boolean = false) {
        const children = this.node.children;
        const bottom = children[
            children.length - 1
        ];
        if (final) {
            bottom.getComponent(Sprite).spriteFrame = this._spriteFrames[symbol];
        } else {
            bottom.getComponent(Sprite).spriteFrame = this._spriteFrames[symbol];
        }
        const top = children[0];
        bottom.setSiblingIndex(0);
        bottom.setPosition(
            top.position.x,
            top.position.y + this.symbolHeight,
            top.position.z
        );
    }

    private spinLoop(onComplete?: Function) {
        if (this._timeSpin <= 0) {
            onComplete && onComplete();
            return;
        }

        tween(this.node)
            .by(
                0.1,
                { position: new Vec3(0, -this.symbolHeight, 0) },
                { easing: "sineOut" }
            )
            .call(() => {
                if (this._timeSpin - 5 <= 0) {
                    this.renderSymbol(this._result[this._timeSpin - 1], true);
                } else {
                    let symbol = Utils.random(0, this._spriteFrames.length - 1);
                    this.renderSymbol(symbol);
                }

                this._timeSpin--;
                this.spinLoop(onComplete);

            })
            .start();
    }
}

