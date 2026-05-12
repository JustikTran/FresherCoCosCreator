import { _decorator, Button, Component, Label } from 'cc';
import { formatMoney, tweenMoney } from '../utils/utils';
import * as Utils from '../utils/utils';
import { BetManager } from './BetManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property(Label)
    totalLabel: Label;
    @property(Label)
    walletLabel: Label;
    @property(Label)
    betSizeLabel: Label;
    @property(Label)
    jackpotLabel: Label;
    @property(Button)
    btnPlus: Button;
    @property(Button)
    btnMinor: Button;

    private _betManager: BetManager;
    private _current: number = 0;
    private _max: number = 0;

    onLoad(): void {
        this._betManager = this.node.getComponent(BetManager);

        this.node.on("RENDER", this._render, this);
        this.node.on("RENDER_NEW_BET", this._changeBet, this);
    }

    update(dt: number): void {
        this.btnPlus.interactable = this._current < this._max;
        this.btnMinor.interactable = this._current > 0;
    }

    onDestroy(): void {
        this.node.off("RENDER", this._render, this);
        this.node.off("RENDER_NEW_BET", this._changeBet, this);
    }

    private _render(wallet: number): void {
        this._changeBet();
        tweenMoney.call(Utils, this.walletLabel, 0.5, wallet, { acceptRunDown: true }, formatMoney);
    }

    private _changeBet(): void {
        this._current = this._betManager.currentIndex;
        const bets = this._betManager.bets;
        this._max = bets.length - 1;

        this.totalLabel.string = formatMoney(bets[this._current].value);
        this.betSizeLabel.string = `${bets[this._current].value / 25}`;
        tweenMoney.call(Utils, this.jackpotLabel, 0.5, bets[this._current].jackpot, { acceptRunDown: true }, formatMoney);
    }
}

