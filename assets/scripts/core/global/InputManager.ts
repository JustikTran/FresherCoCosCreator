import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Node, Vec3 } from 'cc';
import { EventType } from 'db://assets/scripts/common/config';
import { EventManager } from 'db://assets/scripts/core/global/EventManager';
const { ccclass, property } = _decorator;

@ccclass('InputManager')
export class InputManager extends Component {

    start() {
        input.on(Input.EventType.KEY_DOWN, this._onDown, this);
        input.on(Input.EventType.KEY_UP, this._onUp, this);
    }

    onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this._onDown, this);
        input.off(Input.EventType.KEY_UP, this._onUp, this);
    }

    private _onDown(event: EventKeyboard): void {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
                EventManager.instance.emit(EventType.MOVE, new Vec3(0, 1, 0));
                break;
            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:
                EventManager.instance.emit(EventType.MOVE, new Vec3(0, -1, 0));
                break;
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
                EventManager.instance.emit(EventType.MOVE, new Vec3(-1, 0, 0));
                break;
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                EventManager.instance.emit(EventType.MOVE, new Vec3(1, 0, 0));
                break;
            case KeyCode.SPACE:
                EventManager.instance.emit(EventType.SHOOT);
                break;
            case KeyCode.KEY_Q:
                EventManager.instance.emit(EventType.SKILL1);
                break;
            case KeyCode.KEY_E:
                EventManager.instance.emit(EventType.SKILL2);
                break;
        }
    }

    private _onUp(event: EventKeyboard): void {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                EventManager.instance.emit(EventType.STOP);
                break;
        }
    }
}

