import { _decorator, CCFloat, Component, Node, tween, Vec3 } from 'cc';
import { BaseEnemy } from './BaseEnemy';
import { EventManager } from 'db://assets/scripts/core/global/EventManager';
import { Config, EventType } from 'db://assets/scripts/common/Config';
const { ccclass, property } = _decorator;

@ccclass('Boss')
export class Boss extends BaseEnemy {
    @property({ group: { name: 'Attributes', displayOrder: 0 }, type: CCFloat })
    attackRate = 4.5;

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
        EventManager.instance.emit(EventType.ENEMY_ATTACK, { damage: this.damage, worldPosition: this.attackPoint.worldPosition });
    }

    onMove(deltaTime: number): void {
        tween(this.node)
            .delay(Config.SPAWN_BOSS_TIME)
            .to(15, { position: new Vec3(-400, this.node.position.y, this.node.position.z) })
            .call(() => this.isStopMove = true)
            .start();
    }
}

