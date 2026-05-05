import { _decorator, Component, Node } from 'cc';
import { EventType, GameState } from 'db://assets/scripts/common/Config';
import { EventManager } from 'db://assets/scripts/core/global/EventManager';
import { Character } from 'db://assets/scripts/game_play/character/Character';
import { StateManage } from '../../utils/StateManage';
const { ccclass, property } = _decorator;

@ccclass('CharacterManager')
export class CharacterManager extends Component {
    @property(Node)
    character: Node = null;

    private _characterControl: Character;

    start() {
        this._characterControl = this.node.getComponentInChildren(Character);
        EventManager.instance.register(EventType.SHOOT, this._onShoot.bind(this), this);
    }

    onDestroy(): void {
        EventManager.instance.unregisterAll(this);
    }

    private _onShoot(): void {
        if (StateManage.instance.compareState(GameState.PAUSE)) {
            return;
        }
        const pointPosition = this._characterControl.getShootPosition();
        EventManager.instance.emit(EventType.SPAWN_BULLET, pointPosition);
    }
}


