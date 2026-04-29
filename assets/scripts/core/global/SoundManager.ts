import { _decorator, AudioClip, AudioSource, Component, Node, Slider } from 'cc';
import { SoundType } from '../../common/Config';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    @property(AudioSource)
    backgroundSound: AudioSource;
    @property(AudioSource)
    clickSound: AudioSource;

    public static instance: SoundManager;

    onLoad(): void {
        if (!SoundManager.instance) {
            SoundManager.instance = this;
        } else {
            this.node.destroy();
        }
    }

    public onSetVolume(event, param){
        let percent = event.node.getComponent(Slider).progress;
        switch (param) {
            case '0':
                this._setSound(SoundType.BACKGROUND, percent);
                break;
            case '1':
                this._setSound(SoundType.SFX, percent);
                break;
            default:
                break;
        }
    }

    private _setSound(sound: SoundType, percentVolume: number) {
        switch (sound) {
            case SoundType.BACKGROUND:
                this.backgroundSound.volume = percentVolume;
                break;
            case SoundType.SFX:
                this.clickSound.volume = percentVolume;
                break;
        }
    }

    public playSfx() {
        this.clickSound.playOneShot(this.clickSound.clip, this.clickSound.volume);
    }
}


