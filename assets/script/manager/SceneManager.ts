import { _decorator, Component, Node } from 'cc';
import { mEmitter } from '../utils/EventBus';
import { EventCall, State } from '../config/State';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends Component {

    startGame() {
        mEmitter.instance.emit(EventCall.SHOW, State.GAME);
    }

    showLobby() {
        mEmitter.instance.emit(EventCall.SHOW, State.LOADING);
    }

    showSetting() {
        mEmitter.instance.emit(EventCall.SHOW, State.SETTING);
    }
}

