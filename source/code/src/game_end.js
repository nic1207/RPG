//about 
var GameEndLayer = cc.Layer.extend({
  isMouseDown:false,

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

    var background = cc.Sprite.create(s_EndBG);
    var scale = sz.height / background.getContentSize().height;
    background.setScale(scale);

    background.setPosition(this.gameConfig.gameMenuScene.backgroundPosition);
    this.addChild(background, -999, this.gameConfig.globals.TAG_MENU_BACKGROUND);
    cc.AudioEngine.getInstance().playMusic(s_ismp3,true);
    return true;
  },

  onTouchesEnded:function (touches, event) {
    this.isMouseDown = false;
    this.backtoMenu();
  },

  backtoMenu:function() {
    delete this;
    var saveData = GameSave.getInstance();
    saveData.level = 1;
    saveData.pos = cc.p(0,0);
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameMenuScene()));
  }

});

var GameEndScene = cc.Scene.extend({
  onEnter:function() {
    this._super();
    var layer = new GameEndLayer();
    this.addChild(layer);
  }
});
