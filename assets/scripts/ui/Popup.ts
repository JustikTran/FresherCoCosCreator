import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../core/global/GameManager';
const { ccclass, property } = _decorator;

@ccclass('Popup')
export class Popup extends Component {

    public showSetting(): void {
        GameManager.instance.showSettingPopup();
    }

    public showPause(): void {
        GameManager.instance.showPausePopup();
    }

    public switchStart():void{
        GameManager.instance.allPopupHide();
        GameManager.instance.switchScene();
    }
}


