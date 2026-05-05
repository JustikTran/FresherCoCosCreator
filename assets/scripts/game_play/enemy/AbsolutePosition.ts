import { _decorator, CCInteger, Component, Node, Prefab } from 'cc';
import { BaseEnemy } from './BaseEnemy';
import { EventManager } from 'db://assets/scripts/core/global/EventManager';
import { EventType } from 'db://assets/scripts/common/Config';
const { ccclass, property } = _decorator;

@ccclass('AbsolutePosition')
export class AbsolutePosition extends BaseEnemy {
    @property({ group: { name: 'Attributes', displayOrder: 0 }, type: CCInteger })
    attackRate = 1;

    private _attackTimer: number = 0;

    start(): void {
        super.start();
        this._attackTimer = 0;
    }

    update(deltaTime: number): void {
        super.update(deltaTime);
        if (this._attackTimer >= this.attackRate) {
            this.onAttack();
            this._attackTimer = 0;
        } else {
            this._attackTimer += deltaTime;
        }
    }

    onMove(deltaTime: number): void {
    }

    onAttack(): void {
        EventManager.instance.emit(EventType.ENEMY_ATTACK, { damage: this.damage, worldPosition: this.attackPoint.worldPosition });
    }
}

