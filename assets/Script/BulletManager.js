const { EventCall } = require("./Config/GlobalVariable");
const Emitter = require("./EventEmitter");

cc.Class({
  extends: cc.Component,

  properties: {
    defaultBullet: {
      default: null,
      type: cc.Prefab,
    },

    bulletPrefabs: {
      default: [],
      type: [cc.Prefab],
    },

    currentBullet: {
      default: null,
      type: cc.Prefab,
      visible: false,
    },
  },

  onLoad() {
    let manager = cc.director.getCollisionManager();
    manager.enabled = true;

    this.mapPrefabs = new Map();

    if (this.defaultBullet) {
      this.currentBullet = this.defaultBullet;
    }

    cc.systemEvent.on(
      cc.SystemEvent.EventType.KEY_DOWN,
      this.onChangeBullet,
      this,
    );

    Emitter.instance.registerEvent(
      EventCall.SHOOT,
      this.onShoot.bind(this),
      this,
    );
  },

  spawnBullet(x, y) {
    if (!this.currentBullet) {
      return;
    }

    const bullet = cc.instantiate(this.currentBullet);
    bullet.getComponent("BulletController").init(x, y);
    bullet.parent = this.node;
  },

  onChangeBullet(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.e:
        console.log("normal");
        this.currentBullet = this.bulletPrefabs[2];
        break;
      case cc.macro.KEY.r:
        console.log("dark");
        this.currentBullet = this.bulletPrefabs[0];
        break;
      case cc.macro.KEY.t:
        console.log("light");
        this.currentBullet = this.bulletPrefabs[1];
        break;
    }
  },

  onShoot(vector2) {
    let spawnPosition = this.node.convertToNodeSpaceAR(vector2);

    this.spawnBullet(spawnPosition.x, spawnPosition.y);
  },

  onDestroy() {
    Emitter.instance.removeAllEvent(this);
    cc.systemEvent.off(
      cc.SystemEvent.EventType.KEY_DOWN,
      this.onChangeBullet,
      this,
    );
  },
});
