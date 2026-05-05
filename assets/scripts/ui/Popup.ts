import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../core/global/GameManager';
import { SceneManager } from '../core/scene/SceneManager';
const { ccclass, property } = _decorator;

@ccclass('Popup')
export class Popup extends Component {

    public showSetting(): void {
        GameManager.instance.showSettingPopup();
    }

    public showPause(): void {
        GameManager.instance.showPausePopup();
    }

    public switchHome(event, param): void {
        SceneManager.instance.onState('BACK');
    }
}


