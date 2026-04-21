cc.Class({
  extends: cc.Component,

  properties: {
    enemyPrefabs: {
      default: [],
      type: [cc.Prefab],
    },

    secondSpawn: {
      default: 3,
      serializable: true,
    },

    limitEnemy: {
      default: 5,
      type: cc.Integer,
      visible: false,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.maxX = this.node.width;
    this.maxY = this.node.height;
    this.currentTime = 0;

    let manager = cc.director.getCollisionManager();
    manager.enabled = true;
  },

  start() {},

  update(dt) {
    if (
      // this.currentTime >= this.secondSpawn &&
      this.limitEnemy > this.node.children.length
    ) {
      // this.currentTime = 0;
      this.spawnEnemy();
    }

    // this.currentTime += dt;
  },

  spawnEnemy() {
    let enemy = cc.instantiate(this.enemyPrefabs[0]);
    enemy.getComponent("EnemyController").init(100, 100);
    enemy.parent = this.node;
  },

  randomPosition() {},
});
