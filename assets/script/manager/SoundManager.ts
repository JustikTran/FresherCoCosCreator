import { _decorator, AudioClip, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    @property({type: AudioClip})
    sound: AudioClip    
    @property({type: AudioClip})
    sfx: AudioClip

    onLoad(): void {
            
    }
}

