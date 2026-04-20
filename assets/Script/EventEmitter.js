const EventEmitter = require("events");

class mEmitter {
  constructor() {
    this._emitter = new EventEmitter();
    this._emitter.setMaxListeners(100);

    this._ownerMap = new Map();
  }

  emit(...args) {
    this._emitter.emit(...args);
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
    this._emitter.removeListener(event, listener);
  }

  removeAllEvent(owner) {
    const records = this._ownerMap.get(owner);
    if (!records) return;

    for (const { event, listener } of records) {
      this._emitter.removeListener(event, listener);
    }

    this._ownerMap.delete(owner);
  }

  destroy() {
    this._emitter.removeAllListeners();
    this._emitter = null;
    mEmitter.instance = null;
  }
}

mEmitter.instance = new mEmitter();
module.exports = mEmitter;
