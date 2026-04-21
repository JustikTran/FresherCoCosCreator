cc.Class({
  extends: cc.Component,

  properties: {
    speed: {
      default: 2,
      serializable: true,
    },

    isMoving: {
      default: false,
      visible: false,
    },

    direction: {
      default: 1,
      visible: false,
    },

    hp: {
      default: 100,
      serializable: true,
    },

    dameLabel: {
      default: null,
      type: cc.Label,
      serializable: true,
    },

    healthProgress: {
      default: null,
      type: cc.ProgressBar,
      serializable: true,
    },
  },

  init(x, y) {
    this.x = x;
    this.y = y;
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.dameLabel.string = "";
    this.healthProgress.progress = 1;
    this.node.x = this.x;
    this.node.y = this.y;
  },

  start() {
    this.maxY = this.node.parent.height;
    this.currentHp = this.hp;
  },

  update(dt) {
    this.onMove(dt);
    this.healthProgress.progress = this.currentHp / this.hp;
    if (this.currentHp <= 0) {
      this.node.destroy();
    }
  },

  onMove(dt) {
    this.node.y += this.direction * this.speed * dt;

    if (this.node.y >= this.maxY || this.node.y <= 0) {
      this.direction *= -1;
    }
  },

  onCollisionEnter: function (other, self) {
    const dame = other.getComponent("BulletController").getDame();
    other.node.destroy();

    this.currentHp -= dame;
  },
});
