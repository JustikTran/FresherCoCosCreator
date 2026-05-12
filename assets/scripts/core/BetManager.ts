import { _decorator, Component, Node } from 'cc';
import { parseMapBet } from '../utils/utils';
const { ccclass, property } = _decorator;

@ccclass('BetManager')
export class BetManager extends Component {

    private _currentIndex: number;
    private _bets: IBet[];
    private _wallet: number;

    onLoad(): void {
        this._currentIndex = 0;
    }

    onEnable(): void {
        this.node.on("JOIN_GAME_SUCCESS", this._setData, this);
    }

    onDestroy(): void {
        this.node.off("JOIN_GAME_SUCCESS", this._setData, this);
    }

    public get currentIndex(): number {
        return this._currentIndex;
    }

    public setCurrentIndex(newIndex:number):void{
        this._currentIndex = newIndex;
        this.node.emit("RENDER_NEW_BET");
    }

    public get bets(): IBet[] {
        return this._bets;
    }

    private _setData(data: IJoinGameData): void {
        this._bets = parseMapBet(data);        
        this._currentIndex = 0;
        this._wallet = data.wallet;
        this.node.emit("RENDER", this._wallet);
    }
}

