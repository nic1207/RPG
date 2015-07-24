//about 
var GameFightLayer = cc.Layer.extend({

  ctor:function () {
    this._super();
    this.setTouchEnabled(true);
    this.setMouseEnabled(true);
    cc.SpriteFrameCache.getInstance().addSpriteFrames(s_SPELL1Plist);
    var mgr = cc.SpriteBatchNode.create(s_SPELL1Motion);
        
  },

  onEnter:function () {
    this._super();
    this.gameConfig  = new GameConfig();
    this.audioEngine = cc.AudioEngine.getInstance();
    this.bhp = 999999;
    var sz = cc.Director.getInstance().getWinSize();
    var director = cc.Director.getInstance();

    var background = cc.Sprite.create(s_Fight1BG);
    var scale = sz.height / background.getContentSize().height;
    background.setScale(scale);
    background.setPosition(this.gameConfig.gameMenuScene.backgroundPosition);
    this.addChild(background, -999, this.gameConfig.globals.TAG_MENU_BACKGROUND);
    this.background = background;
    
    var boss = cc.Sprite.create(s_Slime);
    boss.setPosition(sz.width/2,sz.height/2);
    this.boss = boss;
    this.addChild(boss,99);
    
    var bosstext = cc.LabelTTF.create('名稱: 馬卡茸\n等級: 9999', "Arial", 20);
    bosstext.setColor(cc.c3b(0, 255, 0));
    bosstext.setPosition(sz.width/2,sz.height/2+180);
    this.addChild(bosstext);
    var bosshp = cc.LabelTTF.create('生命:'+this.bhp, "Arial", 20);
    bosshp.setColor(cc.c3b(0, 255, 0));
    bosshp.setPosition(sz.width/2,sz.height/2+140);
    this.addChild(bosshp);
    this.bosshp = bosshp;
        
    
    var fmenuBG = cc.Sprite.create(s_FMenuBG);
    fmenuBG.setAnchorPoint(0.5,0.5);
    fmenuBG.setScale(0.9);
    fmenuBG.setPosition(400,10);
    this.addChild(fmenuBG);
    

    this.magicFrame = new Object();
    this.magicFrame.spell1 = new Array();
    for(var i=4;i>0;i--) {
      var str = "spell1_0"+i+".png";
      var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
      this.magicFrame.spell1.push(frame);
    }
    //console.log(this.playerFrame.left);
    var magicAni = cc.Animation.create(this.magicFrame.spell1, 0.1);
    this.magicA = cc.Animate.create(magicAni);
    //this.addChild(this.magicA);
    var magic = cc.Sprite.create();
    magic.setAnchorPoint(0.5,0.5);
    magic.setPosition(50,100);
    this.boss.addChild(magic);
    this.magic = magic;
                        
    
                                                                 
    
    var menuAttLabel = cc.LabelTTF.create("很普通的攻擊", "Oblivious font", 22);
    //menuPlayTitle.setColor(cc.c3b(255, 255, 255));
    //menuAttLabel.setPosition(0,0);
    var menuAtt = cc.MenuItemLabel.create(menuAttLabel,this.doNormalAttack,this);
    menuAtt.setPosition(200,120);
    var menuPowerLabel = cc.LabelTTF.create("一擊必殺", "Oblivious font", 22);
    var menuPower = cc.MenuItemLabel.create(menuPowerLabel,this.doPowerAttack,this);
    menuPower.setPosition(180,70);
    
                             
    //var menuAtt = cc.LabelTTF.create('攻擊', "Oblivious font", 24);
    //var menuPower = cc.LabelTTF.create('太陽花攻擊', "Oblivious font", 24);
    this.fightMenu = cc.Menu.create(menuAtt, menuPower);
    this.fightMenu.setPosition(0,0);
    
    //this.fightMenu.setPosition(0,sz.height/2);
    this.addChild(this.fightMenu, 20);
    cc.AudioEngine.getInstance().playMusic(s_fightmp3,true); 
                 
    return true;
  },
  
  doNormalAttack: function() {
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
  },
  doPowerAttack: function() {
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
  },
  
  updateBlood: function(d) {
    this.bhp -= d;
    this.bosshp.setString('生命:'+this.bhp);
    if(this.bhp<=0)
      this.runPassLevel();
  },
  runPassLevel: function() {
    var saveData = GameSave.getInstance();
    //saveData.level++;
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameEndScene()));
  },

  onTouchesEnded:function (touches, event) {
    //this.isMouseDown = false;
    //this.backtoMenu();
  },
  
  doDamage: function() {
    var act1 = cc.Blink.create(1, 1);
    this.boss.runAction(act1);
    var yf = cc.TintTo.create(0.1, 200, 0, 0);
    var blink = cc.Blink.create(0.5, 4);
    var yb = cc.TintTo.create(0.1, 255, 255, 255);
    var act = cc.Sequence.create(yf,blink,yb);
    this.background.runAction(act);
    
  },

  backtoMenu:function() {
    //delete this;
    //cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameMenuScene()));
  }

});

var GameFightScene = cc.Scene.extend({
  onEnter:function() {
    this._super();
    var layer = new GameFightLayer();
    this.addChild(layer);
  }
});
