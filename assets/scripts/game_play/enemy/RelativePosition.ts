import { _decorator, CCFloat, Component, Node, tween, Vec3 } from 'cc';
import { BaseEnemy } from './BaseEnemy';
import { EventManager } from 'db://assets/scripts/core/global/EventManager';
import { EventType } from 'db://assets/scripts/common/Config';
const { ccclass, property } = _decorator;

@ccclass('RelativePosition')
export class RelativePosition extends BaseEnemy {
    @property({ group: { name: 'Attributes', displayOrder: 0 }, type: CCFloat })
    attackRate = 1.5;

    private _attackTimer: number = 0;

    start(): void {
        super.start();
        this._attackTimer = 0;
    }

    update(deltaTime: number): void {
        super.update(deltaTime);
        if (this._attackTimer >= this.attackRate && this.isStopMove) {
            this.onAttack();
            this._attackTimer = 0;
        } else {
            this._attackTimer += deltaTime;
        }
    }

    onAttack(): void {
        tween(this.node)
            .to(0.2, { scale: new Vec3(1.2, 1.2) })
            .to(0.2, { scale: new Vec3(1, 1) })
            .call(() => EventManager.instance.emit(EventType.UPDATE_TOWER_HP, this.damage))
            .start();
    }
}

