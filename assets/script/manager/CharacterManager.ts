import { _decorator, Component, Node, input, Input, Vec2, EventKeyboard, KeyCode } from 'cc';
import { EventCall, EventMove } from '../config/State';
import { CharacterController } from '../controller/CharacterController';
import { Singleton } from '../utils/decorator/Singleton';
import { mEmitter } from '../utils/EventBus';
const { ccclass, property } = _decorator;

@Singleton
@ccclass('CharacterManager')
export class CharacterManager extends Component {
    @property({ visible: true, type: Node })
    character: Node | null = null;
    @property()
    attackRate: number = 0.3;

    //#region private property
    private _lastShootTime: number = 0;
    //#endregion

    onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    start(): void {
        this._lastShootTime = 0;
    }

    onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
        mEmitter.instance.removeAllEvent(this);
    }

    private onKeyDown(event: EventKeyboard): void {
        switch (event.keyCode) {
            case KeyCode.SPACE:
                this.tryShoot();
                break;
            case KeyCode.KEY_A:          
                mEmitter.instance.emit(EventCall.MOVE, EventMove.LEFT);
                break;
            case KeyCode.KEY_W:
                mEmitter.instance.emit(EventCall.MOVE, EventMove.UP);
                break;
            case KeyCode.KEY_S:
                mEmitter.instance.emit(EventCall.MOVE, EventMove.DOWN);
                break;
            case KeyCode.KEY_D:
                mEmitter.instance.emit(EventCall.MOVE, EventMove.RIGHT);
                break;
        }
    }

    private onKeyUp(event: EventKeyboard): void {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                mEmitter.instance.emit(EventCall.MOVE, EventMove.LEFT);
                break;
            case KeyCode.KEY_W:
                mEmitter.instance.emit(EventCall.MOVE, EventMove.UP);
                break;
            case KeyCode.KEY_S:
                mEmitter.instance.emit(EventCall.MOVE, EventMove.DOWN);
                break;
            case KeyCode.KEY_D:
                mEmitter.instance.emit(EventCall.MOVE, EventMove.RIGHT);
                break;
        }
    }

    private tryShoot(): void {
        const now = performance.now() / 1000;

        if (now - this._lastShootTime < this.attackRate) {
            return;
        }

        this._lastShootTime = now;
        this.onShoot();
    }

    onShoot(): void {
        const pointPosition = this.character.getComponent(CharacterController).getShootPoint();
        mEmitter.instance.emit(EventCall.SHOOT, pointPosition);
    }
}

