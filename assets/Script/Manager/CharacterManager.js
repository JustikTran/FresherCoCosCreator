const { EventCall, EventMove } = require("../Config/GlobalVariable");
const Emitter = require("../EventEmitter");

cc.Class({
  extends: cc.Component,

  properties: {
    character: {
      default: null,
      type: cc.Node,
    },

    coolDown: {
      default: 1,
      type: cc.Float,
    },
  },

  onLoad() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onListen, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onStopMove, this);
  },

  start() {
    this.lastShootTime = 0;
  },

  update(dt) {},

  onListen(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.space:
        this.tryShoot();
        break;
      case cc.macro.KEY.a:
        Emitter.instance.emit(EventCall.MOVE, EventMove.LEFT);
        break;
      case cc.macro.KEY.w:
        Emitter.instance.emit(EventCall.MOVE, EventMove.UP);
        break;
      case cc.macro.KEY.s:
        Emitter.instance.emit(EventCall.MOVE, EventMove.DOWN);
        break;
      case cc.macro.KEY.d:
        Emitter.instance.emit(EventCall.MOVE, EventMove.RIGHT);
        break;
      default:
        // Emitter.instance.emit(EventCall.MOVE, EventMove.NONE);
        break;
    }
  },

  onStopMove(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        Emitter.instance.emit(EventCall.STOP);
        break;
      case cc.macro.KEY.w:
        Emitter.instance.emit(EventCall.STOP);
        break;
      case cc.macro.KEY.s:
        Emitter.instance.emit(EventCall.STOP);
        break;
      case cc.macro.KEY.d:
        Emitter.instance.emit(EventCall.STOP);
        break;
      default:
        break;
    }
  },

  tryShoot() {
    const now = Date.now() / 1000;

    if (now - this.lastShootTime < this.coolDown) {
      return;
    }

    this.lastShootTime = now;
    this.onShoot();
  },

  onShoot() {
    let pointPosition = this.character.getComponent('Character').getShootPoint();
    
    Emitter.instance.emit(EventCall.SHOOT, pointPosition);
    this.countDown = true;
  },

  onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onListen, this);
    Emitter.instance.removeAllEvent(this);
  },
});
