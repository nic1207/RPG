//about 
var GameAboutLayer = cc.Layer.extend({
  isMouseDown:false,
  lo: 0,
  
  ctor:function () {
    this._super();
    this.setTouchEnabled(true);
    this.setMouseEnabled(true);
  },

  onEnter:function () {
    this._super();

    this.gameConfig  = new GameConfig();
    this.audioEngine = cc.AudioEngine.getInstance();

    var sz = cc.Director.getInstance().getWinSize();
    var director = cc.Director.getInstance();

    var background = cc.Sprite.create(s_AboutBG);
    var scale = sz.height / background.getContentSize().height;
    background.setScale(scale);
    this.background = background;

    background.setPosition(this.gameConfig.gameMenuScene.backgroundPosition);
    this.addChild(background, -999, this.gameConfig.globals.TAG_MENU_BACKGROUND);
    return true;
  },

  onTouchesEnded:function (touches, event) {
    this.isMouseDown = false;
    if(!this.lo) {
      var h = cc.TextureCache.getInstance().addImage(s_ThankBG);
      this.background.setTexture(h);
                      
    } else {
      this.backtoMenu();
    }
    this.lo++;
  },

  backtoMenu:function() {
    delete this;
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameMenuScene()));
  }

});

var GameAboutScene = cc.Scene.extend({
  onEnter:function() {
    this._super();
    var layer = new GameAboutLayer();
    this.addChild(layer);
  }
});
