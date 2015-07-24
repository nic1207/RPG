/**
 * Used to display the loading screen
 * @class
 * @extends cc.LoaderScene
 */
var LoaderScene = cc.LoaderScene.extend(/** @lends LoaderScene# */{
    ctor: function () {
      this._super();
    },

    init: function () {
      cc.Scene.prototype.init.call(this);
      //logo
      var logoWidth = 126;
      var logoHeight = 89;
      var centerPos = cc.p(this._winSize.width / 2, this._winSize.height / 2);

      this._logoTexture = new Image();
      var _this = this, handler;
      this._logoTexture.addEventListener("load", handler = function () {
          _this._initStage(centerPos);
          this.removeEventListener('load', handler, false);
      });
      this._logoTexture.src = "data:image/png;base64,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" ;
      this._logoTexture.width = logoWidth;
      this._logoTexture.height = logoHeight;

      // bg
      this._bgLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 255));
      this._bgLayer.setPosition(0, 0);
      this.addChild(this._bgLayer, 0);

      //loading percent
      this._label = cc.LabelTTF.create("Loading... 0%", "Arial", 14);
      this._label.setColor(cc.c3(180, 180, 180));
      this._label.setPosition(cc.pAdd(centerPos, cc.p(0, -logoHeight / 2 - 10)));
      this._bgLayer.addChild(this._label, 10);
    }
});

LoaderScene.preload = function (resources, selector, target) {
  if (!this._instance) {
    this._instance = new LoaderScene();
    this._instance.init();
  }

  this._instance.initWithResources(resources, selector, target);

  var director = cc.Director.getInstance();
  if (director.getRunningScene()) {
    director.replaceScene(this._instance);
  } else {
    director.runWithScene(this._instance);
  }

  return this._instance;
};
