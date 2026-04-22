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
    this.isShooting = false;
    // this.targetX = 0;
    // this.currentX = this.node.x;

    this.velocity = cc.v2(0, 0);
    this.targetDirection = cc.v2(0, 0);

    this.anim.setMix("idle", "shoot", 0.05);

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

    Emitter.instance.registerEvent(
      EventCall.SHOOT,
      this.onShoot.bind(this),
      this,
    );
  },

  start() {
    this.labelName.string = this.charName;
    this.currentMana = this.mana;
    this.updateProcess();

    this.getShootPoint();
  },

  update(dt) {
    this.velocity = this.velocity.lerp(this.targetDirection, 0.2);
    if (this.isShooting) {
      return;
    }
    const parent = this.node.parent;

    let newX = this.node.x + this.velocity.x * this.speed * dt;
    let newY = this.node.y + this.velocity.y * this.speed * dt;

    let clampedX = Math.max(0, Math.min(parent.width, newX));
    let clampedY = Math.max(0, Math.min(parent.height, newY));

    if (clampedX !== newX) {
      this.velocity.x = 0;
    }
    if (clampedY !== newY) {
      this.velocity.y = 0;
    }

    this.node.setPosition(clampedX, clampedY);

    if (this.velocity.mag() > 0.01) {
      if (this.anim.animation !== "walk") {
        this.anim.animation = "walk";
      }
    } else {
      if (this.anim.animation !== "idle") {
        this.anim.animation = "idle";
      }
    }
  },

  updateProcess: function () {
    this.processMana.progress = this.currentMana / this.mana;
  },

  onMove(param) {
    this.isMoving = true;

    switch (param) {
      case EventMove.UP:
        this.targetDirection.y = 1;
        break;
      case EventMove.DOWN:
        this.targetDirection.y = -1;
        break;
      case EventMove.LEFT:
        this.targetDirection.x = -1;
        break;
      case EventMove.RIGHT:
        this.targetDirection.x = 1;
        break;
    }

    this.targetDirection = this.targetDirection.normalize();
  },

  onStopMove() {
    // this.isMoving = false;
    this.targetDirection = cc.v2(0, 0);
  },

  onShoot() {
    if (this.isShooting) {
      return;
    }
    this.isShooting = true;
    this.anim.setAnimation(1, "shoot", false);
    this.anim.setAnimation(0, "idle", false);
    this.anim.setCompleteListener(() => {
      this.isShooting = false;
    });
    this.anim.addAnimation(0, this.velocity.mag() > 0 ? "walk" : "idle", true);
  },

  getShootPoint() {
    return this.shootPoint.convertToWorldSpaceAR(cc.v2(0, 0));
  },
});
