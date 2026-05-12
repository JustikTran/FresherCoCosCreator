import { _decorator, Button, Component, Node, TiledUserNodeData } from 'cc';
import { BetManager } from '../core/BetManager';
const { ccclass, property } = _decorator;

@ccclass('ButtonBet')
export class ButtonBet extends Component {
    @property(BetManager)
    betManager: BetManager;

    private _current: number;
    private _max: number;

    start(): void {
        this.node.on("JOIN_GAME_SUCCESS", () => {
            const bets = this.betManager.bets;
            this._max = bets.length - 1;
        }, this);
    }

    onDestroy(): void {
        this.node.off("JOIN_GAME_SUCCESS", () => {
            const bets = this.betManager.bets;
            this._max = bets.length - 1;
        }, this);
    }

    onClickPlus() {
        this._current = this.betManager.currentIndex;
        const bets = this.betManager.bets;
        this._max = bets.length - 1;
        ++this._current;

        if (this._current >= this._max) {
            this._current = this._max;
        }

        this.betManager.setCurrentIndex(this._current);
    }

    onClickMinor() {
        this._current = this.betManager.currentIndex;
        const bets = this.betManager.bets;
        this._max = bets.length - 1;
        --this._current;
        
        if (this._current <= 0) {
            this._current = 0;
        }

        this.betManager.setCurrentIndex(this._current);
    }
}

