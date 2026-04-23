import { EventTarget } from "cc";

export class mEmitter {
    private static _instance: mEmitter;
    _emitter: EventTarget;
    _ownerMap: Map<any, any>;

    private constructor() {
        this._emitter = new EventTarget();
        this._ownerMap = new Map();
    }

    public static get instance(): mEmitter {
        if (!this._instance) {
            this._instance = new mEmitter();
        }
        return this._instance;
    }

    emit(event, ...rest) {
        this._emitter.emit(event, ...rest);
    }

    registerEvent(event, listener, owner) {
        this._emitter.on(event, listener);

        if (owner) {
            if (!this._ownerMap.has(owner)) {
                this._ownerMap.set(owner, []);
            }

            this._ownerMap.get(owner).push({ event, listener });
        }
    }

    registerOnce(event, listener) {
        this._emitter.once(event, listener);
    }

    removeEvent(event, listener) {
        this._emitter.off(event, listener);
    }

    removeAllEvent(owner) {
        const records = this._ownerMap.get(owner);
        if (!records) return;

        for (const { event, listener } of records) {
            this._emitter.off(event, listener);
        }

        this._ownerMap.delete(owner);
    }

    destroy() {
        this._ownerMap.clear();
        this._emitter = null;
        mEmitter._instance = null;
    }
}