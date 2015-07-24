
// stores input state information. Necessary because Cocos2D only gives you the last key that was pressed and held.
var GameInputHandler = cc.Class.extend({

	ctor:function () {
    	this.gameConfig = new GameConfig();
    	this.keysDown = new Array();
    	this.currentState = null;
    	this.lastState = null;
    	this.globalMediator = null;
    	this.keyboardArrows = {
            left : false,
            right : false,
            jump : false,
            hit : false
        }
    },

    sendInputChangedEvent:function(){
    	if(this.currentState != this.lastState){
	    	// broadcast input changed message globally
	    	var args = new Object();
	  		args.currentState = this.currentState;
	  		args.keysDown = this.keysDown;
	  		var event = new GameEvent(this.gameConfig.globals.MSG_INPUT_CHANGED, this, args);
	  		//this.globalMediator.send(event);
	  		this.lastState = this.currentState;
	  	}
    },

    setGlobalMediator:function(mediator){
	    if(mediator){
		    this.globalMediator = mediator;
	    }
    },

    keyDown:function(e){
	    switch(e)
	    {
	   		case cc.KEY.left:
	   		case cc.KEY.a:
	   		  this.addKeyDown("left");
	   		  this.keyboardArrows.left = true;
	   		break;
	   		case cc.KEY.right:
	   		case cc.KEY.d:
	   		  this.addKeyDown("right");
	   		  this.keyboardArrows.right = true;
	   		break;
	   		case cc.KEY.k:
	   		  this.addKeyDown("jump");
	   		  this.keyboardArrows.jump = true;
	   		break;
	   		case cc.KEY.l:
	   		  this.addKeyDown("hit");
	   		  this.keyboardArrows.hit = true;
	   		break;

	   		default:
	   		break;
	   	}
    },

    keyUp:function(e){
	    switch(e)
	    {
	   		case cc.KEY.left:
	   		case cc.KEY.a:
	   		  this.removeKeyDown("left");
	   		  this.keyboardArrows.left = false;
	   		break;
	   		case cc.KEY.right:
	   		case cc.KEY.d:
	   		  this.removeKeyDown("right");
	   		  this.keyboardArrows.right = false;
	   		break;
	   		case cc.KEY.k:
	   		  this.removeKeyDown("jump");
	   		  this.keyboardArrows.jump = false;
	   		break;
	   		case cc.KEY.l:
	   		  this.removeKeyDown("hit");
	   		  this.keyboardArrows.hit = false;
	   		break;

	   		default:
	   		break;
	   	}

    },

    removeKeyDown:function(keyUp){
	    // if it is already in the array, remove it.
	    // if it is the current state, change that too
	    for(var i = 0; i < this.keysDown.length; i++){
		    if(keyUp == this.keysDown[i]){
		    	this.keysDown.splice(i, 1);
		    	// if key up was the currentState, make the current state the last key down, or if there is no input make it null
		    	if(this.keysDown.length > 0){
		    		if(keyUp == this.currentState){
		    			this.currentState = this.keysDown[this.keysDown.length-1];
		    		}
		    	}else{
			    	this.currentState = null;
		    	}
		    }
	    }
    	this.sendInputChangedEvent();
    },

    addKeyDown:function(keyDown){
	    // if the input is already in the array, remove it and push it to top so we keep in order.
	    // this should take care of Cocos2D repeatedly reporting keyDown events when a key is held.
	    for(var i = 0; i < this.keysDown.length; i++){
		    if(keyDown == this.keysDown[i]){
		    	this.keysDown.splice(i, 1);
		    	this.keysDown.push(keyDown);
			    this.currentState = keyDown;
			    this.sendInputChangedEvent();
			    return;
		    }
	    }
	    // key not in current array
	    this.keysDown.push(keyDown);
	    this.currentState = keyDown;
	    this.sendInputChangedEvent();
    },

    logKeysDown:function(){
	    for(var i = 0; i < this.keysDown.length; i++){
		    cc.log("GameInputHandler logKeysDown() keysDown[" + i + "] = " + this.keysDown[i] );

	    }
	    cc.log("GameInputHandler logKeysDown() currentState = " + this.currentState );
    }

});
