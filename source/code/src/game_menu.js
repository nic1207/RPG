var MENUITEM_PARENT_TAG = 0;
var MENUITEM_PLAY_TAG = 1;
var MENUITEM_ABOUT_TAG = 2;

//遊戲選單場景
var GameMenuLayer = cc.Layer.extend({
  isMouseDown:false,

  ctor:function () {
    sys.garbageCollect();
    this._super();

    if ('touches' in sys.capabilities)
      this.setTouchEnabled(true); // KEYBOARD Not supported
    else if ('mouse' in sys.capabilities && 'keyboard' in sys.capabilities) {
      this.setMouseEnabled(true);
      this.setKeyboardEnabled(true);
    }
  },

  onEnter:function () {
    this._super();

    this.gameConfig  = new GameConfig();
    this.audioEngine = cc.AudioEngine.getInstance();

    var sz = cc.Director.getInstance().getWinSize();
    var director = cc.Director.getInstance();

    var background = new cc.Sprite(cc.TextureCache.getInstance().addImage(s_MenuBG));
    var scale = sz.height / background.getContentSize().height;
    background.setScale(scale);

    background.setPosition(cc.p(sz.width/2,sz.height/2));
    this.addChild(background, -999, this.gameConfig.globals.TAG_MENU_BACKGROUND);


    //if(!GameConfig.isMute()) {
    //  GameConfig.playMusic(s_musicMenu) ;
    //}

    // Add the menu
    this.initMenuLayer() ;

    /*var instructionsButton = new cc.MenuItemImage.create(s_MenuInstructions,s_MenuInstructions,this.playGame,this);
    var aboutButton = new cc.MenuItemImage.create(s_MenuAbout,s_MenuAbout,this.playGame,this);
    var menu = cc.Menu.create(playButton, instructionsButton, aboutButton);
    var menu = cc.Menu.create(playButton);
    menu.alignItemsHorizontallyWithPadding(50);
    menu.setPosition(this.gameConfig.gameMenuScene.menuPosition);
    this.addChild(menu);*/
    cc.AudioEngine.getInstance().playMusic(s_8bitmp3,true);
    return true;
  },

  initMenuLayer: function() {
    var menuConfig = this.gameConfig.gameMenuScene.menuConfig ;

    // create Play menu
    /*
    var menuItemPlay = cc.MenuItemSprite.create(menuConfig.playNormal,
      menuConfig.playSelected, menuConfig.playDisabled, this.playGame, this);

    var menuPlayTitle = cc.LabelTTF.create('Play', menuConfig.labelFont, menuConfig.labelSize);
    menuPlayTitle.setColor(cc.c3b(255, 255, 255));
    menuPlayTitle.setPosition(menuConfig.labelPosition);
    menuItemPlay.addChild(cc.MenuItemLabel.create(menuPlayTitle), 1) ;
    menuItemPlay.setPosition(menuConfig.menuPlayPosition);
    menuItemPlay.setTag(MENUITEM_PLAY_TAG);


    // create AboutMe menu
    var menuItemAbout = cc.MenuItemSprite.create(menuConfig.aboutNormal, menuConfig.aboutSelected, this.showAbout, this);

    var menuAboutTitle = cc.LabelTTF.create('About', menuConfig.labelFont, menuConfig.labelSize);
    menuAboutTitle.setColor(cc.c3b(255, 255, 255));
    menuAboutTitle.setPosition(menuConfig.labelPosition);
    menuItemAbout.addChild(cc.MenuItemLabel.create(menuAboutTitle), 1);
    menuItemAbout.setPosition(menuConfig.menuAboutPosition);
    menuItemAbout.setTag(MENUITEM_ABOUT_TAG);
    */
    //this.mainMenu = cc.Menu.create(menuItemPlay, menuItemAbout);
    var menuPlayTitle = cc.LabelTTF.create('Play', menuConfig.labelFont, menuConfig.labelSize);
    var menuItemPlay = cc.MenuItemLabel.create(menuPlayTitle, this.playGame, this);
    menuItemPlay.setPosition(menuConfig.menuPlayPosition);
    menuItemPlay.setTag(MENUITEM_PLAY_TAG);
        
    var menuAboutTitle = cc.LabelTTF.create('About', menuConfig.labelFont, menuConfig.labelSize);
    var menuItemAbout = cc.MenuItemLabel.create(menuAboutTitle, this.showAbout, this);
    menuItemAbout.setPosition(menuConfig.menuAboutPosition);
    menuItemAbout.setTag(MENUITEM_ABOUT_TAG);
     
    this.mainMenu = cc.Menu.create(menuItemPlay, menuItemAbout);
    this.mainMenu.setPosition(menuConfig.menuPosition);

    this.addChild(this.mainMenu, 20, MENUITEM_PARENT_TAG);
    this._selectedMenuTag = -1;
  },

  onKeyUp:function(keycode) {
    switch(keycode) {
      case cc.KEY.tab: // 9
        var items = this.mainMenu.getChildren() ;
        var nextFocusIdx = -1;

        if(this._selectedMenuTag ===-1) {
          this._selectedMenuTag = items[0].getTag() ;
          nextFocusIdx = 0;
        }
        else {
          for(var i=0, len=items.length; i<len; i++) {
            if(items[i].isSelected()) {
              items[i].unselected() ;
              this._selectedMenuTag = items[(i+1)%len].getTag() ;
              nextFocusIdx = (i+1)%len;
              break ;
            }
          }
        }
        if (!GameConfig.isMute()){
          GameConfig.playEffect(s_btnSwitchWAV);
        }
        items[nextFocusIdx].selected();
        break;
      case 13: //enter
        if(this._selectedMenuTag !== -1) {
          var selectedItem = this.mainMenu.getChildByTag(this._selectedMenuTag);
          if(selectedItem)
            selectedItem.activate();
        }
        break;
      case 117: // F6
        GameConfig.toggleGameSound() ;
        break ;

    }
  },
  onTouchesMoved:function (touches, event) {
    //if (this.isMouseDown) {
    //  if (touches) {
    //    //
    //  }
    //}
  },
  onTouchesEnded:function (touches, event) {
    this.isMouseDown = false;
    // this.playGame();
  },
  onTouchesCancelled:function (touches, event) {
    //console.log("onTouchesCancelled");
  },

  showAbout: function() {
    this._selectedMenuTag = MENUITEM_ABOUT_TAG;
    this._focusChangeSound();
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameAboutScene()));
  },

  playGame:function() {
    //this._focusChangeSound();
    this._selectedMenuTag = MENUITEM_PLAY_TAG;

    delete this;
    //var director = cc.Director.getInstance();
    //cc.log("Director.isCleanupToScene = " + director.isSendCleanupToScene());
    //cc.AnimationCache.purgeSharedAnimationCache();
    //cc.SpriteFrameCache.purgeSharedSpriteFrameCache();
    //cc.TextureCache.purgeSharedTextureCache();
    //director.purgeDirector();
    GameConfig.stopMusic() ;
    //cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameLevelScene()));
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameStoryScene()));
    //cc.log("Director.isCleanupToScene = " + director.isSendCleanupToScene());
  },

  _focusChangeSound: function() {
    //if(!GameConfig.isMute())
    //  this.audioEngine.playEffect(s_changeSceneMP3);
  }

});

// This is called in main.js to load the main game menu
var GameMenuScene = cc.Scene.extend({
  onEnter:function() {
    this._super();
    var layer = new GameMenuLayer();
    // layer.init();
    this.addChild(layer);
  }
});
