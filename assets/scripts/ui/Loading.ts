import { _decorator, Component, director, Label, Node, ProgressBar, tween } from 'cc';
import { EventType } from 'db://assets/scripts/common/Config';
import { EventManager } from 'db://assets/scripts/core/global/EventManager';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    @property(Label)
    loadingLabel: Label = null;
    @property(ProgressBar)
    loadingBar: ProgressBar = null;

    private _isLoaded: boolean = false;
    private _sceneName: string = 'start';
    private _progress = { value: 0 };

    start() {
        EventManager.instance.register(EventType.CALL_SCENE, this.setCallScene.bind(this), this);

        this._loading();
    }

    private _onRender(): void {
        this.loadingBar.progress = this._progress.value;
        this.loadingLabel.string = `Loading... ${Math.floor(this._progress.value * 100)}%`;
    }

    private _loading(): void {
        director.preloadScene(
            this._sceneName,
            () => {
                this._isLoaded = true;
            }
        );
        tween(this._progress)
            .to(0.5, { value: 0.5 }, {
                easing: 'expoOut',
                onUpdate: this._onRender.bind(this)
            })
            .to(1.5, { value: 0.98 }, {
                easing: 'quadOut',
                onUpdate: this._onRender.bind(this)
            })
            .delay(0.5)
            .call(this._onLoadFinish.bind(this))
            .start();
    }

    private _onLoadFinish(): void {
        if (this._isLoaded) {
            tween(this._progress)
                .to(0.2, { value: 1 }, {
                    easing: 'quadOut',
                    onUpdate: this._onRender.bind(this)
                })
                .call(() => {
                    director.loadScene(this._sceneName);
                })
                .start();
        }
    }

    public setCallScene(sceneName: string) {
        if (!sceneName) {
            return;
        }
        this._sceneName = sceneName;
        this._loading();
    }
}


