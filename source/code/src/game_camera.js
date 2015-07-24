// Camera that determines viewport
var GameCamera = cc.Sprite.extend({

	ctor:function (filename) {
		this._super(filename);
    	cc.log("GameCamera ctor()");
    	this.position = new cc.p(0,0);
    	this.targetPosition = new cc.p(0,0);
    	this.view = null;
    },
    
    setView:function (view){
	    if(view){
		    this.view = view;
	    }else{
		    cc.log("GameCamera setView() view is null");
	    }
    },
    
    setPosition:function (position){
	    if(position){
		    this.position.x = position.x;
		    this.position.y = position.y;
	    }else{
		    cc.log("GameCamera setPosition() position is null");
	    }
    },
    
    playerMoved:function (arguments){
	    var stageSize = cc.Director.getInstance().getWinSize();
	   	this.targetPosition = arguments.position;
	   	this.position = this.targetPosition;
	    this.setPosition(this.targetPosition);
	    //console.log("ddd");
	    //console.log("GameCamera playerMoved() , targetPosition.x , y = " + this.targetPosition.x + ", " + this.targetPosition.y);
	    this.view.setPosition(cc.pSub(cc.p(stageSize.width/2, stageSize.height/2), this.position));
	    //this.view.setPosition(cc.pSub(cc.p(stageSize.width/14, stageSize.height/10), this.position));
	    
    },
    
    update:function(){
	    var stageSize = cc.Director.getInstance().getWinSize();
	    this.targetPosition.x = this.targetPosition.x + 1;
	    this.position = this.targetPosition;
	    this.setPosition(this.position);
	    //console.log(this.position);
    }

});