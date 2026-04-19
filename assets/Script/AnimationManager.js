const Emitter = require('./EventEmitter');
cc.Class({
  extends: cc.Component,

  properties: {
    prefab: cc.Prefab,
    spine: sp.Skeleton,
    content: cc.Node,
    animationLabel: cc.Label,
    modeLabel: cc.Label,
  },

  onLoad() {
    this.currentAnimation = null;
    this.currentMode = null;

    this.content.children = [];
    Emitter.instance.registerEvent("SPINE", this.setSpine.bind(this));
    Emitter.instance.registerEvent("MODE", this.setMode.bind(this));
  },

  start() {
    const animations = this.spine._skeleton.data.animations;

    for (const anim of animations) {
      let item = this.createButton(anim.name);
      item.parent = this.content;
    }
  },

  onDestroy() {
    Emitter.instance.removeEvent("SPINE", this.setSpine);
    Emitter.instance.removeEvent("MODE", this.setMode);
  },

  setSpine(data) {
    if (this.currentAnimation === data) {
      this.currentAnimation = null;
      this.playAnimation();
      return;
    }
    this.currentAnimation = data;
    this.playAnimation();
  },

  setMode(data) {
    if (this.currentMode === data) {
      this.currentMode = null;
      this.playMode();
      return;
    }
    this.currentMode = data;
    this.playMode();
  },

  playAnimation() {
    this.animationLabel.string = "Animation: " + (this.currentAnimation ?? 'None');

    if (!this.currentAnimation) {
      this.spine.animation = null;
    } else {
      this.spine.setAnimation(0, this.currentAnimation, true);
    }
  },

  playMode() {
    // if (!this.currentMode) {
    //   return;
    // }
    this.modeLabel.string = "Mode: " + (this.currentMode || 'None');

  },

  createButton(name) {
    let button = cc.instantiate(this.prefab);
    button
      .getChildByName("Background")
      .getChildByName("Label")
      .getComponent(cc.Label).string = name;

    button.getComponent('AnimationEvent').init(name);
    return button;
  },
});
