//game init 
var GameInitLayer = cc.Layer.extend({
  isMouseDown:false,

  init:function () {
    cc.log("GameInitLayer.init()");
    var selfPointer = this;
    //////////////////////////////
    // 1. super init first
    this._super();
    // ask director the window size
    var size = cc.Director.getInstance().getWinSize();
    // Add a lazy background layer. It will be in a seperate canvas element behind the main game.
    // Do not set the Z order to greater than 0, as it will try to eat the input events of things behind it
    // To add anthing to the main game layer, just add it to "this"
    //var lazyLayer = new cc.LazyLayer();
    //this.addChild(lazyLayer);
    // This layer will get touch events
    //this.setTouchEnabled(true);
    //var testSprite = cc.Sprite.create("res/images/test-tilesheet.png");
    //testSprite.setPosition(cc.p(size.width / 2, size.height / 2));
    //this.addChild(testSprite, 1);
    //var actionTo = cc.MoveTo.create(2, cc.p(0, 0));
    //testSprite.runAction(actionTo);
    // Changes the canvas element size to fit the screen
    //this.adjustSizeForWindow();
    // lazyLayer.adjustSizeForCanvas();
    // Any time we resize the screen, the game will change to match the screen
    window.addEventListener("resize", function (event) {
      selfPointer.adjustSizeForWindow();
    }); 
        
    return true;
  },
  
    
  //	Keeps the aspect ratio of the game, stretching it bigger than it is.
  //	Need to make this also shrink the game down to size.
  adjustSizeForWindow:function () {
    /*
        var margin = document.documentElement.clientWidth - document.body.clientWidth;
        if (document.documentElement.clientWidth < cc.originalCanvasSize.width) {
            cc.canvas.width = cc.originalCanvasSize.width;
        } else {
            cc.canvas.width = document.documentElement.clientWidth - margin;
        }
        if (document.documentElement.clientHeight < cc.originalCanvasSize.height) {
            cc.canvas.height = cc.originalCanvasSize.height;
        } else {
            cc.canvas.height = document.documentElement.clientHeight - margin;
        }

        var xScale = cc.canvas.width / cc.originalCanvasSize.width;
        var yScale = cc.canvas.height / cc.originalCanvasSize.height;
        if (xScale > yScale) {
            xScale = yScale;
        }
        cc.canvas.width = cc.originalCanvasSize.width * xScale;
        cc.canvas.height = cc.originalCanvasSize.height * xScale;
        var parentDiv = document.getElementById("Cocos2dGameContainer");
        if (parentDiv) {
            parentDiv.style.width = cc.canvas.width + "px";
            parentDiv.style.height = cc.canvas.height + "px";
        }
        cc.renderContext.translate(0, cc.canvas.height);
        cc.renderContext.scale(xScale, xScale);
        cc.Director.getInstance().setContentScaleFactor(xScale);
	*/
  },
  // Handle touch and mouse events
  onTouchesBegan:function (touches, event) {
    this.isMouseDown = true;
  },
  onTouchesMoved:function (touches, event) {
    if (this.isMouseDown) {
      if (touches) {
        //          
      }
    }
  },
  onTouchesEnded:function (touches, event) {
    this.isMouseDown = false;
  },
  onTouchesCancelled:function (touches, event) {
    console.log("onTouchesCancelled");
  }
});

// This is called in main.js to load the main game menu
var GameInitScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new GameInitLayer();
    layer.init();
    this.addChild(layer,0);
    var director = cc.Director.getInstance();
    director.replaceScene(new GameMenuScene);
  }
});
