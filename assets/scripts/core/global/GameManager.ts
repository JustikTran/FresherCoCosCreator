import { _decorator, Component, director, game, Node } from 'cc';
import { StateManage } from 'db://assets/scripts/utils/StateManage';
import { GameState } from 'db://assets/scripts/common/Config';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    public static instance: GameManager;

    @property({ group: { name: 'Popup', displayOrder: 1 }, type: Node })
    settingPopup: Node = null;
    @property({ group: { name: 'Popup', displayOrder: 1 }, type: Node })
    pausePopup: Node = null;
    @property({ group: { name: 'Popup', displayOrder: 1 }, type: Node })
    gameOverPopup: Node = null;
    @property({ group: { name: 'Popup', displayOrder: 1 }, type: Node })
    gameClearPopup: Node = null;

    onLoad(): void {
        if (!GameManager.instance) {
            GameManager.instance = this;
        } else {
            this.node.destroy();
            return;
        }
    }

    start() {
        this.allPopupHide();
    }

    update(deltaTime: number) {

    }

    public switchScene(): void {
        this.allPopupHide();
        director.loadScene('loading');
    }

    public allPopupHide() {
        this.settingPopup.active = false;
        this.pausePopup.active = false;
        this.gameOverPopup.active = false;
        this.gameClearPopup.active = false;
        if (StateManage.instance.compareState(GameState.PAUSE)) {
            StateManage.instance.shiftState();
        }

    }

    public showSettingPopup() {
        this.allPopupHide();
        StateManage.instance.setState(GameState.PAUSE);
        this.settingPopup.active = true;
    }

    public showPausePopup() {
        this.allPopupHide();
        StateManage.instance.setState(GameState.PAUSE);
        this.pausePopup.active = true;
    }

    public showGameOverPopup() {
        this.allPopupHide();
        StateManage.instance.setState(GameState.END);
        this.gameOverPopup.active = true;
    }

    public showGameClearPopup() {
        this.allPopupHide();
        StateManage.instance.setState(GameState.END);
        this.gameClearPopup.active = true;
    }
}


