import { _decorator, CCInteger, Component, Label, Node, ProgressBar, tween } from 'cc';
import { EventManager } from '../global/EventManager';
import { EventType } from '../../common/Config';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property({ group: { name: 'Attributes', displayOrder: 0 }, type: CCInteger })
    towerHP = 1000;
    @property({ group: { name: 'References', displayOrder: 1 }, type: ProgressBar })
    towerHpProgress: ProgressBar = null;
    @property({ group: { name: 'References', displayOrder: 1 }, type: Label })
    towerHpLabel: Label = null;
    @property({ group: { name: 'References', displayOrder: 1 }, type: ProgressBar })
    enemyProgress: ProgressBar = null;

    private _currentHp: number = 0;

    start() {
        this._currentHp = this.towerHP;
        this.towerHpProgress.progress = 1;
        this.towerHpLabel.string = `${this._currentHp}/${this.towerHP}`;
        this.enemyProgress.progress = 0;

        EventManager.instance.register(EventType.UPDATE_ENEMY_PROGRESS, this._updateEnemyProgress.bind(this), this);
    }

    update(deltaTime: number) {

    }

    private _updateEnemyProgress(percent: number): void {
        // this.enemyProgress.progress = percent;
        tween(this.enemyProgress)
            .to(0.3, { progress: percent },{
                easing:'sineIn'
            })
            .start()
    }
}


