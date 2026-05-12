import { _decorator, Component, Node, Prefab, Sprite, SpriteFrame } from 'cc';
import { castMapReel } from '../utils/utils';
import { GameEventManager } from './GameEventManager';
import { spinReel } from '../control/spinReel';
const { ccclass, property } = _decorator;

@ccclass('TableManager')
export class TableManager extends Component {

    @property(GameEventManager)
    gameEvent: GameEventManager;

    @property({ group: { name: "Result", displayOrder: 1 }, type: Prefab })
    symbol: Prefab;

    @property(SpriteFrame)
    spriteFrames: SpriteFrame[] = [];

    onLoad(): void {
        this.gameEvent.on("SPIN_REQUEST", this._showResult, this);
    }

    private _showResult(response: ISpinResponse) {
        let matrixResult = castMapReel(response.matrix);

        for (let index = 0; index < 5; index++) {
            let reel = this.node.children[index];
            let reelRes = matrixResult[index];

            for (let pos = 0; pos < 5; pos++) {
                let child = reel.children[pos];

                if (reelRes[pos]) {
                    child.getComponent(Sprite).spriteFrame = this.spriteFrames[reelRes[pos]];
                }
            }
        }

        this.gameEvent.emit("UPDATE_AMOUNT", response);
        this.gameEvent.emit("CAN_SPIN");
    }

}

