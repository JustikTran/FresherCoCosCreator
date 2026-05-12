import { _decorator, Component, Node, Prefab, Sprite, SpriteFrame } from 'cc';
import { castMapReel } from '../utils/utils';
import { GameEventManager } from './GameEventManager';
import { SpinReel } from '../control/SpinReel';
const { ccclass, property } = _decorator;

@ccclass('TableManager')
export class TableManager extends Component {

    @property(GameEventManager)
    gameEvent: GameEventManager;

    @property({ group: { name: "Result", displayOrder: 1 }, type: Prefab })
    symbol: Prefab;

    @property(SpriteFrame)
    spriteFrames: SpriteFrame[] = [];

    onEnable(): void {
        this.gameEvent.on("SPIN_REQUEST", this._showResult, this);
    }

    onDisable(): void {
        this.gameEvent.off("SPIN_REQUEST", this._showResult, this);
    }

    private _showResult(response: ISpinResponse) {
        let completed = 0;
        let matrixResult = castMapReel(response.matrix);
        for (let index = 0; index < 5; index++) {
            const reel = this.node.children[index].getComponent(SpinReel);
            reel.spin(15 + index * 5,
                this.spriteFrames,
                matrixResult[index],
                () => {
                    completed++;
                    if (completed === 5) {
                        this.gameEvent.emit("UPDATE_AMOUNT", response);
                        this.gameEvent.emit("CAN_SPIN");
                    }
                });
        }
    }

}

