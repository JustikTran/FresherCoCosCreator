import { _decorator, CCInteger, Component, Label, Node, ProgressBar } from 'cc';
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
    EnemyProgress: ProgressBar = null;

    private _currentHp: number = 0;
    private _currentEnemyProgress: number = 0;

    start() {
        this._currentHp = this.towerHP;
        this._currentEnemyProgress = 0;
        this.towerHpProgress.progress = 1;
        this.towerHpLabel.string = `${this._currentHp}/${this.towerHP}`;
        this.EnemyProgress.progress = 0;
    }

    update(deltaTime: number) {

    }
}


