cc.Class({
  extends: cc.Component,

  properties: {
    prefab: cc.Prefab,
    spine: sp.Skeleton,
    content: cc.Node
  },

  onLoad() {
    this.content.children = [];
  },

  start() {
    const animations = this.spine._skeleton.data.animations;

    for (const anim of animations) {
      let item = this.createButton(anim.name);
      item.parent = this.content;
    }
  },

  createButton(name) {
    let button = cc.instantiate(this.prefab);
    button
      .getChildByName("Background")
      .getChildByName("Label")
      .getComponent(cc.Label).string = name;
    return button;
  },
});
