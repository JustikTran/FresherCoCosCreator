import { _decorator, Component, director, Label, Node, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    @property(Label)
    loadingLabel: Label = null;
    @property(ProgressBar)
    loadingBar: ProgressBar = null;

    private _isLoaded: boolean = false;
    private _sceneName: string = 'start';

    start() {
        director.preloadScene(
            this._sceneName,
            () => {
                this._isLoaded = true;
            }
        )
    }

    update(dt: number): void {
        if (this._isLoaded) {
            director.loadScene(this._sceneName);
        }
    }

    public setCallScene(sceneName: string) {
        if (!sceneName) {
            return;
        }
        this._sceneName = sceneName;
    }
}


