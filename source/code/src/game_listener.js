
// The basic event listener.
var GameListener = cc.Class.extend({

	ctor:function (event, callback, object) {
    	cc.log("GameListener ctor()");
    	this.event = event;
    	this.callback = callback;
    	this.object = object;
    },

});