cc.Class({
  extends: cc.Component,

  properties: {
    dragonPrefab: {
      type: cc.Prefab,
      default: null,
      serializable: true,
    },
    wolfPrefab: {
      type: cc.Prefab,
      default: null,
      serializable: true,
    },
    dogPrefab: {
      type: cc.Prefab,
      default: null,
      serializable: true,
    },
    secondSpawn: {
      default: 2,
      serializable: true,
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
    if (this.currentTime >= this.secondSpawn) {
      this.currentTime = 0;
      this.spawnEnemy();
    }

    this.currentTime += dt;
  },

  spawnEnemy() {},

});
