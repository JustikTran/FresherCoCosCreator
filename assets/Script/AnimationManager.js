const Emitter = require("./EventEmitter");
cc.Class({
  extends: cc.Component,

  properties: {
    prefab: cc.Prefab,
    spine: sp.Skeleton,
    content: cc.Node,
    animationLabel: cc.Label,
    modeLabel: cc.Label,
    character: cc.Node,
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
    this.animationLabel.string =
      "Animation: " + (this.currentAnimation ?? "None");

    if (!this.currentAnimation) {
      this.spine.animation = null;
    } else {
      this.spine.setAnimation(0, this.currentAnimation, true);
    }
  },

  playMode() {
    this.resetState();

    this.modeLabel.string = "Mode: " + (this.currentMode || "None");
    switch (this.currentMode) {
      case "Tween":
        cc.tween(this.character).to(1, { scale: 1 }).start();
        break;
      case "RunAction":
        this.character.runAction(
          cc.sequence(cc.scaleTo(2, 2), cc.scaleTo(1.75, 1.75)),
        );
        break;
      case "TimeLine":
        let animation = this.character.getComponent(cc.Animation);
        animation.play();
        break;
      default:
        this.character.scale = 1.5;
        break;
    }
  },

  resetState() {
    cc.Tween.stopAll();
    this.character.stopAllActions();
    
    const anim = this.character.getComponent(cc.Animation);
    if (!anim) return;

    anim.stop();

    const defaultClip = anim.defaultClip;
    if (defaultClip) {
      let state = anim.getAnimationState(defaultClip.name);
      if (state) {
        state.time = 0;
        state.sample();
      }
    }
  },

  createButton(name) {
    let button = cc.instantiate(this.prefab);
    button
      .getChildByName("Background")
      .getChildByName("Label")
      .getComponent(cc.Label).string = name;

    button.getComponent("AnimationEvent").init(name);
    return button;
  },
});
