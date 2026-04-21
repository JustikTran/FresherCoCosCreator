const { EventCall, EventMove } = require("./Config/GlobalVariable");
const Emitter = require("./EventEmitter");

cc.Class({
  extends: cc.Component,

  properties: {
    moveDistance: 50,
    charName: "Demo player",
    mana: 100,
    minorMana: 5,
    processMana: cc.ProgressBar,
    labelName: cc.Label,
    anim: sp.Skeleton,
    spine: cc.Node,
    isFaceRight: true,
    speed: 10,
    shootPoint: {
      default: null,
      type: cc.Node,
    },
  },

  onLoad() {
    this.isMoving = false;
    // this.targetX = 0;
    // this.currentX = this.node.x;

    this.stepX = 0;
    this.stepY = 0;

    Emitter.instance.registerEvent(
      EventCall.MOVE,
      this.onMove.bind(this),
      this,
    );
    Emitter.instance.registerEvent(
      EventCall.STOP,
      this.onStopMove.bind(this),
      this,
    );
  },

  start() {
    // this.labelName.string = this.charName;
    // this.currentMana = this.mana;
    // this.updateProcess();

    this.getShootPoint();
  },

  update(dt) {
    if (this.isMoving) {
      this.node.x += this.stepX * this.speed * dt;
      this.node.y += this.stepY * this.speed * dt;
    }
  },

  updateProcess: function () {
    this.processMana.progress = this.currentMana / this.mana;
  },

  onMove(param) {
    this.stepX = 0;
    this.stepY = 0;
    this.isMoving = true;

    switch (param) {
      case EventMove.UP:
        this.stepY = 1;
        break;
      case EventMove.DOWN:
        this.stepY = -1;
        break;
      case EventMove.LEFT:
        this.stepX = -1;
        break;
      case EventMove.RIGHT:
        this.stepX = 1;
        break;
    }
  },

  onStopMove() {
    this.isMoving = false;
    this.anim.animation = "idle";
  },

  getShootPoint() {
    return this.shootPoint.convertToWorldSpaceAR(cc.v2(0, 0));
  },
});
