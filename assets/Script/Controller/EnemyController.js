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
    this.labeBase = this.dameLabel.node.position;
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

  onHit() {
    cc.Tween.stopAllByTarget(this.node);

    cc.tween(this.node)
      .to(0.1, { color: cc.Color.RED })
      .to(0.1, { color: cc.Color.WHITE })
      .start();
  },

  showDamage(damage) {
    const node = this.dameLabel.node;

    cc.Tween.stopAllByTarget(node);

    node.opacity = 255;
    node.scale = 0.8;
    node.setPosition(this.labeBase);

    this.dameLabel.string = `-${damage}`;
    node.x += (Math.random() - 0.5) * 20;

    cc.tween(node)
      .parallel(
        cc.tween().to(0.5, { y: node.y + 40 }),
        cc.tween().to(0.5, { opacity: 0 }),
        cc.tween().to(0.1, { scale: 1.2 }).to(0.2, { scale: 1 })
      )
      .start();
  },

  onCollisionEnter: function (other, self) {
    const dame = other.getComponent("BulletController").getDame();
    other.node.destroy();
    this.onHit();
    this.showDamage(dame);
    this.currentHp -= dame;
  },
});
