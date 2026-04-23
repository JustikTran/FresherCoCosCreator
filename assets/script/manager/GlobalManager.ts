import { _decorator, Component, Node } from 'cc';
import { EventCall, State } from '../config/State';
import { mEmitter } from '../utils/EventBus';
const { ccclass, property } = _decorator;

@ccclass('GlobalManager')
export class GlobalManager extends Component {

    @property({ type: Node })
    loadingScene: Node;
    @property({ type: Node })
    startScene: Node;
    @property({ type: Node })
    gameScene: Node;
    @property({ type: Node })
    settingPopup: Node;

    onLoad(): void {
        mEmitter.instance.registerEvent(
            EventCall.SHOW,
            this.showScene.bind(this),
            this,
        );
    }

    start() {

    }

    update(deltaTime: number) {

    }

    showScene(state): void {
        switch (state) {
            case State.LOADING:
                this.inactiveScene();
                this.loadingScene.active = true;
                break;
            case State.START:
                this.inactiveScene();
                this.startScene.active = true;
                break;
            case State.SETTING:
                this.settingPopup.active = true;
                break;
            case State.GAME:
                this.inactiveScene();
                this.gameScene.active = true;
                break;
        }
    }

    inactiveScene() {
        this.startScene.active = false;
        this.loadingScene.active = false;
        this.gameScene.active = false;
        this.settingPopup.active = false;
    }
}

