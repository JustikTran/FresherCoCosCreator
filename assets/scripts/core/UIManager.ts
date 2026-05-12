import { _decorator, Button, Component, instantiate, Label, Node, Prefab, resources, Sprite, SpriteFrame } from 'cc';
import { formatMoney, tweenMoney } from '../utils/utils';
import * as Utils from '../utils/utils';
import { BetManager } from './BetManager';
import { GameEventManager } from './GameEventManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property(GameEventManager)
    gameEvent: GameEventManager;
    @property(BetManager)
    betManager: BetManager;
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
    @property({ group: { name: "UI", displayOrder: 0 }, type: Button })
    btnSpin: Button;

    private _current: number = 0;
    private _max: number = 0;
    private _wallet: number = 0;
    private _canClick: boolean = false;

    onEnable(): void {
        this.gameEvent.on("JOIN_GAME_SUCCESS", this._canTouch, this);
        this.gameEvent.on("RENDER", this._render, this);
        this.gameEvent.on("RENDER_NEW_BET", this._changeBet, this);
        this.gameEvent.on("UPDATE_AMOUNT", this._updateWinAmount, this);
        this.gameEvent.on("HIDE_AMOUNT", this._hideWinAmount, this);
    }

    start(): void {
        this.winAmount.string = '';
        this._canTouch(false);
    }

    update(dt: number): void {
        if (!this._canClick) {
            this.btnPlus.interactable = false;
            this.btnMinor.interactable = false;
            return;
        }
        this.btnPlus.interactable = this._current < this._max;
        this.btnMinor.interactable = this._current > 0;
    }

    onDisable(): void {
        this.gameEvent.off("JOIN_GAME_SUCCESS", this._canTouch, this);
        this.gameEvent.off("RENDER", this._render, this);
        this.gameEvent.off("RENDER_NEW_BET", this._changeBet, this);
        this.gameEvent.off("UPDATE_AMOUNT", this._updateWinAmount, this);
        this.gameEvent.off("HIDE_AMOUNT", this._hideWinAmount, this);
    }

    private _canTouch(condition: boolean = true) {
        this._canClick = condition;
    }

    private _render(wallet: number): void {
        this._changeBet();
        this._wallet = wallet;
        tweenMoney.call(Utils, this.walletLabel, 0.5, wallet, { acceptRunDown: true }, (value) => "$" + formatMoney(value));
    }

    private _changeBet(): void {
        this._current = this.betManager.currentIndex;
        const bets = this.betManager.bets;
        this._max = bets.length - 1;

        this.totalLabel.string = "$" + formatMoney(bets[this._current].value);
        this.betSizeLabel.string = `${bets[this._current].value / 25}`;
        tweenMoney.call(Utils, this.jackpotLabel, 0.5, bets[this._current].jackpot, { acceptRunDown: true }, (value) => "$" + formatMoney(value));
    }

    private _updateWinAmount(response: ISpinResponse): void {
        this._canTouch();
        this._wallet += response.winAmount;
        tweenMoney.call(
            Utils,
            this.winAmount,
            0.5,
            response.winAmount,
            { acceptRunDown: true },
            (value) => "Win: $" + formatMoney(value)
        );
        tweenMoney.call(
            Utils,
            this.walletLabel,
            0.5,
            this._wallet,
            { acceptRunDown: true },
            (value) => "$" + formatMoney(value)
        );
    }

    private _hideWinAmount() {
        this._canTouch(false);
        this.winAmount.string = "";
    }
}

