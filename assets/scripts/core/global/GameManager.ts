import { _decorator, Component, director, game, Node } from 'cc';
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
        director.resume();
    }

    public showSettingPopup() {
        this.allPopupHide();
        director.pause();
        this.settingPopup.active = true;
    }

    public showPausePopup() {
        this.allPopupHide();
        director.pause();
        this.pausePopup.active = true;
    }

    public showGameOverPopup() {
        this.allPopupHide();
        director.pause();
        this.gameOverPopup.active = true;
    }

    public showGameClearPopup() {
        this.allPopupHide();
        director.pause();
        this.gameClearPopup.active = true;
    }

    public onStart(): void {
        director.loadScene('game_room');
    }
}


