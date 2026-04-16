cc.Class({
  extends: cc.Component,

  properties: {
    moveDistance: 50,
    charName: "Demo player",
    mana: 100,
    minorMana:5,
    processMana: cc.ProgressBar,
    labelName: cc.Label,
    anim: sp.Skeleton,
    spine: cc.Node,
    isFaceRight: true,
    speed: 10,
  },

  onLoad() {
    this.isMoving = false;
    this.targetX = 0;
    this.currentX = this.node.x;
  },

  start() {
    this.labelName.string = this.charName;
    this.currentMana = this.mana;
    this.updateProcess();
  },

  update(dt) {
    if (this.currentMana <= 0) {
      this.node.destroy();
    }

    if (!this.isMoving) {
      return;
    }

    this.updateProcess();

    this.node.x += dt * this.step;

    if (Math.abs(this.targetX - this.node.x) >= this.moveDistance) {
      this.isMoving = false;
      this.anim.animation = "idle";
    }
  },

  updateProcess: function () {
    this.processMana.progress = this.currentMana / this.mana;
  },

  onMove: function (event, param = 1) {
    if (this.isMoving) {
      return;
    }
    const dir = Number(param); 
    this.targetX = this.node.x + this.moveDistance * dir;
    if (this.targetX > 600 || this.targetX < -600) {
      this.step = 0;
      return;
    }
    this.anim.animation = "walk";

    this.isMoving = true;
    this.currentMana -= this.minorMana;

    this.isFaceRight = dir === 1;

    const absScaleX = Math.abs(this.spine.scaleX);
    this.spine.scaleX = this.isFaceRight ? absScaleX : -absScaleX;


    this.step = this.speed * dir;
  },
});
