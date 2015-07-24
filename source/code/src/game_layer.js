// Game Container
var GameLayer = cc.Layer.extend({
  gameViewSize:null,
  world: null,

	ctor:function () {
		this._super();
        this.scheduleUpdate();
        this.gameConfig = new GameConfig();
        gameViewSize = cc.Director.getInstance().getWinSize();
        //console.log(gameViewSize.width);
  },

  draw: function() {
    this._super();
    //if(this.world)
    //  this.world.DrawDebugData();
  },

  update:function (dt) {
    /*
        var playerMotion = this.getChildByTag(this.gameConfig.globals.TAG_PLAYER);
        //console.log(playerMotion.position.x + playerMotion.body.GetPosition().x);
        if(playerMotion && playerMotion.position.x + playerMotion.body.GetPosition().x * 30 > gameViewSize.width/2){
          if(playerMotion.body.GetPosition().x < 70) {
              this.setPositionX(-(playerMotion.position.x + playerMotion.body.GetPosition().x * 30 - (gameViewSize.width/2)));
          }
        }
    */
  }

    /*
    onAccelerometer:function (accelerationValue) {
        cc.log("接收到了重力感应的数值",accelerationValue);
    },
    */

});
