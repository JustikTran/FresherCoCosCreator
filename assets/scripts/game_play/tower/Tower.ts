import { _decorator, BoxCollider2D, CCInteger, Collider2D, Component, Contact2DType, Node } from 'cc';
import { EventType } from 'db://assets/scripts/common/Config';
import { EventManager } from 'db://assets/scripts/core/global/EventManager';
import { EnemyBullet } from 'db://assets/scripts/game_play/bullet/EnemyBullet';
const { ccclass, property } = _decorator;

@ccclass('Tower')
export class Tower extends Component {
    @property({ group: { name: 'Attributes', displayOrder: 0 }, type: CCInteger })
    towerHP = 1000;

    start() {
        let collider = this.getComponent(BoxCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this._onBeginContact.bind(this), this);
        }
    }

    public getHp(): number {
        return this.towerHP;
    }

    private _onHurt(damage: number): void {
        EventManager.instance.emit(EventType.UPDATE_TOWER_HP, damage);
    }

    private _onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D): void {
        const dame = otherCollider.getComponent(EnemyBullet).getDamage();
        otherCollider.node.destroy();
        this._onHurt(dame);
    }
}


