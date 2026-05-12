import { _decorator, Button, Component, instantiate, Label, Node, Prefab, resources, Sprite, SpriteFrame } from 'cc';
import { formatMoney, tweenMoney } from '../utils/utils';
import * as Utils from '../utils/utils';
import { BetManager } from './BetManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property({ group: { name: "UI", displayOrder: 0 }, type: Label })
    totalLabel: Label;
    @property({ group: { name: "UI", displayOrder: 0 }, type: Label })
    winAmount: Label;
    @property({ group: { name: "UI", displayOrder: 0 }, type: Label })
    walletLabel: Label;
    @property({ group: { name: "UI", displayOrder: 0 }, type: Label })
    betSizeLabel: Label;
    @property({ group: { name: "UI", displayOrder: 0 }, type: Label })
    jackpotLabel: Label;
    @property({ group: { name: "UI", displayOrder: 0 }, type: Button })
    btnPlus: Button;
    @property({ group: { name: "UI", displayOrder: 0 }, type: Button })
    btnMinor: Button;

    private _betManager: BetManager;
    private _current: number = 0;
    private _max: number = 0;
    private _wallet: number = 0;

    onLoad(): void {
        this._betManager = this.node.getComponent(BetManager);

        this.node.on("RENDER", this._render, this);
        this.node.on("RENDER_NEW_BET", this._changeBet, this);
        this.node.on("UPDATE_AMOUNT", this._updateWinAmount, this);
        this.node.on("HIDE_AMOUNT", this._hideWinAmount, this);
    }

    start(): void {
        this.winAmount.string = '';
    }

    update(dt: number): void {
        this.btnPlus.interactable = this._current < this._max;
        this.btnMinor.interactable = this._current > 0;
    }

    onDestroy(): void {
        this.node.off("RENDER", this._render, this);
        this.node.off("RENDER_NEW_BET", this._changeBet, this);
        this.node.off("UPDATE_AMOUNT", this._updateWinAmount, this);
        this.node.off("HIDE_AMOUNT", this._hideWinAmount, this);
    }

    private _render(wallet: number): void {
        this._changeBet();
        this._wallet = wallet;
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

    private _updateWinAmount(response: ISpinResponse): void {
        this.winAmount.string = formatMoney(response.winAmount);
        this._wallet += response.winAmount;
        tweenMoney.call(Utils, this.walletLabel, 0.5, this._wallet, { acceptRunDown: true }, formatMoney);
    }

    private _hideWinAmount() {
        this.winAmount.string = "";
    }
}

