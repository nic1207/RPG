var BASE_MENUITEM_L_TAG = 1;
var BASE_MENUITEM_R_TAG = 2;
var BASE_MENUITEM_U_TAG = 3;
var BASE_MENUITEM_D_TAG = 4;
var BASE_MENUITEM_A_TAG = 5;
//var BASE_MENUITEM_B_TAG = 4;

var BASE_MENU_TAG = 10;

var ControlBarLayer = cc.Layer.extend({
  _target: null,
  _isTouching: -1,  // touched direction, 1: LEFT, 2: RIGHT

	ctor:function () {
    this._super(); 
    this.init();

    this.scheduleUpdate();
  },

  init:function() {
    this.setTouchEnabled(true);
    this.setTouchMode(cc.TOUCH_ALL_AT_ONCE);
    this.setKeyboardEnabled(true);
  },

  setTarget: function(t) {
    this._target = t;
    //console.log("target=",t);
  },

  debugTouch: function(initStr) {
    var winSize = cc.Director.getInstance().getWinSize() ;
    this.logLabel = cc.LabelTTF.create(initStr, "Arial", 28);
    this.logLabel.setPosition(30, (winSize.height*8/10));
    this.logLabel.setColor(cc.c3b(128, 255, 55));
    this.logLabel.setAnchorPoint(cc.p(0,0));
    this.addChild(this.logLabel) ;
  },

  logPos: function(evtType, position) {
    if(!this.logLabel || !evtType)
      return ;

    if(!position) {
      this.logLabel.setString(evtType);
      return ;
    }

    var logMsg = evtType+ ': ('+ position.x.toFixed(2)+','+ position.y.toFixed(2)+')' ;
    console.log(logMsg);
    this.logLabel.setString(logMsg);
  },

  onEnter:function () {
    
    this._super();
    //this.registerWithTouchDispatcher(); 
    //cc.TouchDispatcher.sharedDispatcher().addStandardDelegate(this,0);
    this.gameBtnConfig = new GameConfig().gameActionBtn;
    //this.audioEngine = cc.AudioEngine.getInstance();

    cc.registerTargetedDelegate(0, true, this);


    // == add left and right controls ========= //
    this.debugTouch();  //for debug message on screen
    
    this.background = this.gameBtnConfig.background;
    this.background.setPosition(0,15);
    
    this.leftNormal =  this.gameBtnConfig.leftNormal;
    this.leftNormal.setPosition(this.gameBtnConfig.leftPosition);
    this.leftSelected =  this.gameBtnConfig.leftSelected;
    this.leftSelected.setPosition(this.gameBtnConfig.leftPosition);

    this.rightNormal =  this.gameBtnConfig.rightNormal;
    this.rightNormal.setPosition(this.gameBtnConfig.rightPosition);
    this.rightSelected = this.gameBtnConfig.rightSelected;
    this.rightSelected.setPosition(this.gameBtnConfig.rightPosition);
    
    this.upNormal =  this.gameBtnConfig.upNormal;
    this.upNormal.setPosition(this.gameBtnConfig.upPosition);
    this.upSelected =  this.gameBtnConfig.upSelected;
    this.upSelected.setPosition(this.gameBtnConfig.upPosition);
    
    this.downNormal =  this.gameBtnConfig.downNormal;
    this.downNormal.setPosition(this.gameBtnConfig.downPosition);
    this.downSelected =  this.gameBtnConfig.downSelected;
    this.downSelected.setPosition(this.gameBtnConfig.downPosition);
    
    this.jumpNormal =  this.gameBtnConfig.jumpNormal ;
    this.jumpNormal.setPosition(this.gameBtnConfig.jumpPosition) ;

    this.jumpSelected =  this.gameBtnConfig.jumpSelected ;
    this.jumpSelected.setPosition(this.gameBtnConfig.jumpPosition) ;
    /*
    this.hitNormal =  this.gameBtnConfig.hitNormal ;
    this.hitNormal.setPosition(this.gameBtnConfig.hitPosition) ;

    this.hitSelected = this.gameBtnConfig.hitSelected ;
    this.hitSelected.setPosition(this.gameBtnConfig.hitPosition) ;
    */
    this.leftNormal.setAnchorPoint(cc.p(0,0));
    this.leftSelected.setAnchorPoint(cc.p(0,0));
    this.rightNormal.setAnchorPoint(cc.p(0,0));
    this.rightSelected.setAnchorPoint(cc.p(0,0));
    this.upNormal.setAnchorPoint(cc.p(0,0));
    this.upSelected.setAnchorPoint(cc.p(0,0));
    this.downNormal.setAnchorPoint(cc.p(0,0));
    this.downSelected.setAnchorPoint(cc.p(0,0));
    this.background.setAnchorPoint(cc.p(0,0));

    this.jumpNormal.setAnchorPoint(cc.p(0,0));
    this.jumpSelected.setAnchorPoint(cc.p(0,0));
    //this.hitNormal.setAnchorPoint(cc.p(0,0));
    //this.hitSelected.setAnchorPoint(cc.p(0,0));

    this.leftSelected.setVisible(false) ;
    this.rightSelected.setVisible(false);
    this.upSelected.setVisible(false);
    this.downSelected.setVisible(false);
        

    this.jumpSelected.setVisible(false) ;
    //this.hitSelected.setVisible(false);

    this.addChild(this.leftNormal);
    this.addChild(this.leftSelected);
    this.addChild(this.rightNormal);
    this.addChild(this.rightSelected);
    this.addChild(this.upNormal);
    this.addChild(this.upSelected);
    this.addChild(this.downNormal); 
    this.addChild(this.downSelected);
    this.addChild(this.background);
                

    this.addChild(this.jumpNormal);
    this.addChild(this.jumpSelected);
    //this.addChild(this.hitNormal);
    //this.addChild(this.hitSelected);


    this.recLeft = cc.rect(this.gameBtnConfig.leftPosition.x, this.gameBtnConfig.leftPosition.y ,
      this.leftNormal.getContentSize().width, this.leftNormal.getContentSize().height);
    this.recRight = cc.rect(this.gameBtnConfig.rightPosition.x, this.gameBtnConfig.rightPosition.y ,
      this.rightNormal.getContentSize().width, this.rightNormal.getContentSize().height);
    this.recUp = cc.rect(this.gameBtnConfig.upPosition.x, this.gameBtnConfig.upPosition.y ,
      this.upNormal.getContentSize().width, this.upNormal.getContentSize().height);
    this.recDown = cc.rect(this.gameBtnConfig.downPosition.x, this.gameBtnConfig.downPosition.y ,
      this.downNormal.getContentSize().width, this.downNormal.getContentSize().height);
    this.recbtnA = cc.rect(this.gameBtnConfig.jumpPosition.x, this.gameBtnConfig.jumpPosition.y ,
      this.jumpNormal.getContentSize().width, this.jumpNormal.getContentSize().height);
        
                    
    
    this.btnA = cc.MenuItemSprite.create(this.gameBtnConfig.jumpNormal,
      this.gameBtnConfig.jumpSelected, this.doJump, this) ;
    /*
    this.btnB = cc.MenuItemSprite.create(this.gameBtnConfig.hitNormal,
      this.gameBtnConfig.hitSelected,  this.doHit, this) ;
    */
  
    //this.btnA = cc.rect(this.gameBtnConfig.jumpPosition.x, this.gameBtnConfig.jumpPosition.y ,
    //  this.jumpNormal.getContentSize().width, this.jumpNormal.getContentSize().height);
    //this.btnB = cc.rect(this.gameBtnConfig.hitPosition.x, this.gameBtnConfig.hitPosition.y ,
    //  this.hitNormal.getContentSize().width, this.hitNormal.getContentSize().height);
    
    this.btnA.setTag(BASE_MENUITEM_A_TAG);
    //this.btnB.setTag(BASE_MENUITEM_B_TAG);

    //var menu = cc.Menu.create(this.btnL, this.btnR, this.btnA, this.btnB);
    var menu = cc.Menu.create(this.btnA);
    menu.setPosition(0,0);

    this.btnA.setAnchorPoint(cc.p(0, 0));
    //this.btnB.setAnchorPoint(cc.p(0, 0));

    this.btnA.setPosition(this.gameBtnConfig.jumpPosition);
    //this.btnB.setPosition(this.gameBtnConfig.hitPosition) ;

    //this.addChild(menu, BASE_MENU_TAG);
  },

  onExit: function() {
    //cc.Director.sharedDirector().getTouchDispatcher().removeDelegate(this);
    //cc.unregisterTouchDelegate(this);
    this._super();
    this.setTouchEnabled(false);
  },

  releaseBtn: function(keycode) {
    this._isTouching = -1 ;
    switch(keycode) {
      case cc.KEY.a: // 65: left
        this.leftSelected.setVisible(false);
        this.leftNormal.setVisible(true);
        break;
      case cc.KEY.d:  //68: right
        this.rightSelected.setVisible(false);
        this.rightNormal.setVisible(true);
        break;
      case cc.KEY.w:
        this.upSelected.setVisible(false);
        this.upNormal.setVisible(true);
      break;
      case cc.KEY.s:
        this.downSelected.setVisible(false);
        this.downNormal.setVisible(true);
      break;
      
      case cc.KEY.k: //75: up
        this.jumpSelected.setVisible(false);
        this.jumpNormal.setVisible(true);
        break;
      /*
      case cc.KEY.l: //76: attack
        this.hitSelected.setVisible(false);
        this.hitNormal.setVisible(true);
        break;
      */
    }
  },

  update: function(df) {
    // do nothing if currently is not moving
    if(this._isTouching===-1) {
      return;
    } else {
      //this._move(this._isTouching) ;
      //this._jump(this._isTouching) ;
    }
  },

  getDirection: function(pos) {
    // if the touched position in left or right button
    var onL = cc.rectContainsPoint(this.recLeft,  pos);
    var onR = cc.rectContainsPoint(this.recRight, pos);
    var onU = cc.rectContainsPoint(this.recUp,    pos);
    var onD = cc.rectContainsPoint(this.recDown,  pos);
    var onA = cc.rectContainsPoint(this.recbtnA, pos);
    //var onB = cc.rectContainsPoint(this.btnB, pos);

    if(onL){
      return BASE_MENUITEM_L_TAG;
    }
    if(onR) {
      return BASE_MENUITEM_R_TAG;
    }
    if(onU) {
      return BASE_MENUITEM_U_TAG;
    }
    if(onD) {
      return BASE_MENUITEM_D_TAG;
    }
    if(onA) {
      return BASE_MENUITEM_A_TAG;
    }
    //if(onB) {
    //  return BASE_MENUITEM_B_TAG;
    //}

    return -1 ;
  },

  
  onTouchBegan:function (touch, event) {
    console.log("onTouchBegan1");
    if(this.getDirection(touch.getLocation()) === -1) {
      this._isTouching = -1;
    } 
    else {
      this._isTouching = this.getDirection(touch.getLocation()) ;
      this._move( this.getDirection(touch.getLocation()) ) ;
      this._selected(this.getDirection(touch.getLocation())) ;
    }
      
    //return true;
  },
  

  onTouchesBegan:function (touches, event){
    //var curPoint = touch.getLocation();
    //var direction = this.getDirection(curPoint) ;
    console.log("onTouchBegan");
    //cc.log('onTouchBegan')
    //var direction = this.getDirection(curPoint) ;

    //if(direction === -1) {
    //  this._isTouching = -1;
    //  return false;
    //}
    //this.logPos('onTouchBegan', curPoint);
    //this._isTouching = direction ;
    //this._selected(direction) ;
    //console.log(touches.length);
    for(var i = 0 ; i < touches.length ; i++) {
      if(this.getDirection(touches[i].getLocation()) === -1) {
        this._isTouching = -1;
        //return false;
      } 
      else {
        this._move( this.getDirection(touches[i].getLocation()) ) ;
        this._selected(this.getDirection(touches[i].getLocation())) ;
        this._isTouching = this.getDirection(touches[i].getLocation()) ;
      }
    }

    //return true ;
  },

  
  onTouchEnded:function (touch, event) {
    console.log("onTouchEnded1");
    if(this.getDirection(touch.getLocation()) === -1) {
        this._isTouching = -1;
        return false;
    }

    if(this._isTouching !== -1) {
      var releaseKey = -1;
      if(this._isTouching === BASE_MENUITEM_L_TAG) {
        releaseKey = cc.KEY.a ;  // release left key
      } 
      else if(this._isTouching === BASE_MENUITEM_R_TAG) {
        releaseKey = cc.KEY.d ;  // release right key
      }
      if(this._isTouching === BASE_MENUITEM_U_TAG) {
        releaseKey = cc.KEY.w;
      }
      if(this._isTouching === BASE_MENUITEM_D_TAG) {
        releaseKey = cc.KEY.s;
      }
      
      // release jump key
      if(this._isTouching === BASE_MENUITEM_A_TAG) {
        releaseKey = cc.KEY.k;
      }
      /*
      // release jump key
      if(this._isTouching === BASE_MENUITEM_B_TAG) {
        releaseKey = cc.KEY.l;
      }
      */

      if(releaseKey !== -1) {
        console.log('release key :'+ releaseKey) ;
        this._target.setIdle(releaseKey);
      }

      this.releaseBtn(releaseKey) ;
      this._isTouching = -1;
    }
    return true;
  },

  onTouchesEnded:function (touches, event) {
    //console.log("onTouchEnded");
    if(touches.length === 0)
      return false;

    for(var i = 0 ; i < touches.length ; i++) {
      if(this.getDirection(touches[i].getLocation()) === -1) {
        this._isTouching = -1;
        return false;
      }

      if(this._isTouching !== -1) {
        var releaseKey = -1;
        /// currently only continuous left or right is implemented
        if(this._isTouching === BASE_MENUITEM_L_TAG) {
          releaseKey = cc.KEY.a ;  // release left key
        } else if(this._isTouching === BASE_MENUITEM_R_TAG) {
         releaseKey = cc.KEY.d ;  // release right key
        }
        if(this._isTouching === BASE_MENUITEM_U_TAG) {
          releaseKey = cc.KEY.w;
        }
        if(this._isTouching === BASE_MENUITEM_D_TAG) {
          releaseKey = cc.KEY.s;
        }
                                                                     
        
        // release jump key
        if(this._isTouching === BASE_MENUITEM_A_TAG) {
          releaseKey = cc.KEY.k;
        }
/*
        // release jump key
        if(this._isTouching === BASE_MENUITEM_B_TAG) {
          releaseKey = cc.KEY.l;
        }
        */

        if(releaseKey !== -1) {
          console.log('release key :'+ releaseKey) ;
          this._target.setIdle(releaseKey);
        }

        this.releaseBtn(releaseKey) ;
        this._isTouching = -1;
      }
    }
    /*
    if(this._isTouching !== -1) {
      var releaseKey = -1;

      // currently only continuous left or right is implemented
      if(this._isTouching === BASE_MENUITEM_L_TAG) {
        releaseKey = cc.KEY.a ;  // release left key
      } else if(this._isTouching === BASE_MENUITEM_R_TAG) {
        releaseKey = cc.KEY.d ;  // release right key
      }

      // release jump key
      if(this._isTouching === BASE_MENUITEM_A_TAG) {
        releaseKey = cc.KEY.k;
      }

      // release jump key
      if(this._isTouching === BASE_MENUITEM_B_TAG) {
        releaseKey = cc.KEY.l;
      }

      if(releaseKey !== -1) {
        console.log('release key :'+ releaseKey) ;
        this._target.setIdle(releaseKey);
      }

      this.releaseBtn(releaseKey) ;
      this._isTouching = -1;
    }
    */
    return true;
  },

  _move: function(direction) {
    if(this._isTouching === -1)
      return ;
    //console.log(this._isTouching);
    switch(direction) {
      case BASE_MENUITEM_L_TAG:
        if(this._isTouching !== direction)
          this._selected(BASE_MENUITEM_L_TAG) ;
        this.doLeft() ;
        break;
      case BASE_MENUITEM_R_TAG:
        if(this._isTouching !== direction)
          this._selected(BASE_MENUITEM_R_TAG) ;
        this.doRight() ;
      break;
      case BASE_MENUITEM_U_TAG:
        if(this._isTouching !== direction)
          this._selected(BASE_MENUITEM_U_TAG);
        this.doUp();
      break;
      case BASE_MENUITEM_D_TAG:
        if(this._isTouching !== direction)
          this._selected(BASE_MENUITEM_D_TAG);
        this.doDown();
      break;
      
      case BASE_MENUITEM_A_TAG:
        if(this._isTouching !== direction)
          this._selected(BASE_MENUITEM_A_TAG) ;
        this.doJump() ;
      break;
      /*
      case BASE_MENUITEM_B_TAG:
        if(this._isTouching !== direction)
          this._selected(BASE_MENUITEM_B_TAG) ;
        this.doHit() ;
      break;
      */
    }
  },


  _selected: function(tag) {
    switch(tag) {
      case BASE_MENUITEM_L_TAG:
        if(!this.leftSelected.isVisible()){
          this.leftSelected.setVisible(true);
          this.leftNormal.setVisible(false);
        }
      break;
      case BASE_MENUITEM_R_TAG:
        if(!this.rightSelected.isVisible()) {
          this.rightSelected.setVisible(true);
          this.rightNormal.setVisible(false);
        }
      break;
      case BASE_MENUITEM_U_TAG:
        if(!this.leftSelected.isVisible()){  
          this.upSelected.setVisible(true);
          this.upNormal.setVisible(false);
        }
      break;
      case BASE_MENUITEM_D_TAG:
        if(!this.downSelected.isVisible()) { 
          this.downSelected.setVisible(true);
          this.downNormal.setVisible(false);
        }
      break;
      
      case BASE_MENUITEM_A_TAG:
        if(!this.jumpSelected.isVisible()) {
          this.jumpSelected.setVisible(true);
          this.jumpNormal.setVisible(false);
        }
        break ;
      /*
      case BASE_MENUITEM_B_TAG:
        if(!this.hitSelected.isVisible()) {
          this.hitSelected.setVisible(true);
          this.hitNormal.setVisible(false);
        }
        break ;
      */
    }
  },

  doLeft: function() {
    if(!this._target)
      return;
    //console.log("doLeft()");
    this._target.handleKey(cc.KEY.a);
  },
  doRight: function() {
    if(!this._target)
      return;
    //console.log("doRight()");
    this._target.handleKey(cc.KEY.d);
  },
  doUp: function() {
    if(!this._target)
      return;
    //console.log("doUp()");
    this._target.handleKey(cc.KEY.w);  
  },
  doDown: function() {
    if(!this._target)
      return;    
    //console.log("doDown()");          
    this._target.handleKey(cc.KEY.s);
  },
  doJump: function() {
    if(!this._target)
      return;
    console.log("doJump()");
    this._target.handleKey(cc.KEY.k);
    //this.audioEngine.playEffect(s_jumpMP3);
  },
  doHit: function() {
    //console.log("doHit()");
    //if(!this._target)
    //  return;
    //this._target.handleKey(cc.KEY.l);
    //this.audioEngine.playEffect(s_hitMP3);
  },

  onKeyDown:function(keycode) {
    this._target.handleKey(keycode);
    switch(keycode) {
      case cc.KEY.a: // 65: left
        this._selected(BASE_MENUITEM_L_TAG) ;
      break;
      case cc.KEY.d:  //68: right
        this._selected(BASE_MENUITEM_R_TAG) ;
      break;
      case cc.KEY.w: //up
        this._selected(BASE_MENUITEM_U_TAG) ;
      break;
      case cc.KEY.s: //down
        this._selected(BASE_MENUITEM_D_TAG);
      break;
      case cc.KEY.k: //75: up
        //this.audioEngine.playEffect(s_jumpMP3);
        this._selected(BASE_MENUITEM_A_TAG) ;
        this.btnA.selected();
      break;
      case cc.KEY.l: //76: attack
        //this.audioEngine.playEffect(s_hitMP3);
        //this._selected(BASE_MENUITEM_B_TAG) ;
        //this.btnB.selected();
      break;
    }
  },

  onKeyUp:function(keycode) {
    this._target.setIdle(keycode);
    this.releaseBtn(keycode) ;
  },
  
});