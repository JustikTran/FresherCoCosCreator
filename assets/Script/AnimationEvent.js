const Emitter = require('./EventEmitter');
cc.Class({
    extends: cc.Component,

    init(data) {
        this.data = data;
    },

    start() {
    },

    onChangeSpine() {
        Emitter.instance.emit("SPINE", this.data);
    },

    onChangeMode(event, mode) {
        Emitter.instance.emit("MODE", mode);
    },

    onReset(){
        Emitter.instance.emit("RESET")
    }
});