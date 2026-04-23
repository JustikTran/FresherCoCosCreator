type Constructor<T = any> = new (...args: any[]) => T;

export function Singleton<T extends Constructor>(Base: T) {
    let _instance: InstanceType<T> | null = null;

    return class extends Base {
        constructor(...args: any[]) {
            if (_instance) {
                return _instance;
            }
            super(...args);
            this._instance = this;
        }
    };
}