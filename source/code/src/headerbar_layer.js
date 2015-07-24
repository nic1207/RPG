var TimerNode = cc.Node.extend({
    _second:0,
    _minute:0,
    _parent: null,
    _maxTicks:0,


    ctor:function (parent, timerConfig, level) {
      this._super();

      this._parent = parent ;
      this.timerConfig = timerConfig ;
	    this.level = level ;

	    if(!this._parent) {
        console.log('null parent!!', parent);
        return ;
      }

      this._init() ;
    },

    _init: function() {
      this._timerLabel = cc.LabelTTF.create("xx:xx", this.timerConfig.textFont, this.timerConfig.textSize);
      this._timerLabel.setColor(cc.c3b(255, 255, 255));
      this._timerLabel.setPosition(this.timerConfig.position);

      this._minute = this.timerConfig[this.level].INIT_MINUTE ;
      this._second = this.timerConfig[this.level].INIT_SECOND ;

      this._maxTicks = this._minute * 60 +  this._second  ;

      console.log(this.level+ ' _init: countdown '+ this._maxTicks+ ' seconds') ;

      this.updateTimerLabel(this._minute, this._second) ;

      this._parent.addChild(this._timerLabel) ;
    },

    getElapsedTicks: function() {
      var diff = this._maxTicks - (this._minute*60 + this._second) ;
      // var elapsedMin = parseInt(diff/60) ;
      // var elapsedSec = parseInt(diff%60) ;

      //var elapsedStr = this.getTimerStr(elapsedMin, elapsedSec);
      //console.log(elapsedStr);
      return diff ;
    },

    getTimerStr: function(min, sec) {
      var minStr = (min>9)? min: "0"+min ;
      var secStr = (sec>9)? sec: "0"+sec ;
      return (minStr + ":"+ secStr ) ;
    },

    updateTimerLabel: function(min, sec) {
      var timerStr = this.getTimerStr(min, sec)
      this._timerLabel.setString(timerStr);
    },

    tick:function() {
      if((this._second-1) < 0) {
        if(this._minute > 0) {
          this._minute--;
          this._second = 59;
        } else {  // this._minute <= 0
          this._parent.timesUp() ;
          return ;
        }
      } else {  // (this._second-1)>=0
        this._second--;
      }

      this.updateTimerLabel(this._minute, this._second) ;
    }
});
/*
 * HeaderBar
 */
var HeaderBarLayer = cc.LayerGradient.extend({
  funcTimesUp: null,
  timer:null,

  ctor:function (level) {
    this._super();

    this.init(cc.c4b(0,0,0,255), cc.c4b(225, 225, 225, 35));
    this.gameConfig  = new GameConfig();
    //console.log(level);

	  // add countdown timer
    this.timer = new TimerNode(this, this.gameConfig.headerbar.timer, level) ;

    this.director = cc.Director.getInstance();

    this.size = this.director.getWinSize();
    this.height = this.size.height / this.gameConfig.headerbar.scaleHeight;
    this.width = this.size.width;

    this.setContentSize(this.width, this.height);
    this.setPosition(0, this.size.height-this.height);

    this.createHeaderMenus();
  },

  onEnterTransitionDidFinish: function() {
    this._super();
    //this.playBackgroundMusic();
    this.startTimer();
  },
        
  
  onExit: function() {
    console.log("onExit");
    //this.scheduleOnce(this.endTimer, 1.0);
    //this.endTimer();
  },

  startTimer:function() {
    this.schedule(this.updateTimer, 1.0);

    if (!GameConfig.isMute()) {
      GameConfig.playMusic(s_musicLV1) ;
    }
  },
  
  endTimer: function() {
    console.log("endTimer");
    //this.unschedule(this.updateTimer);
    if (!GameConfig.isMute()) {
      GameConfig.stopMusic(s_musicLV1);
    }
  },

  updateTimer: function() {
    this.timer.tick();
  },

  // assigns callback for timesup
  delegateTimesUp: function(callback) {
    if(typeof callback === 'function') {
      this.funcTimesUp = callback ;
    }
  },

  timesUp: function() {
    console.log('timesUp') ;
    this.unschedule(this.updateTimer);
    //this.endTimer();
    this.funcTimesUp() ;
  },

  getElapsedTime: function() {
    return this.timer.getElapsedTicks();
  },

  createHeaderMenus: function() {

    var menuConfig = this.gameConfig.headerbar.menu;
    this.size = this.director.getWinSize();
    //var menuItemBack = cc.MenuItemSprite.create(menuConfig.exitNormal, menuConfig.exitSelected,
    //  this.onGoBack, this.menu);
    //menuItemBack.setPosition(-100, 0);
    var menuItemPause = cc.MenuItemSprite.create(menuConfig.pauseNormal, menuConfig.pauseSelected,
      this.onGoPause, this);
    menuItemPause.setPosition(-50, 30);

    this.menu = cc.Menu.create(menuItemPause);
    //this.menu.alignItemsHorizontallyWithPadding(50);
    //this.menu.alignItemsVertically();
    //this.menu.setPosition(this.gameConfig.gameMenuScene.menuPosition);
    //console.log(this.width-menuConfig.offsetWidth,this.height-menuConfig.offsetHeight);
    //this.menu.setPosition(860, 0);
    this.menu.setPosition(this.size.width,0);
    this.addChild(this.menu, 3);
  },

  initMoneyStatus: function() {
    var moneyConfig = this.gameConfig.headerbar.moneyScore ;

    var moneyIcon =  new cc.Sprite(moneyConfig.iconTexture, moneyConfig.iconTextureRect) ;
    moneyIcon.setAnchorPoint(cc.p(0,0)) ;
    moneyIcon.setPosition(moneyConfig.iconPosition);
    this.addChild(moneyIcon);

    var moneyScore = new GameScore() ;
    moneyScore.setAnchorPoint(cc.p(0,0)) ;
    moneyScore.setPosition(moneyConfig.textPosition);
    this.addChild(moneyScore, 96, this.gameConfig.globals.TAG_SCORE);

    return moneyScore;
  },

  onGoPause: function() {
    //console.log(cc.Director.getInstance()._paused);
    if (!cc.Director.getInstance()._paused) {
      cc.Director.getInstance().pause();
      var gpause = new GamePauseLayer();
      if(this.parent)
        this.parent.addChild(gpause,10,30);
    }
  }

  //onGoBack: function() {
  //  console.log('onGoBack') ;
  //  cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameMenuScene()));
  //}

});
