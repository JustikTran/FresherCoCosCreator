import { GameState } from "../common/Config";
import { GameManager } from "../core/global/GameManager";

export interface IState {
    from: string,
    to: string
}

export class StateManage {
    private static _instance: StateManage;

    private _currentState: IState;

    private constructor() {
        StateManage._instance = this;
        this._currentState = GameState.START;
    }

    public static get instance() {
        if (!this._instance) {
            this._instance = new StateManage();
        }
        return this._instance;
    }

    public setState(state: IState) {
        this._currentState = state;
    }

    public get currentState() {
        return this._currentState;
    }

    public compareState(state: IState) {
        return this._currentState.from === state.from && this._currentState.to === state.to;
    }
}