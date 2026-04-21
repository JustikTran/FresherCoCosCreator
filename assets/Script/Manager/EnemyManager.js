const { RandomIndex, RandomPosition } = require("../Utils/Random");

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
    let randomIndex = RandomIndex(this.enemyPrefabs.length);
    let randomPosition = RandomPosition(0, this.maxX, 0, this.maxY);
    let enemy = cc.instantiate(this.enemyPrefabs[randomIndex]);
    enemy
      .getComponent("EnemyController")
      .init(randomPosition.x, randomPosition.y);
    enemy.parent = this.node;
  },

  randomPosition() {},
});
