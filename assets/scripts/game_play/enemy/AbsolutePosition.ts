import { _decorator, Component, Node } from 'cc';
import { BaseEnemy } from './BaseEnemy';
const { ccclass, property } = _decorator;

@ccclass('AbsolutePosition')
export class AbsolutePosition extends BaseEnemy {
    _onMove(deltaTime: number): void {
        
    }
}

