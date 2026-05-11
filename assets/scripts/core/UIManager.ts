import { _decorator, Button, Component, Label, Node, utils } from 'cc';
import { GameEventManager } from './GameEventManager';
import { formatMoney, parseMapBet, parseValueFromString, tweenMoney } from '../utils/utils';
import * as Utils from '../utils/utils';
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

    private _bets: IBet[] = [];
    private _currentBet: IBet = null;

    onLoad(): void {
        this.node.on("JOIN_GAME_SUCCESS", this._parseDate, this);
        this.btnPlus.node.on("click", this._upBet, this);
        this.btnMinor.node.on("click", this._downBet, this);
    }

    onDestroy(): void {
        this.node.off("JOIN_GAME_SUCCESS", this._parseDate, this);
        this.btnPlus.node.off("", this._upBet, this);
        this.btnMinor.node.off("", this._downBet, this);
    }

    private _parseDate(data: IJoinGameData): void {
        this._bets = parseMapBet(data);
        this._currentBet = this._bets[0];
        this._render(this._currentBet.jackpot, this._currentBet.value, data.wallet);
    }

    private _render(jackpot: number, totalBet: number, wallet: number = 0) {
        this.totalLabel.string = formatMoney(totalBet);
        this.betSizeLabel.string = `${totalBet / 25}`;
        // this.jackpotLabel.string = formatMoney(this._bets[0].jackpot);
        // this.walletLabel.string = formatMoney(data.wallet);
        tweenMoney.call(Utils, this.jackpotLabel, 0.1, jackpot, {}, formatMoney);
        // if (!wallet) {
            tweenMoney.call(Utils, this.walletLabel, 0.5, wallet, {}, formatMoney);
        // }
    }

    private _upBet() {
        let index = this._bets.indexOf(this._currentBet);
        if (index === -1 || index === this._bets.length - 2) {
            this.btnPlus.interactable = false;
        }
        this._currentBet = this._bets[++index];
        this._render(this._currentBet.jackpot, this._currentBet.value);
    }

    private _downBet() {
        let index = this._bets.indexOf(this._currentBet);
        if (index === -1 || index === 1) {
            this.btnPlus.interactable = false;
        }
        this._currentBet = this._bets[--index];
        this._render(this._currentBet.jackpot, this._currentBet.value);
    }
}

