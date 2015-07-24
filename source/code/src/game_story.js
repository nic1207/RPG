//about 
var GameStoryLayer = cc.Layer.extend({
  story: null,
  talkIndex: 0,
  
  ctor:function (s) {
    this._super();
    this.setTouchEnabled(true);
    this.setMouseEnabled(true);
    this.story = s;
    //console.log(this.story,s);
    /*
    cc.SpriteFrameCache.getInstance().addSpriteFrames(s_SPELL1Plist);
    var mgr = cc.SpriteBatchNode.create(s_SPELL1Motion);
    */    
  },

  onEnter:function () {
    this._super();
    
    //this.gameConfig  = new GameConfig();
    this.audioEngine = cc.AudioEngine.getInstance();
    //this.bhp = 999999;
    var sz = cc.Director.getInstance().getWinSize();
    var director = cc.Director.getInstance();

    //var background = cc.Sprite.create(s_FMenuBG);
    //var scale = sz.height / background.getContentSize().height;
    //background.setAnchorPoint(0.5,0.5);
    //background.setScale(1.5);
    //background.setPosition(sz.width/2,sz.height/2);
                    
    //var scale = sz.height / background.getContentSize().height;
    //background.setScale(scale);
    //background.setPosition(this.gameConfig.gameMenuScene.backgroundPosition);
    //this.addChild(background, -999);
    //this.background = background;
    
    var gallery = cc.Sprite.create(s_story1);
    gallery.setAnchorPoint(0.5,1);
    gallery.setScale(0.8);
    gallery.setPosition(sz.width/2,sz.height-50);
    this.addChild(gallery, -999);
    this.gallery = gallery;
    
    var label = cc.LabelTTF.create("xx", "Arial", 20);
    label.setDimensions(cc.SizeMake(400, 300)); // 设置显示区域
    var word = this.story[this.talkIndex];
    //console.log(this.story);
    //label.setAnchorPoint(1,1);
    label.setString(word);
    label.setPosition(sz.width/2,0);
    label.setScale(1);
    this.label = label;
    this.addChild(label,0,0);
    this.talkIndex++;
    cc.AudioEngine.getInstance().playMusic(s_storymp3,true);
    return true;
  },
  
  doNormalAttack: function() {
    /*
    //console.log("doNormalAttack()");
    //var blink = cc.Blink.create(0.5, 1);
    var yf = cc.TintTo.create(0.1, 200, 0, 0);
    var blink = cc.Blink.create(0.1, 1);
    var yb = cc.TintTo.create(0.1, 255, 255, 255);
             
    var cb = cc.CallFunc.create(this.doDamage, this);
    var delay=cc.DelayTime.create(1);  
    var act = cc.Sequence.create(yf,blink,yb,delay,cb);
    this.boss.runAction(act);
    var d = Math.floor(40 + Math.random(50));
    this.updateBlood(d);
    */
  },
  doPowerAttack: function() {
    /*
    console.log("doPowerAttack()");
    //cc.SpriteFrameCache.getInstance().addSpriteFrames(s_SPELL1Plist);
    //var mgr = cc.SpriteBatchNode.create(s_SPELL1Motion);
        
    var yf = cc.TintTo.create(0.1, 200, 0, 0);
    var blink = cc.Blink.create(0.5, 4);
    var yb = cc.TintTo.create(0.1, 255, 255, 255);
    var act1 = cc.Sequence.create(yf,blink,yb);
    this.boss.runAction(act1);
        
    //magic.runAction(this.magicA);
    var oFade = cc.FadeOut.create(0.2);
    var iFade = cc.FadeIn.create(0.1);
    var delay=cc.DelayTime.create(1);
    var cb = cc.CallFunc.create(this.doDamage, this);
    
    var act = cc.Sequence.create(iFade,this.magicA,oFade,delay,cb);
    this.magic.runAction(act);
    
    var d = Math.floor(499999 + Math.random(1000));
    this.updateBlood(d);
    */
  },
  
  updateBlood: function(d) {
    /*
    this.bhp -= d;
    this.bosshp.setString('生命:'+this.bhp);
    if(this.bhp<=0)
      this.runPassLevel();
    */
  },
  runPassLevel: function() {
    /*
    var saveData = GameSave.getInstance();
    saveData.level++;
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameLevelScene()));
    */
  },

  onTouchesEnded:function (touches, event) {
    this.doNextTalk();
  },
  
  getImage: function(id) {
    switch(id) {
      case 1:
        return s_story1;
      break;
      case 2:
        return s_story2;
      break;
      case 3:
        return s_story3;
      break;
      case 4:
        return s_story4;
      break;
      case 5:
        return s_story5;
      break;
      case 6:
        return s_story6;
      break;
    }
  },
                                                
  doNextTalk: function() {
    var sz = cc.Director.getInstance().getWinSize();
    if(this.talkIndex<this.story.length) {
      var nextStr = this.story[this.talkIndex];
      this.label.setString(nextStr);
      this.talkIndex++;
      
      //var fo = cc.FadeOut.create(0);
      var mo = cc.MoveTo.create(0,cc.p(sz.width/2,0));
      //console.log(fo,mo);
      //var act1 = cc.Spawn.create(fo,mo);
      //this.gallery.runAction(fo);
      this.gallery.setOpacity(0);
      
      var img = this.getImage(this.talkIndex);
      var h = cc.TextureCache.getInstance().addImage(img);
      //console.log(h);
      this.gallery.setTexture(h);
      //this.gallery.setOpacity(0);
      var fi = cc.FadeIn.create(0.3);
      var mi = cc.MoveTo.create(0.3,cc.p(sz.width/2,sz.height-50));
      var act2 = cc.Sequence.create(mo,fi,mi);
      
      this.gallery.runAction(act2);
      
    } else {
      this.doClose();
    }
  },
  
  doClose: function() {
    this.removeFromParent();
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameLevelScene()));
  }
});

var GameStoryScene = cc.Scene.extend({
  onEnter:function() {
    this._super();
    var story = new Array();
    story.push("中果果明黨曆髮委員阿忠，趁亂宣布「開會，將服貿協議案送院會存查」，隨即「宣布散會」，以30秒之速草率宣布完成 《服冒協議》的委員會審查。");
    story.push("引發一群大學與研究所就讀學生的反對，並於在立法院外舉行「守護民主之夜」晚會，抗議輕率的審查程序。");
    story.push(" ");
    //story.push("之後有400多名學生趁著警員不備，而進入立法院內靜坐抗議，接著於晚間21時突破警方的封鎖線佔領立法院議場。");
    //story.push("在26個小時內便有以學生為主的1萬多名民眾，聚集在立法院外表達支持。參與佔領立法院議場行動者，");
    //story.push("主要學生領導人為黑色島國青年陣線（簡稱黑島青）的成員，包括國立臺灣大學政治研究所研究生林飛帆，國立清華大學社會研究所研究生陳為廷、魏揚、世新大學社發所研究生陳廷豪等人。");
    //console.log(story);
    var layer = new GameStoryLayer(story);
    this.addChild(layer);
  }
});
