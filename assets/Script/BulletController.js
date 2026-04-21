cc.Class({
  extends: cc.Component,

  properties: {
    speed: {
      default: 100,
      type: cc.Integer,
    },
    dame: {
      default: 10,
      type: cc.Integer,
    },
  },

  init(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
  },

  onLoad() {
    if (!this.positionX) {
      this.positionX = 0;
    }

    if (!this.positionY) {
      this.positionY = 0;
    }
  },

  start() {
    this.node.x = this.positionX;
    this.node.y = this.positionY;
  },

  update(dt) {
    this.node.x += this.speed * dt;
    if (Math.abs(this.node.x - this.positionX) === 1500) {
      console.log("onDestroy");

      this.onDestroy();
    }
  },

  getDame() {
    return this.dame;
  },

  onDestroy() {
    this.node.destroy();
  },
});
