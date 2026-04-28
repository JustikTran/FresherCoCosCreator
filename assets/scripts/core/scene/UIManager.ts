import { _decorator, CCInteger, Component, Label, Node, ProgressBar, tween } from 'cc';
import { EventManager } from '../global/EventManager';
import { EventType } from '../../common/Config';
import { Tower } from 'db://assets/scripts/game_play/tower/Tower';
import { GameManager } from 'db://assets/scripts/core/global/GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property({ group: { name: 'References', displayOrder: 0 }, type: Node })
    tower: Node;
    @property({ group: { name: 'References', displayOrder: 1 }, type: ProgressBar })
    towerHpProgress: ProgressBar = null;
    @property({ group: { name: 'References', displayOrder: 1 }, type: Label })
    towerHpLabel: Label = null;
    @property({ group: { name: 'References', displayOrder: 1 }, type: ProgressBar })
    enemyProgress: ProgressBar = null;

    private _towerHp: number = 0;
    private _currentHp: number = 0;

    start() {
        this._towerHp = this.tower.getComponent(Tower).getHp();;
        this._currentHp = this._towerHp;
        this.towerHpProgress.progress = 1;
        this.towerHpLabel.string = `${this._currentHp}/${this._towerHp}`;
        this.enemyProgress.progress = 0;

        EventManager.instance.register(EventType.UPDATE_ENEMY_PROGRESS, this._updateEnemyProgress.bind(this), this);
        EventManager.instance.register(EventType.UPDATE_TOWER_HP, this._updateTowerHp.bind(this), this);
    }

    update(dt: number): void {
        if(this._currentHp <= 0) {
            GameManager.instance.showGameOverPopup();
        }
    }

    private _updateEnemyProgress(percent: number): void {
        // this.enemyProgress.progress = percent;
        tween(this.enemyProgress)
            .to(0.3, { progress: percent }, {
                easing: 'sineIn'
            })
            .start()
    }

    private _updateTowerHp(minorHp: number): void {
        this._currentHp -= minorHp;
        this.towerHpLabel.string = `${Math.max(0, this._currentHp)}/${this._towerHp}`;
        tween(this.towerHpProgress)
            .to(0.3, { progress: this._currentHp / this._towerHp }, {
                easing: 'sineIn'
            })
            .start()
    }
}