import { EventTarget } from "cc";

export class EventManager {
    private static _instance: EventManager;
    private _eventTarget: EventTarget;
    private _listeners: Map<any, { eventName: string, method: any }[]>;

    private constructor() {
        this._eventTarget = new EventTarget();
        this._listeners = new Map();
    }

    public static get instance(): EventManager {
        if (!this._instance) {
            this._instance = new EventManager();
        }
        return this._instance;
    }

    public emit(event: string, ...args: any[]) {
        this._eventTarget.emit(event, ...args);
    }

    public register(event: string, callback: any, owner: any) {
        this._eventTarget.on(event, callback);
        if (!this._listeners.has(owner)) {            
            this._listeners.set(owner, []);            
        }
        this._listeners.get(owner)?.push({ eventName: event, method: callback });
    }

    public unregister(event: string, callback: any, owner: any) {
        this._eventTarget.off(event, callback);
        const listeners = this._listeners.get(owner);
        if (listeners) {
            const index = listeners.findIndex(listener => listener.eventName === event && listener.method === callback);
            if (index !== -1) {
                listeners.splice(index, 1);
                if (listeners.length === 0) {
                    this._listeners.delete(owner);
                }
            }
        }
    }

    public unregisterAll(owner: any) {
        const listeners = this._listeners.get(owner);
        if (listeners) {
            listeners.forEach(listener => {
                this.unregister(listener.eventName, listener.method, owner);
            });
            this._listeners.delete(owner);
        }

    }

    public destroy() {
        this._listeners.clear();
        this._eventTarget.targetOff(this);
    }
}