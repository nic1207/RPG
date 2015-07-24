/*
 * 遊戲暫停介面
 */
var GamePauseLayer = cc.LayerColor.extend({
  //isMouseDown:false,
  
  ctor: function() {
    this._super();
    this.init();
  },
  
  init:function() {
    cc.log("GamePauseLayer.init()");
    this._super(cc.c4b(0, 0, 0, 200));
    this.setTouchEnabled(true);
    //this.initWithColor(new cc.Color4B(0,0,0,255));
    //this._super(cc.c4b(0, 0, 0, 180));
    //var selfPointer = this;
    var size = cc.Director.getInstance().getWinSize();
    //this.setTouchEnabled(true);
    //var testSprite = cc.Sprite.create("res/HelloWorld.png");
    //testSprite.setPosition(cc.p(10, 10));
    //this.addChild(testSprite, 1);
    var centerPos = cc.p(size.width / 2, size.height / 2);
    //cc.MenuItemFont.setFontSize(30);
    var menuItemResume = cc.MenuItemSprite.create(cc.Sprite.create(s_MenuResume),
      cc.Sprite.create(s_MenuResume), this.onResume, this);
    var menuItemExit = cc.MenuItemSprite.create(cc.Sprite.create(s_MenuLeave), 
      cc.Sprite.create(s_MenuLeave), this.onLeave, this);
          
    var menu = cc.Menu.create(menuItemResume,menuItemExit);
    menu.setPosition(centerPos);
    menu.alignItemsVerticallyWithPadding(30);
    this.addChild(menu,1000,999);
    cc.registerTargetedDelegate(-127, true, this);
    //return true;
  },
  
  onResume: function() {
    cc.Director.getInstance().resume();
    cc.unregisterTouchDelegate(this);
    this.removeFromParent();
  },
  
  onLeave: function() {
    cc.Director.getInstance().resume();
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameMenuScene()));
  },
  
  //以下的3个函数是必须要用到的，不然会有错，必须加
  onTouchBegan:function(touch, event){
    return true;
  },
  onTouchMoved:function(touch, event){
    return true;
  },
  onTouchEnded:function(touch, event){
    return true;
  }
  //onTouchesCancelled:function (touches, event) {
  //}
});

/*
var GamePauseScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    layer = new GamePauseLayer();
    layer.init();
    this.addChild(layer);
  }  
});
*/