import { _decorator, Component, Node } from 'cc';
import { SceneManager } from './SceneManager';
import { StateManage } from '../../utils/StateManage';
const { ccclass, property } = _decorator;

@ccclass('LocalManager')
export class LocalManager extends Component {
    public onClick(event, param) {        
        SceneManager.instance.onState(param);
    }
}

