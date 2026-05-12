import { _decorator, Component, Node, Prefab } from 'cc';
import { GameDirector } from '../core/GameDirector';
import { BetManager } from '../core/BetManager';
const { ccclass, property } = _decorator;

@ccclass('ButtonSpin')
export class SpinButton extends Component {
    canSpin: boolean = false;

    private _gameDirector: GameDirector;
    private _betManager: BetManager;
    private _current: number;
    private _bets: IBet[];

    onLoad(): void {
        this._gameDirector = this.node.getComponent(GameDirector);
        this._betManager = this.node.getComponent(BetManager);
    }

    start(): void {
        this.node.on("JOIN_GAME_SUCCESS", this._initData, this);
        this.node.on("CAN_SPIN", this._canSpin, this);
    }

    onDestroy(): void {
        this.node.off("JOIN_GAME_SUCCESS", this._initData, this);
    }

    onClickSpin() {
        if (!this.canSpin) {
            console.log('cant spin');

            return;
        }

        this.canSpin = false;
        this._current = this._betManager.currentIndex;
        this._bets = this._betManager.bets;
        const id = this._bets[this._current].id;
        this._gameDirector.sendSpinRequest(id);
        this.node.emit("HIDE_AMOUNT");
    }

    private _canSpin() {
        this.canSpin = true;
    }

    private _initData() {
        this._current = this._betManager.currentIndex;
        this._bets = this._betManager.bets;
        this.canSpin = true;
    }

}

