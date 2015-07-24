/*
 * GamePlayerUnit.js
 */
//===========================================================================================
var joke = [
"鹿茸是鹿耳朵的毛",
"誰吃了我的蛋糕～蛋糕還是屏東的",
"退回服貿，逐條審查！！",
"我是鄉民，跟進來看熱鬧的",
"孩子悶，回家吧!",
"利大於弊! Z > B !",
"我不是暴民!",
"柔性驅離, 輕拍肩膀",
"來人阿, 喂公子吃餅.."
];
var GamePlayer = cc.Sprite.extend({
  _layer: null,

  ctor: function() {
    cc.log("GamePlayer ctor()");
    this._super();
    this.init();
    //this.gameConfig = new GameConfig();
    this.audioEngine = cc.AudioEngine.getInstance();
  },
  //------------------------------------------------------------------
  //人物初始設定
  init: function() {
    this.playerFrame = new Object();
    
    this.playerFrame.left = new Array();
    for(var i=1;i<5;i++) {
      var str = "player_w_0"+i+".png";
      var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
      //console.log(frame);
      this.playerFrame.left.push(frame);
    }
    //console.log(this.playerFrame.left);
    var leftAnimation = cc.Animation.create(this.playerFrame.left, 0.1);
    this.leftAction1 = cc.Animate.create(leftAnimation);
    this.leftActionR = cc.RepeatForever.create(this.leftAction1);
    
    this.playerFrame.right = new Array();
    for(var i=1;i<5;i++) {
      var str = "player_e_0"+i+".png";
      var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
      this.playerFrame.right.push(frame);
    }
    //console.log(this.playerFrame.right);
    var rightAnimation = cc.Animation.create(this.playerFrame.right, 0.1);
    this.rightAction1 = cc.Animate.create(rightAnimation);
    this.rightActionR = cc.RepeatForever.create(this.rightAction1);
    
    this.playerFrame.up = new Array();        
    for(var i=1;i<5;i++) {
      var str = "player_n_0"+i+".png";
      var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
      this.playerFrame.up.push(frame);  
    }
    //console.log(this.playerFrame.up);
    var upAnimation = cc.Animation.create(this.playerFrame.up, 0.1);
    this.upAction1 = cc.Animate.create(upAnimation);
    this.upActionR = cc.RepeatForever.create(this.upAction1);
    
    this.playerFrame.down = new Array();
    for(var i=1;i<5;i++) {
      var str = "player_s_0"+i+".png";
      var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
      this.playerFrame.down.push(frame);
    }
    //console.log(this.playerFrame.down);
    var downAnimation = cc.Animation.create(this.playerFrame.down, 0.1);
    this.downAction1 = cc.Animate.create(downAnimation);
    this.downActionR = cc.RepeatForever.create(this.downAction1);
                                                                                                   
    
    var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("player_s_01.png");
    this.setDisplayFrame(frame);
    this.scheduleUpdate();
  },
  //------------------------------------------------------------------
  //設定人物右移
  rightWalk: function() {
    //console.log("right walk");
    var nowp = this.getPosition();
    var dp = cc.p(1,0);
    var tp = cc.p(nowp.x+dp.x+8,nowp.y+dp.y-24-2);
    this.tp = tp;
    if(this.parent.checkCollision(tp))
      return;
    //console.log("pos=",pos);
    var mov = cc.MoveBy.create(0.1,dp);
    //var ani = this.rightActionR;
    //var aaa = cc.Spawn.create(mov,ani);
    //this.runAction(ani);
    this.runAction(mov);
    //this.runAction(aaa);
  },
  //------------------------------------------------------------------
  //設定人物左移
  leftWalk: function() {
    //console.log("left walk",this.getPosition().x);
    var nowp = this.getPosition();
    var dp = cc.p(-1,0); 
    var tp = cc.p(nowp.x+dp.x-8,nowp.y+dp.y-24-2);
    this.tp = tp;
    if(this.parent.checkCollision(tp))
      return;
    //console.log("pos=",pos); 
    var mov = cc.MoveBy.create(0.1,dp);
    //var ani = this.leftActionR;
    //var aaa = cc.Spawn.create(mov,ani);
    //this.runAction(ani);
    this.runAction(mov);
  },
  upWalk: function() {
    //console.log("up walk",this.getPosition().x);
    var nowp = this.getPosition();
    var dp = cc.p(0,1);
    var tp = cc.p(nowp.x+dp.x,nowp.y+dp.y-32+12);
    this.tp = tp;
    if(this.parent.checkCollision(tp))
      return;
    //console.log("pos=",pos); 
    var mov = cc.MoveBy.create(0.1,dp);
    //var ani = this.upActionR;
    //var aaa = cc.Spawn.create(mov,ani);
    //this.runAction(ani);
    this.runAction(mov);
  },
  downWalk: function() {
    //console.log("down walk",this.getPosition().x); 
    var nowp = this.getPosition();
    var dp = cc.p(0,-1);
    var tp = cc.p(nowp.x+dp.x,nowp.y+dp.y-32-2);
    this.tp = tp;
    if(this.parent.checkCollision(tp))
      return;
    //console.log("pos=",pos);
    var mov = cc.MoveBy.create(0.1,dp);
    //var ani = this.downActionR;
    //var aaa = cc.Spawn.create(mov,ani);
    //this.runAction(ani);
    this.runAction(mov);
  },
  setIdle: function(e) {
    this.direction = null;
    if(e === cc.KEY.a) {
      //if(this.leftActionR._originalTarget)
      //  this.stopAction(this.leftActionR);
      this.stopAllActions();
      this.setDisplayFrame(this.playerFrame.left[0]);
    }
    else if(e === cc.KEY.d) {
      //if(this.rightActionR._originalTarget)
      //this.stopAction(this.rightActionR);
      this.stopAllActions();
      this.setDisplayFrame(this.playerFrame.right[0]);
    }
    else if(e === cc.KEY.w) {
      //if(this.upActionR._originalTarget)
      //  this.stopAction(this.upActionR);
      this.stopAllActions();
      this.setDisplayFrame(this.playerFrame.up[0]);
    }
    else if(e === cc.KEY.s) {
      //if(this.downActionR._originalTarget)
      //  this.stopAction(this.downActionR);
      this.stopAllActions();
      this.setDisplayFrame(this.playerFrame.down[0]);
    }
    
  },                                                                                                                             
  //------------------------------------------------------------------
  query: function() {
    //console.log("XXXXXXXXX");
    if(this.parent.popup)
      return;
    var nowp = this.getPosition();
    var item = this.parent.getItemTileInfo(nowp);
    if(item) {
      var story = new Array();
      var o = new Object();
      //o.id = parseInt(item.itemid);
      o.id = 0;
      switch(item.itemid) {
        case "1":
          o.id = 88;
          o.say = "秋意:\n經過我抽絲剝繭反覆查證, 這絕對是...\n香蕉！！";
        break;
        case "2":
          o.say = "獲得 屏東來的蛋糕 x1";
        break;
        case "3":
          o.say = "獲得 台中太陽餅 x1";
        break;
        default:
          
        break;
      }
      //console.log(o);
      story.push(o);
      var popup = new GamePopupLayer(story,false,false);
      //this.popup = popup;
      popup.parent = this.parent;
      this.parent.popup = popup;
      this.parent.gameLayer.addChild(popup, 99, 18);
      return;                                                            
    }
    var obj = this.parent.getNPCTileInfo(nowp);
    if(obj) {
      console.log("obj=",obj);
      switch(obj.npcid) {
        case "98":
          var saveData = GameSave.getInstance();
          saveData.pos = nowp;
          var story = new Array();
          var o = new Object();
          o.id = parseInt(obj.npcid);  
          o.say = "來來哥：\n你來...來....來....\n你來...來....來....";
          //console.log(o);
          story.push(o);
          var popup = new GamePopupLayer(story,true,false);
          //this.popup = popup;
          popup.parent = this.parent;
          this.parent.popup = popup;
          this.parent.gameLayer.addChild(popup, 99, 18);
          //this.audioEngine.playEffect(s_hitOGG);
          this.audioEngine.playMusic(s_comemp3);
        break;
        case "99":
          console.log("BOSS");
          var saveData = GameSave.getInstance();
          saveData.pos = nowp;
          this.doFight();
        break;
        default:
          var story = new Array();
          var o = new Object();
          o.id = parseInt(obj.npcid);
          var rd = Math.floor(Math.random()*joke.length);
          //console.log(rd);
          o.say = joke[rd];
          //console.log(o);
          story.push(o);
          var popup = new GamePopupLayer(story,false,false);
          //this.popup = popup;
          popup.parent = this.parent;
          this.parent.popup = popup;
          this.parent.gameLayer.addChild(popup, 99, 18);
        break;
      }
    } else {
      var story = new Array();
      var o = new Object();
      o.id = 0;
      o.say = "沒有發現任何東西...";
      story.push(o);
      var popup = new GamePopupLayer(story,false,false);
      //this.popup = popup;
      popup.parent = this.parent;
      this.parent.popup = popup;
      this.parent.gameLayer.addChild(popup, 99, 18);
    }
  },
  
  nextDialog: function() {
    console.log("nextDialog()");
    if(this.parent.popup)
      this.parent.popup.doNextTalk();
  },
  
  doFight: function() {  
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameFightScene()));
  },
        
  
  //------------------------------------------------------------------
  //設定人物KEYBOARD按下觸發動作
  handleKey:function(e) {
    if(this.direction)
      return;
    //if(this.die)
    //  return false;

    if(e === cc.KEY.a) {
      if(this.direction != "left") {
        this.runAction(this.leftActionR);
        this.leftWalk();
        this.direction = "left";
      }
    }
    else if(e === cc.KEY.d) {
      if(this.direction != "right") {
        this.runAction(this.rightActionR);
        this.rightWalk();
        this.direction = "right";
      }
    }
    else if(e === cc.KEY.w) {
      if(this.direction != "up") {
        this.runAction(this.upActionR);
        this.upWalk();
        this.direction = "up";
      }
    }
    else if(e === cc.KEY.s) {
      if(this.direction != "down") {
        this.runAction(this.downActionR);
        this.downWalk();
        this.direction = "down";
      }
    }
    else if(e === cc.KEY.k) {
      this.query();
    }
    else if(e === cc.KEY.enter) {
      this.nextDialog();
    }
  },
  draw: function() {
    this._super();
    /*
    cc.renderContext.fillStyle = "rgba(255,255,255,1)";
    cc.renderContext.strokeStyle = "rgba(0,255,255,1)";
        
    //if (this._radians < 0)
    this._radians = 360;
    //console.log(this.tp);
    //if(this.tp) 
    cc.drawingUtil.drawCircle(cc.p(32,32), 30, cc.DEGREES_TO_RADIANS(this._radians), 60, true);
    */                        
    
  },
  
  //------------------------------------------------------------------
  //人物UPDATE
  update: function() {
    if(this.direction && !this.stopMoving) {
      switch (this.direction)
      {
        case "down":
          this.downWalk();
        break;
        case "up":
          this.upWalk();
        break;
        case "left":
          this.leftWalk();
        break;
        case "right":
          this.rightWalk();
        break;
      }
    }
  },
  //------------------------------------------------------------------
  removeSelf: function() {
    //this.stopAllActions();
    //this.removeFromParent();
  },
  /*
  tileCoordForPosition: function(p) {
    var x = p.x / map.getTileSize().width;
    var y = (((map.getMapSize().height-1) * map.getTilesize().height) - p.y) / map.getTileSize().height;
    return cc.p(x,y);
  },
  
  checkCollision: function() {
    var tileCoord = tileCoordForPosition(this.getPosition());
  },
  */
    
  playDieEffect: function() {
    //播放GG音效
    if (!GameConfig.isMute())
      this.audioEngine.playEffect(s_dieSound);
  },
  playWinEffect: function() {
    //播放win音效
    if (!GameConfig.isMute())   
      this.audioEngine.playEffect(s_passed);
  }
  //------------------------------------------------------------------
});
