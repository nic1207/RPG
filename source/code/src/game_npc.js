/*
 * GamePlayerUnit.js
 */
//===========================================================================================
var GameNPC = cc.Sprite.extend({
  _layer: null,
  _t: 0,

  ctor: function(id) {
    cc.log("GameNPC ctor()");
    this.npcid = id;
    this._super();
    this.init();
    this.audioEngine = cc.AudioEngine.getInstance();
  },
  //------------------------------------------------------------------
  //人物初始設定
  init: function() {
    this.Frame = new Object();
    
    this.Frame.left = new Array();
    for(var i=1;i<5;i++) {
      var str = "npc"+this.npcid+"_w_0"+i+".png";
      var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
      //console.log(frame);
      this.Frame.left.push(frame);
    }
    //console.log(this.Frame.left);
    var leftAnimation = cc.Animation.create(this.Frame.left, 0.08);
    this.leftAction1 = cc.Animate.create(leftAnimation);
    this.leftActionR = cc.RepeatForever.create(this.leftAction1);
    
    this.Frame.right = new Array();
    for(var i=1;i<5;i++) {
      var str = "npc"+this.npcid+"_e_0"+i+".png";
      var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
      this.Frame.right.push(frame);
    }
    //console.log(this.Frame.right);
    var rightAnimation = cc.Animation.create(this.Frame.right, 0.08);
    this.rightAction1 = cc.Animate.create(rightAnimation);
    this.rightActionR = cc.RepeatForever.create(this.rightAction1);
    
    this.Frame.up = new Array();        
    for(var i=1;i<5;i++) {
      var str = "npc"+this.npcid+"_n_0"+i+".png";
      var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
      this.Frame.up.push(frame);  
    }
    //console.log(this.Frame.up);
    var upAnimation = cc.Animation.create(this.Frame.up, 0.1);
    this.upAction1 = cc.Animate.create(upAnimation);
    this.upActionR = cc.RepeatForever.create(this.upAction1);
    
    this.Frame.down = new Array();
    for(var i=1;i<5;i++) {
      var str = "npc"+this.npcid+"_s_0"+i+".png";
      var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
      this.Frame.down.push(frame);
    }
    //console.log(this.Frame.down);
    var downAnimation = cc.Animation.create(this.Frame.down, 0.1);
    this.downAction1 = cc.Animate.create(downAnimation);
    this.downActionR = cc.RepeatForever.create(this.downAction1);
                                                                                                   
    
    var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("npc"+this.npcid+"_s_01.png");
    this.setDisplayFrame(frame);
    this.scheduleUpdate();
  },
  
  doMoveTo: function(tp) {
    var nowp = this.getPosition();
    console.log(nowp,tp);
    this.tp = tp;
    this.autoMove = true;
  },
  //------------------------------------------------------------------
  //設定人物右移
  rightWalk: function() {
    //console.log("right walk");
    //if(this.LR && this.LR!="R")
    //  return;
    var nowp = this.getPosition();
    var dp = cc.p(2,0);
    //var tp = cc.p(nowp.x+dp.x+8,nowp.y+dp.y-24-2);
    //this.tp = tp;
    //if(this.parent.checkCollision(tp))
    //  return;
    //console.log("pos=",pos);
    var mov = cc.MoveBy.create(0.1,dp);
    //var ani = this.rightActionR;
    //var act = cc.Spawn.create(mov,ani);
    //this.runAction(act);
    this.runAction(mov);
    if(!this.LR) {
      this.stopAllActions();
      var ani = this.rightActionR;
      this.runAction(ani);
    }
                
    //this.runAction(ani);
    this.LR = "R";
  },
  //------------------------------------------------------------------
  //設定人物左移
  leftWalk: function() {
    //if(this.LR && this.LR!="L")
    //  return;
    //console.log("left walk",this.getPosition().x);
    //this.stopAllActions();
    var nowp = this.getPosition();
    var dp = cc.p(-2,0); 
    //var tp = cc.p(nowp.x+dp.x-8,nowp.y+dp.y-24-2);
    //this.tp = tp;
    //if(this.parent.checkCollision(tp))
    //  return;
    //console.log("pos=",pos); 
    var mov = cc.MoveBy.create(0.1,dp);
    //var ani = this.leftActionR;
    //var act = cc.Spawn.create(mov,ani);
    //this.runAction(act);
    this.runAction(mov);
    if(!this.LR) {
      this.stopAllActions();
      var ani = this.leftActionR;
      this.runAction(ani);
    }
    //this.runAction(ani);
    this.LR = "L";
  },
  upWalk: function() {
    //console.log("up walk",this.getPosition().x);
    //if(this.UD && this.UD!="U")
    //  return;
          
    //this.stopAllActions();
    var nowp = this.getPosition();
    var dp = cc.p(0,2);
    //var tp = cc.p(nowp.x+dp.x,nowp.y+dp.y-32+12);
    //this.tp = tp;
    //if(this.parent.checkCollision(tp))
    //  return;
    //console.log("pos=",pos); 
    var mov = cc.MoveBy.create(0.1,dp);
    //var ani = this.upActionR;
    //var act = cc.Spawn.create(mov,ani);
    //this.runAction(act);
    this.runAction(mov);
    //this.runAction(ani);
    if(!this.UD) {
      this.stopAllActions();
      var ani = this.upActionR;
      this.runAction(ani);
    }
                     
    this.UD = "U";
  },
  downWalk: function() {
    //console.log("down walk",this.getPosition().x); 
    //if(this.UD && this.UD!="D")
    //  return;
          
    //this.stopAllActions();
    var nowp = this.getPosition();
    var dp = cc.p(0,-2);
    //var tp = cc.p(nowp.x+dp.x,nowp.y+dp.y);
    //this.tp = tp;
    //if(this.parent.checkCollision(tp))
    //  return;
    //console.log("pos=",pos);
    var mov = cc.MoveBy.create(0.1,dp);
    //var ani = this.downActionR;
    //var act = cc.Spawn.create(mov,ani);
    //this.runAction(act);
    this.runAction(mov);
    if(!this.UD) {
      this.stopAllActions();
      var ani = this.downActionR;
      this.runAction(ani);
    }
    this.UD = "D";
    //var z = this.getZOrder();
    //console.log(z);
    //;this.reorderChild(sprite, -nowp.y);
  },
  
  checkPosition: function() {
    var nowp = this.getPosition();
    //console.log(nowp,this.tp);
    //if(Math.floor(nowp.x)>=this.tp.x)
    //  this.LR = null;
    //if(Math.floor(nowp.y)>=this.tp.y)
    //  this.UD = null;
          
    if(Math.floor(nowp.x)==this.tp.x && Math.floor(nowp.y)==this.tp.y) {
      this.autoMove = false;
      //console.log(this.autoMove);
      //this.stopAllActions();
      this.removeSelf();
    }
  },
  
  setIdle: function(e) {
    /*
    this.direction = null;
    if(e === cc.KEY.a) {
      //if(this.leftActionR._originalTarget)
      //  this.stopAction(this.leftActionR);
      this.stopAllActions();
      this.setDisplayFrame(this.Frame.left[0]);
    }
    else if(e === cc.KEY.d) {
      //if(this.rightActionR._originalTarget)
      //this.stopAction(this.rightActionR);
      this.stopAllActions();
      this.setDisplayFrame(this.Frame.right[0]);
    }
    else if(e === cc.KEY.w) {
      //if(this.upActionR._originalTarget)
      //  this.stopAction(this.upActionR);
      this.stopAllActions();
      this.setDisplayFrame(this.Frame.up[0]);
    }
    else if(e === cc.KEY.s) {
      //if(this.downActionR._originalTarget)
      //  this.stopAction(this.downActionR);
      this.stopAllActions();
      this.setDisplayFrame(this.Frame.down[0]);
    }
    */
  },                                                                                                                             
  //------------------------------------------------------------------
  //設定人物跳躍
  jump: function() {
  },
  
  //------------------------------------------------------------------
  //設定人物KEYBOARD按下觸發動作
  handleKey:function(e) {
    /*
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
      //this.jump();
    }
    else if(e === cc.KEY.l) {
      //this.launchBullet();
    }
    */
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
  update: function(dt) {
    if(this.autoMove) {
      //console.log(dt);
      if(this._t >0.1) {
        var nowp = this.getPosition();
        if(Math.floor(nowp.x)<this.tp.x)
          this.rightWalk();
        else if(Math.floor(nowp.x)>this.tp.x)
          this.leftWalk();
        else if(Math.floor(nowp.y)<this.tp.y)
          this.upWalk();
        else if(Math.floor(nowp.y)>this.tp.y)
          this.downWalk();
        this.checkPosition(dt);
        this._t = 0;
      }
      this._t += dt;
    }
    /*
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
    */
  },
  //------------------------------------------------------------------
  removeSelf: function() {
    this.stopAllActions();
    this.removeFromParent();
  },
  
  tileCoordForPosition: function(p) {
    //var x = p.x / map.getTileSize().width;
    //var y = (((map.getMapSize().height-1) * map.getTilesize().height) - p.y) / map.getTileSize().height;
    //return cc.p(x,y);
  },
  
  checkCollision: function() {
    //var tileCoord = tileCoordForPosition(this.getPosition());
  },
    
  playDieEffect: function() {
    //播放GG音效
    //if (!GameConfig.isMute())
    //  this.audioEngine.playEffect(s_dieSound);
  },
  
  playWinEffect: function() {
    //播放win音效
    //if (!GameConfig.isMute())   
    //  this.audioEngine.playEffect(s_passed);
  }
  //------------------------------------------------------------------
});
