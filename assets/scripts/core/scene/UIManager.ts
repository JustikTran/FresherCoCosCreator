import { _decorator, CCInteger, Component, Label, Node, ProgressBar, tween } from 'cc';
import { EventManager } from '../global/EventManager';
import { Config, EventType, GameState } from '../../common/Config';
import { Tower } from 'db://assets/scripts/game_play/tower/Tower';
import { GameManager } from 'db://assets/scripts/core/global/GameManager';
import { StateManage } from '../../utils/StateManage';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property({ group: { name: 'References', displayOrder: 0 }, type: Node })
    tower: Node;
    @property({ group: { name: 'References', displayOrder: 1 }, type: ProgressBar })
    towerHpProgress: ProgressBar;
    @property({ group: { name: 'References', displayOrder: 1 }, type: Label })
    towerHpLabel: Label;
    @property({ group: { name: 'References', displayOrder: 1 }, type: ProgressBar })
    enemyProgress: ProgressBar;
    @property({ group: { name: 'References', displayOrder: 1 }, type: Node })
    notifyBoss: Node;

    private _towerHp: number = 0;
    private _towerLabel: Label;
    private _currentHp: number = 0;
    private _currentEnemyProgress: number = 0;
    private _showNotifyTime: number = 0;

    start() {
        this._towerHp = this.tower.getComponent(Tower).getHp();;
        this._currentHp = this._towerHp;
        this.towerHpProgress.progress = 1;
        this.towerHpLabel.string = `${this._currentHp}/${this._towerHp}`;
        this.enemyProgress.progress = 0;
        this.notifyBoss.active = false;
        this._showNotifyTime = 0;
        this._towerLabel = this.towerHpLabel.getComponent(Label);

        EventManager.instance.register(EventType.UPDATE_ENEMY_PROGRESS, this._updateEnemyProgress.bind(this), this);
        EventManager.instance.register(EventType.UPDATE_TOWER_HP, this._updateTowerHp.bind(this), this);
        EventManager.instance.register(EventType.BOSS_ATTACK, this.showNotify.bind(this), this);
        EventManager.instance.register(EventType.REPLAY, this._onReplay.bind(this), this);
    }

    update(dt: number): void {
        if (StateManage.instance.compareState(GameState.PAUSE)
            || StateManage.instance.compareState(GameState.END)) {
            return;
        }

        if (this._currentHp <= 0) {
            GameManager.instance.showGameOverPopup();
        }

        if (this._showNotifyTime >= Config.SPAWN_BOSS_TIME) {
            this.notifyBoss.active = false;
        }

        this._showNotifyTime += dt;
        this.towerHpProgress.progress = this._currentHp / this._towerHp;
    }

    onDestroy(): void {
        EventManager.instance.unregisterAll(this);
    }

    private _onReplay() {
        this._currentHp = this._towerHp;
        this.towerHpProgress.progress = 1;
        this.towerHpLabel.string = `${this._currentHp}/${this._towerHp}`;
        this.enemyProgress.progress = 0;
        this.notifyBoss.active = false;
        this._showNotifyTime = 0;
    }

    private _updateEnemyProgress(percent: number): void {
        // this.enemyProgress.progress = percent;
        tween(this.enemyProgress)
            .to(0.5, { progress: percent }, {
                easing: 'sineIn'
            })
            .start()
    }

    private _updateTowerHp(minorHp: number): void {
        this._currentHp -= minorHp;
        this._towerLabel.string = `${Math.max(0, this._currentHp)}/${this._towerHp}`;
        // tween(this.towerHpProgress)
        //     .to(0.3, { progress: this._currentHp / this._towerHp }, {
        //         easing: 'sineIn'
        //     })
        //     .start()
    }

    public showNotify() {
        this.notifyBoss.active = true;
        this._showNotifyTime = 0;
    }
}