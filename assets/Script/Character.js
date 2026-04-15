cc.Class({
  extends: cc.Component,

  properties: {
    currentX: 100,
    charName: "Demo player",
    mana: 100,
    processMana: cc.ProgressBar,
    labelName: cc.Label,
    anim: sp.Skeleton,
    isFaceRight: true,
  },

  start() {
    this.labelName.string = this.charName;
    this.currentMana = this.mana;
    this.updateProcess();
  },

  update(dt) {
    this.updateProcess();
    if (this.currentMana <= 0) {
      this.node.destroy();
    }

  },

  updateProcess: function () {
    this.processMana.progress = this.currentMana / this.mana;
  },

  move: function (event, param) {
    this.currentMana -= 10;
    if (+param > 0) {
      this.node.x += 50;
    } else {
      this.node.x -= 50;
    }
  },
});
