import { _decorator, Component, Node, Tween } from 'cc';
import { SceneManager } from './SceneManager';
import { SoundManager } from '../global/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('LocalManager')
export class LocalManager extends Component {
    public onClick(event, param) {
        SceneManager.instance.onState(param);
    }

    public playSfx() {
        SoundManager.instance.playSfx();
    }

    protected onDestroy(): void {
        Tween.stopAll();
    }
}

