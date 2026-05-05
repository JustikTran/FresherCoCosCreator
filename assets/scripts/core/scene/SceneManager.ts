import { _decorator, Component, Node, director } from 'cc';
import { StateManage } from '../../utils/StateManage';
import { EventType, GameState } from '../../common/Config';
import { GameManager } from '../global/GameManager';
import { EventManager } from '../global/EventManager';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends Component {
    public static instance: SceneManager;

    onLoad(): void {
        if (!SceneManager.instance) {
            SceneManager.instance = this;
        } else {
            this.node.destroy();
            return;
        }
    }

    public onState(param) {
        const state: string = (param as string).toUpperCase();

        switch (state) {
            case "START":
                if (StateManage.instance.compareState(GameState.START)) {
                    break;
                }
                StateManage.instance.setState(GameState.START);
                GameManager.instance.switchScene();
                break;
            case "HOME":
                if (StateManage.instance.compareState(GameState.HOME)) {
                    break;
                }
                StateManage.instance.setState(GameState.HOME);
                GameManager.instance.switchScene();
                break;
            case "PLAY":
                if (StateManage.instance.compareState(GameState.PlAY)) {
                    break;
                }
                StateManage.instance.setState(GameState.PlAY);
                GameManager.instance.switchScene();
                break;
            case "BACK":
                if (StateManage.instance.compareState(GameState.BACK)) {
                    break;
                }
                StateManage.instance.setState(GameState.BACK);
                GameManager.instance.switchScene();
                break;
            case "REPLAY":
                if (StateManage.instance.compareState(GameState.REPLAY)) {
                    break;
                }
                StateManage.instance.setState(GameState.REPLAY);
                EventManager.instance.emit(EventType.REPLAY);
                GameManager.instance.allPopupHide();
                // GameManager.instance.switchScene();
                break;
            default:
                break;
        }
    }
}

