import { GameEventManager } from './../core/GameEventManager';
import { _decorator, Component, Node, Prefab } from 'cc';
import { GameDirector } from '../core/GameDirector';
import { BetManager } from '../core/BetManager';
const { ccclass, property } = _decorator;

@ccclass('ButtonSpin')
export class SpinButton extends Component {
    @property(Node)
    btnStop: Node;
    @property(GameEventManager)
    gameEvent: GameEventManager;
    @property(GameDirector)
    gameDirector: GameDirector;
    @property(BetManager)
    betManager: BetManager;

    canSpin: boolean = false;


    private _current: number;
    private _bets: IBet[];

    onEnable(): void {
        this.gameEvent.on("JOIN_GAME_SUCCESS", this._initData, this);
        this.gameEvent.on("CAN_SPIN", this._canSpin, this);
    }

    onDestroy(): void {
        this.gameEvent.off("JOIN_GAME_SUCCESS", this._initData, this);
        this.gameEvent.off("CAN_SPIN", this._canSpin, this);
    }

    onClickSpin() {
        if (!this.canSpin) {
            console.log('cant spin');

            return;
        }
        this.node.active = false;
        this.btnStop.active = true;
        this.canSpin = false;
        this._current = this.betManager.currentIndex;
        this._bets = this.betManager.bets;
        const id = this._bets[this._current].id;
        this.gameDirector.sendSpinRequest(id);
        this.gameEvent.emit("HIDE_AMOUNT");
    }

    private _canSpin() {
        this.canSpin = true;
        this.btnStop.active = false;
        this.node.active = true;
    }

    private _initData() {
        this._current = this.betManager.currentIndex;
        this._bets = this.betManager.bets;
        this.canSpin = true;
    }

}

