/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


var actionsTestIdx = -1;

var SPRITE_GROSSINI_TAG = 1;
var SPRITE_TAMARA_TAG = 2;
var SPRITE_KATHIA_TAG = 3;

// the class inherit from TestScene
// every Scene each test used must inherit from TestScene,
// make sure the test have the menu item for back to main menu
var ActionsTestScene = TestScene.extend({
    runThisTest:function () {
        actionsTestIdx = -1;
        this.addChild(nextActionsTest());
        director.replaceScene(this);
    }
});

var ActionsDemo = BaseTestLayer.extend({
    _grossini:null,
    _tamara:null,
    _kathia:null,
    _code:null,

    ctor:function () {
        this._super(cc.c4b(0,0,0,255), cc.c4b(98,99,117,255) );

        this._grossini = cc.Sprite.create(s_pathGrossini);
        this._tamara = cc.Sprite.create(s_pathSister1);
        this._kathia = cc.Sprite.create(s_pathSister2);
        this.addChild(this._grossini, SPRITE_GROSSINI_TAG);
        this.addChild(this._tamara, SPRITE_TAMARA_TAG);
        this.addChild(this._kathia, SPRITE_KATHIA_TAG);
        var s = director.getWinSize();
        this._grossini.setPosition(s.width / 2, s.height / 3);
        this._tamara.setPosition(s.width / 2, 2 * s.height / 3);
        this._kathia.setPosition(s.width / 2, s.height / 2);

    },

    centerSprites:function (numberOfSprites) {
        var winSize = director.getWinSize();

        if (numberOfSprites === 0) {
            this._tamara.setVisible(false);
            this._kathia.setVisible(false);
            this._grossini.setVisible(false);
        } else if (numberOfSprites == 1) {
            this._tamara.setVisible(false);
            this._kathia.setVisible(false);
            this._grossini.setPosition(winSize.width / 2, winSize.height / 2);
        }
        else if (numberOfSprites == 2) {
            this._kathia.setPosition(winSize.width / 3, winSize.height / 2);
            this._tamara.setPosition(2 * winSize.width / 3, winSize.height / 2);
            this._grossini.setVisible(false);
        }
        else if (numberOfSprites == 3) {
            this._grossini.setPosition(winSize.width / 2, winSize.height / 2);
            this._tamara.setPosition(winSize.width / 4, winSize.height / 2);
            this._kathia.setPosition(3 * winSize.width / 4, winSize.height / 2);
        }
    },
    alignSpritesLeft:function (numberOfSprites) {
        var s = director.getWinSize();

        if (numberOfSprites == 1) {
            this._tamara.setVisible(false);
            this._kathia.setVisible(false);
            this._grossini.setPosition(60, s.height / 2);
        }
        else if (numberOfSprites == 2) {
            this._kathia.setPosition(60, s.height / 3);
            this._tamara.setPosition(60, 2 * s.height / 3);
            this._grossini.setVisible(false);
        }
        else if (numberOfSprites == 3) {
            this._grossini.setPosition(60, s.height / 2);
            this._tamara.setPosition(60, 2 * s.height / 3);
            this._kathia.setPosition(60, s.height / 3);
        }
    },
    title:function () {
        return "ActionsTest";
    },
    subtitle:function () {
        return "";
    },
    onBackCallback:function (sender) {
        var s = new ActionsTestScene();
        s.addChild(previousActionsTest());
        director.replaceScene(s);
    },
    onRestartCallback:function (sender) {
        var s = new ActionsTestScene();
        s.addChild(restartActionsTest());
        director.replaceScene(s);
    },
    onNextCallback:function (sender) {
        var s = new ActionsTestScene();
        s.addChild(nextActionsTest());
        director.replaceScene(s);
    },
    numberOfPendingTests:function() {
        return ( (arrayOfActionsTest.length-1) - actionsTestIdx );
    },

    getTestNumber:function() {
        return actionsTestIdx;
    }
});

//------------------------------------------------------------------
//
// ActionManual
//
//------------------------------------------------------------------
var ActionManual = ActionsDemo.extend({
    _code:"sprite.setPosition( 10,20 );\n" +
        "sprite.setRotation( 90 );\n" +
        "sprite.setScale( 2 );",

    onEnter:function () {
        this._super();

        this._tamara.setScaleX(2.5);
        //window.tam = this._tamara;
        this._tamara.setScaleY(-1.0);
        this._tamara.setPosition(100, 70);
        this._tamara.setOpacity(128);

        this._grossini.setRotation(120);
        this._grossini.setPosition(winSize.width / 2, winSize.height / 2);
        this._grossini.setColor(cc.c3b(255, 0, 0));

        this._kathia.setPosition(winSize.width - 100, winSize.height / 2);
        this._kathia.setColor(cc.c3b(0, 0, 255));
    },

    title:function () {
        return "Sprite properties";
    },
    subtitle:function () {
        return "Manual Transformation";
    },

    //
    // Automation
    //
    testDuration:0.1,
    getExpectedResult:function() {
        var ret = [2.5,{"x":100,"y":70},128,120,{"x":winSize.width/2,"y":winSize.height/2},{"r":255,"g":0,"b":0},{"x":winSize.width - 100,"y":winSize.height / 2},{"r":0,"g":0,"b":255}];
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = [];
        ret.push( this._tamara.getScaleX() );
        ret.push( this._tamara.getPosition() );
        ret.push( this._tamara.getOpacity() );

        ret.push( this._grossini.getRotation() );
        ret.push( this._grossini.getPosition() );
        ret.push( this._grossini.getColor() );

        ret.push( this._kathia.getPosition() );
        ret.push( this._kathia.getColor() );

        return JSON.stringify(ret);
    }
});


//------------------------------------------------------------------
//
//	ActionMove
//
//------------------------------------------------------------------
var ActionMove = ActionsDemo.extend({

    _code:"a = cc.MoveBy.create( time, cc.p(x,y) );\n" +
        "a = cc.MoveTo.create( time, cc.p(x,y) );",

    onEnter:function () {
        this._super();

        this.centerSprites(3);
        var s = director.getWinSize();

        var actionTo = cc.MoveTo.create(2, cc.p(s.width - 40, s.height - 40));

        var actionBy = cc.MoveBy.create(1, cc.p(80, 80));
        var actionByBack = actionBy.reverse();

        this._tamara.runAction(actionTo);
        this._grossini.runAction(cc.Sequence.create(actionBy, actionByBack));
        this._kathia.runAction(cc.MoveTo.create(1, cc.p(40, 40)));
    },
    title:function () {
        return "cc.MoveTo / cc.MoveBy";
    },

    //
    // Automation
    //
    testDuration:2.1,
    getExpectedResult:function() {
        var ret = [{"x":winSize.width-40,"y":winSize.height-40},{"x":winSize.width/2,"y":winSize.height/2},{"x":40,"y":40}];
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = [];
        ret.push( this._tamara.getPosition() );
        ret.push( this._grossini.getPosition() );
        ret.push( this._kathia.getPosition() );

        return JSON.stringify(ret);
    }

});

//------------------------------------------------------------------
//
// ActionScale
//
//------------------------------------------------------------------
var ActionScale = ActionsDemo.extend({

    _code:"a = cc.ScaleBy.create( time, scale );\n" +
        "a = cc.ScaleTo.create( time, scaleX, scaleY );",

    onEnter:function () {
        this._super();

        this.centerSprites(3);

        var actionTo = cc.ScaleTo.create(2, 0.5);
        var actionBy = cc.ScaleBy.create(2, 2);
        var actionBy2 = cc.ScaleBy.create(2, 0.25, 4.5);

        this._tamara.runAction(actionTo);
        this._kathia.runAction(cc.Sequence.create(actionBy2, cc.DelayTime.create(0.25), actionBy2.reverse()));
        this._grossini.runAction(cc.Sequence.create(actionBy, cc.DelayTime.create(0.25), actionBy.reverse()));

    },
    title:function () {
        return "cc.ScaleTo / cc.ScaleBy";
    },

    //
    // Automation
    //
    testDuration:2.1,
    getExpectedResult:function() {
        var ret = [0.5,2,0.25,4.5];
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = [];
        ret.push( this._tamara.getScale() );
        ret.push( this._grossini.getScale() );
        ret.push( this._kathia.getScaleX() );
        ret.push( this._kathia.getScaleY() );

        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
//  ActionRotate
//
//------------------------------------------------------------------
var ActionRotate = ActionsDemo.extend({

    _code:"a = cc.RotateBy.create( time, degrees );\n" +
            "a = cc.RotateTo.create( time, degrees );",

    onEnter:function () {
        this._super();
        this.centerSprites(3);
        var actionTo = cc.RotateTo.create(2, 45);
        var actionTo2 = cc.RotateTo.create(2, -45);
        var actionTo0 = cc.RotateTo.create(2, 0);
        this._tamara.runAction(cc.Sequence.create(actionTo, cc.DelayTime.create(0.25), actionTo0));

        var actionBy = cc.RotateBy.create(2, 360);
        var actionByBack = actionBy.reverse();
        this._grossini.runAction(cc.Sequence.create(actionBy, cc.DelayTime.create(0.25), actionByBack));

        this._kathia.runAction(cc.Sequence.create(actionTo2, cc.DelayTime.create(0.25), actionTo0.clone()));

    },
    title:function () {
        return "cc.RotateTo / cc.RotateBy";
    },
    //
    // Automation
    //
    testDuration:2.1,
    getExpectedResult:function() {
        var ret = [45,360,-45];
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = [];
        ret.push( this._tamara.getRotation() );
        ret.push( this._grossini.getRotation() );
        ret.push( this._kathia.getRotation() );

        return JSON.stringify(ret);
    }

});

//------------------------------------------------------------------
//
//  ActionRotateXY
//
//------------------------------------------------------------------
var ActionRotateXY = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(3);
        var actionTo = cc.RotateTo.create(2, 37.2, -37.2);
        var actionToBack = cc.RotateTo.create(2, 0, 0);
        var actionBy = cc.RotateBy.create(2, 0, -90);
        var actionBy2 = cc.RotateBy.create(2, 45.0, 45.0);

        var delay = cc.DelayTime.create(0.25);

        this._tamara.runAction(cc.Sequence.create(actionTo, delay, actionToBack));
        this._grossini.runAction(cc.Sequence.create(actionBy, delay.clone(), actionBy.reverse()));

        this._kathia.runAction(cc.Sequence.create(actionBy2, delay.clone(), actionBy2.reverse()));

        if (sys.platform === 'browser' && !("opengl" in sys.capabilities)) {
            var label = cc.LabelTTF.create("Not support Actions on HTML5-canvas", "Times New Roman", 30);
            label.setPosition(winSize.width / 2, winSize.height / 2 + 50);
            this.addChild(label, 100);
        }
    },
    title:function () {
        return "cc.RotateBy(x,y) / cc.RotateTo(x,y)";
    },
    //
    // Automation
    //
    testDuration:2.1,
    getExpectedResult:function() {
        var ret = ["37.20","-37.20",0,-90,45,45];
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = [];
        ret.push( this._tamara.getRotationX().toFixed(2) );
        ret.push( this._tamara.getRotationY().toFixed(2) );

        ret.push( this._grossini.getRotationX() );
        ret.push( this._grossini.getRotationY() );

        ret.push( this._kathia.getRotationX() );
        ret.push( this._kathia.getRotationY() );

        return JSON.stringify(ret);
    }

});
//------------------------------------------------------------------
//
//	ActionSkew
//
//------------------------------------------------------------------
var ActionSkew = ActionsDemo.extend({

    _code:"a = cc.SkewBy.create( time, skew );\n" +
        "a = cc.SkewTo.create( time, skewX, skewY );",

    onEnter:function () {
        this._super();
        this.centerSprites(3);
        var actionTo = cc.SkewTo.create(2, 37.2, -37.2);
        var actionToBack = cc.SkewTo.create(2, 0, 0);
        var actionBy = cc.SkewBy.create(2, 0, -90);
        var actionBy2 = cc.SkewBy.create(2, 45.0, 45.0);

        var delay = cc.DelayTime.create(0.25);

        this._tamara.runAction(cc.Sequence.create(actionTo, delay, actionToBack));
        this._grossini.runAction(cc.Sequence.create(actionBy, delay.clone(), actionBy.reverse()));

        this._kathia.runAction(cc.Sequence.create(actionBy2, delay.clone(), actionBy2.reverse()));
    },
    title:function () {
        return "cc.SkewTo / cc.SkewBy";
    },
    //
    // Automation
    //
    testDuration:2.1,
    getExpectedResult:function() {
        var ret = ["37.20","-37.20",0,0,45,45];
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = [];
        ret.push( this._tamara.getSkewX().toFixed(2) );
        ret.push( this._tamara.getSkewY().toFixed(2) );

        ret.push( this._grossini.getSkewX() );
        ret.push( this._grossini.getSkewX() );

        ret.push( this._kathia.getSkewX() );
        ret.push( this._kathia.getSkewY() );

        return JSON.stringify(ret);
    }
});

var ActionSkewRotateScale = ActionsDemo.extend({
    onEnter:function () {
        this._super();

        this.centerSprites(0);

        var boxSize = cc.size(100.0, 100.0);
        var box = cc.LayerColor.create(cc.c4b(255, 255, 0, 255));
        box.setAnchorPoint(0, 0);
        box.setPosition((winSize.width - boxSize.width) / 2, (winSize.height - boxSize.height) / 2);
        box.setContentSize(boxSize);

        var markrside = 10.0;
        var uL = cc.LayerColor.create(cc.c4b(255, 0, 0, 255));
        box.addChild(uL);
        uL.setContentSize(markrside, markrside);
        uL.setPosition(0, boxSize.height - markrside);
        uL.setAnchorPoint(0, 0);

        var uR = cc.LayerColor.create(cc.c4b(0, 0, 255, 255));
        box.addChild(uR);
        uR.setContentSize(markrside, markrside);
        uR.setPosition(boxSize.width - markrside, boxSize.height - markrside);
        uR.setAnchorPoint(0, 0);


        this.addChild(box);
        var actionTo = cc.SkewTo.create(2, 0, 2);
        var rotateTo = cc.RotateTo.create(2, 61.0);
        var actionScaleTo = cc.ScaleTo.create(2, -0.44, 0.47);

        var actionScaleToBack = cc.ScaleTo.create(2, 1.0, 1.0);
        var rotateToBack = cc.RotateTo.create(2, 0);
        var actionToBack = cc.SkewTo.create(2, 0, 0);

        var delay = cc.DelayTime.create(0.25);

        box.runAction(cc.Sequence.create(actionTo, delay, actionToBack));
        box.runAction(cc.Sequence.create(rotateTo, delay.clone(), rotateToBack));
        box.runAction(cc.Sequence.create(actionScaleTo, delay.clone(), actionScaleToBack));

        this.box = box;
    },
    title:function () {
        return "Skew + Rotate + Scale";
    },
    //
    // Automation
    //
    testDuration:2.1,
    getExpectedResult:function() {
        var ret = [0,2,61,"-0.44","0.47"];
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = [];
        ret.push( this.box.getSkewX() );
        ret.push( this.box.getSkewY() );
        ret.push( this.box.getRotation() );
        ret.push( this.box.getScaleX().toFixed(2) );
        ret.push( this.box.getScaleY().toFixed(2) );

        return JSON.stringify(ret);
    }

});

//------------------------------------------------------------------
//
// ActionJump
//
//------------------------------------------------------------------
var ActionJump = ActionsDemo.extend({
    _code:"a = cc.JumpBy.create( time, point, height, #_of_jumps );\n" +
        "a = cc.JumpTo.create( time, point, height, #_of_jumps );",

    onEnter:function () {
        this._super();
        this.centerSprites(3);

        var actionTo = cc.JumpTo.create(2, cc.p(300, 300), 50, 4);
        var actionBy = cc.JumpBy.create(2, cc.p(300, 0), 50, 4);
        var actionUp = cc.JumpBy.create(2, cc.p(0, 0), 80, 4);
        var actionByBack = actionBy.reverse();

        var delay = cc.DelayTime.create(0.25);

        this._tamara.runAction(actionTo);
        this._grossini.runAction(cc.Sequence.create(actionBy, delay, actionByBack));
        this._kathia.runAction(cc.RepeatForever.create(
            cc.Sequence.create(actionUp, delay.clone() )
                ) );

    },
    title:function () {
        return "cc.JumpTo / cc.JumpBy";
    },
    subtitle:function () {
        return "Actions will stop for 0.25s after 2 seconds";
    },

    //
    // Automation
    //
    testDuration:2.1,
    getExpectedResult:function() {
        var ret = [{"x":300,"y":300},
                    {"x":winSize.width/2+300,"y":winSize.height/2},
                    {"x":3*winSize.width/4,"y":winSize.height/2}];
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = [];
        ret.push( this._tamara.getPosition() );
        ret.push( this._grossini.getPosition() );
        ret.push( this._kathia.getPosition() );

        return JSON.stringify(ret);
    }

});
//------------------------------------------------------------------
//
// ActionBezier
//
//------------------------------------------------------------------
var ActionBezier = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        var s = director.getWinSize();

        //
        // startPosition can be any coordinate, but since the movement
        // is relative to the Bezier curve, make it (0,0)
        //

        this.centerSprites(3);

        // sprite 1

        var delay = cc.DelayTime.create(0.25);

        // 3 and only 3 control points should be used for Bezier actions.
        var controlPoints = [ cc.p(0, 374),
                                cc.p(300, -374),
                                cc.p(300, 100) ];

        var bezierForward = cc.BezierBy.create(2, controlPoints);
        var rep = cc.RepeatForever.create(
            cc.Sequence.create(
                bezierForward, delay, bezierForward.reverse(), delay.clone()
            ));

        // sprite 2
        this._tamara.setPosition(80, 160);

        // 3 and only 3 control points should be used for Bezier actions.
        var controlPoints2 = [ cc.p(100, s.height / 2),
            cc.p(200, -s.height / 2),
            cc.p(240, 160) ];
        var bezierTo1 = cc.BezierTo.create(2, controlPoints2);

        // // sprite 3
        var controlPoints3 = controlPoints2.slice();
        this._kathia.setPosition(400, 160);
        var bezierTo2 = cc.BezierTo.create(2, controlPoints3);

        this._grossini.runAction(rep);
        this._tamara.runAction(bezierTo1);
        this._kathia.runAction(bezierTo2);
    },
    title:function () {
        return "cc.BezierBy / cc.BezierTo";
    },
    //
    // Automation
    //
    testDuration:2.1,
    setupAutomation:function() {
        this.scheduleOnce(this.checkControl1, 0.66667);
        this.scheduleOnce(this.checkControl2, 1.33333);
    },
    checkControl1:function(dt) {
        this.control1 = this._grossini.getPosition();
    },
    verifyControl1:function(dt) {
        var x = Math.abs( this.control1.x - 77 - winSize.width/2 );
        var y = Math.abs( this.control1.y - 87 - winSize.height/2 );
        //  -/+ 5 pixels of error
        return ( x < 5 && y < 5);
    },
    checkControl2:function(dt) {
        this.control2 = this._grossini.getPosition();
    },
    verifyControl2:function(dt) {
        var x = Math.abs( this.control2.x - 222 - winSize.width/2 );
        var y = Math.abs( this.control2.y + 53 - winSize.height/2 );
        //  -/+ 5 pixels of error
        return ( x < 5 && y < 5);
    },

    getExpectedResult:function() {
        var ret = [ true,
                    true,
                    {"x":winSize.width/2+300,"y":winSize.height/2+100}];
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = [];
        ret.push( this.verifyControl1() );
        ret.push( this.verifyControl2() );
        ret.push( this._grossini.getPosition() );

        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// ActionBezierToCopy
//
//------------------------------------------------------------------
var ActionBezierToCopy = ActionsDemo.extend({
    onEnter:function () {
        this._super();

        //
        // startPosition can be any coordinate, but since the movement
        // is relative to the Bezier curve, make it (0,0)
        //

        this.centerSprites(2);

        // sprite 1
        this._tamara.setPosition(80, 160);

        // 3 and only 3 control points should be used for Bezier actions.
        var controlPoints2 = [ cc.p(100, winSize.height / 2),
                                cc.p(200, -winSize.height / 2),
                                cc.p(240, 160) ];
        var bezierTo1 = cc.BezierTo.create(2, controlPoints2);

        // sprite 2
        this._kathia.setPosition(80, 160);
        var bezierTo2 = bezierTo1.clone();

        this._tamara.runAction(bezierTo1);
        this._kathia.runAction(bezierTo2);

    },
    title:function () {
        return "cc.BezierTo copy test";
    },
    subtitle:function() {
        return "Both sprites should move across the same path";
    }
});
//------------------------------------------------------------------
//
// Issue1008
//
//------------------------------------------------------------------
var Issue1008 = ActionsDemo.extend({
    onEnter:function () {
        this._super();

        this.centerSprites(1);

        // sprite 1

        this._grossini.setPosition(428, 279);

        // 3 and only 3 control points should be used for Bezier actions.
        var controlPoints1 = [ cc.p(428, 279), cc.p(100, 100), cc.p(100, 100)];
        var controlPoints2 = [ cc.p(100, 100), cc.p(428, 279), cc.p(428, 279)];

        var bz1 = cc.BezierTo.create(1.5, controlPoints1);
        var bz2 = cc.BezierTo.create(1.5, controlPoints2);
        var trace = cc.CallFunc.create(this.onTrace, this);
        var delay = cc.DelayTime.create(0.25);

        var rep = cc.RepeatForever.create(cc.Sequence.create(bz1, bz2, trace,delay));

        this._grossini.runAction(rep);
        //this._grossini.runAction(cc.Sequence.create(bz1, bz2, trace,delay));

    },
    onTrace:function (sender) {
        var pos = sender.getPosition();
        cc.log("Position x: " + pos.x + ' y:' + pos.y);
        if (Math.round(pos.x) != 428 || Math.round(pos.y) != 279)
            this.log("Error: Issue 1008 is still open");

        this.tracePos = pos;
    },
    title:function () {
        return "Issue 1008";
    },
    subtitle:function () {
        return "cc.BezierTo + Repeat. See console";
    },
    //
    // Automation
    //
    testDuration:3.1,
    getExpectedResult:function() {
        var ret = {"x":428,"y":279};
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        return JSON.stringify(this.tracePos);
    }
});
//------------------------------------------------------------------
//
// ActionBlink
//
//------------------------------------------------------------------
var ActionBlink = ActionsDemo.extend({
    _code:"a = cc.Blink.create( time, #_of_blinks );",

    onEnter:function () {
        this._super();
        this.centerSprites(2);

        var action1 = cc.Blink.create(2, 10);
        var action2 = cc.Blink.create(2, 5);

        this._tamara.runAction(action1);
        this._kathia.runAction(action2);
    },
    title:function () {
        return "cc.Blink";
    },
    //
    // Automation
    //
    testDuration:2.1,
    setupAutomation:function() {
        this.scheduleOnce(this.checkControl1,0.1);
    },
    checkControl1:function(dt){
        this.control1 = this._kathia.isVisible();
    },
    getExpectedResult:function() {
        var ret = [false,true,true];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        ret.push( this.control1 );
        ret.push( this._tamara.isVisible());
        ret.push( this._kathia.isVisible());
        return JSON.stringify(ret);
    }
});
//------------------------------------------------------------------
//
// ActionFade
//
//------------------------------------------------------------------
var ActionFade = ActionsDemo.extend({
    _code:"a = cc.FadeIn.create( time );\n" +
        "a = cc.FadeOut.create( time );",

    onEnter:function () {
        this._super();
        this.centerSprites(2);
        var delay = cc.DelayTime.create(0.25);
        this._tamara.setOpacity(0);
        var action1 = cc.FadeIn.create(1.0);
        var action1Back = action1.reverse();

        var action2 = cc.FadeOut.create(1.0);
        var action2Back = action2.reverse();

        this._tamara.runAction(cc.Sequence.create(action1, delay, action1Back));
        this._kathia.runAction(cc.Sequence.create(action2, delay.clone(), action2Back));


    },
    title:function () {
        return "cc.FadeIn / cc.FadeOut";
    },
    //
    // Automation
    //
    testDuration:1.1,
    getExpectedResult:function() {
        var ret = [255,0];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        ret.push( this._tamara.getOpacity() );
        ret.push( this._kathia.getOpacity());
        return JSON.stringify(ret);
    }

});
//------------------------------------------------------------------
//
// ActionTint
//
//------------------------------------------------------------------
var ActionTint = ActionsDemo.extend({

    _code:"a = cc.TintBy.create( time, red, green, blue );\n" +
        "a = cc.TintTo.create( time, red, green, blue );",

    onEnter:function () {
        this._super();
        this.centerSprites(2);

        var action1 = cc.TintTo.create(2, 255, 0, 255);
        var action2 = cc.TintBy.create(2, -127, -255, -127);
        var action2Back = action2.reverse();

        this._tamara.runAction(action1);
        this._kathia.runAction(cc.Sequence.create(action2, cc.DelayTime.create(0.25), action2Back));

    },
    title:function () {
        return "cc.TintTo / cc.TintBy";
    },
    //
    // Automation
    //
    testDuration:2.1,
    getExpectedResult:function() {
        var ret = [{"r":255,"g":0,"b":255},{"r":128,"g":0,"b":128}];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        ret.push( this._tamara.getColor() );
        ret.push( this._kathia.getColor());
        return JSON.stringify(ret);
    }

});

//------------------------------------------------------------------
//
// ActionAnimate
//
//------------------------------------------------------------------
var ActionAnimate = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(3);

        //
        // Manual animation
        //
        var animation = cc.Animation.create();
        for (var i = 1; i < 15; i++) {
            var frameName = "res/Images/grossini_dance_" + ((i < 10) ? ("0" + i) : i) + ".png";
            animation.addSpriteFrameWithFile(frameName);
        }
        animation.setDelayPerUnit(2.8 / 14);
        animation.setRestoreOriginalFrame(true);

        var action = cc.Animate.create(animation);
        this._grossini.runAction(cc.Sequence.create(action, action.reverse()));

        //
        // File animation
        //
        // With 2 loops and reverse
        var animCache = cc.AnimationCache.getInstance();

        animCache.addAnimations(s_animations2Plist);
        var animation2 = animCache.getAnimation("dance_1");

        var action2 = cc.Animate.create(animation2);
        this._tamara.runAction(cc.Sequence.create(action2, action2.reverse()));

        //
        // File animation
        //
        // with 4 loops
        var animation3 = animation2.clone();
        animation3.setLoops(4);

        var action3 = cc.Animate.create(animation3);
        this._kathia.runAction(action3);
    },

    title:function () {
        return "Animation";
    },

    subtitle:function () {
        return "Center: Manual animation. Border: using file format animation";
    }
});
//------------------------------------------------------------------
//
//	ActionSequence
//
//------------------------------------------------------------------
var ActionSequence = ActionsDemo.extend({

    _code:"a = cc.Sequence.create( a1, a2, a3,..., aN);",

    onEnter:function () {
        this._super();
        this.alignSpritesLeft(1);

        var action = cc.Sequence.create(
            cc.MoveBy.create(1.5, cc.p(240, 0)),
            cc.RotateBy.create(1.5, 540)
        );

        this._grossini.runAction(action);

    },
    title:function () {
        return "cc.Sequence: Move + Rotate";
    },
    //
    // Automation
    //
    testDuration:3.1,
    getExpectedResult:function() {
        var ret = [{"x":60+240,"y":winSize.height/2},540];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        ret.push( this._grossini.getPosition() );
        ret.push( this._grossini.getRotation() );
        return JSON.stringify(ret);
    }
});
//------------------------------------------------------------------
//
//	ActionSequence2
//
//------------------------------------------------------------------
var ActionSequence2 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(1);
        this._grossini.setVisible(false);
        var action = cc.Sequence.create(
            cc.Place.create(cc.p(200, 200)),
            cc.Show.create(),
            cc.MoveBy.create(1, cc.p(100, 0)),
            cc.CallFunc.create(this.onCallback1, this),
            cc.CallFunc.create(this.onCallback2.bind(this)),
            cc.CallFunc.create(this.onCallback3, this));
        this._grossini.runAction(action);

        this.called1 = this.called2 = this.called3 = false;

    },
    onCallback1:function () {
        var s = director.getWinSize();
        var label = cc.LabelTTF.create("callback 1 called", "Marker Felt", 16);
        label.setPosition(s.width / 4 * 1, s.height / 2);

        this.addChild(label);
        this.called1 = true;
    },
    onCallback2:function () {
        var s = director.getWinSize();
        var label = cc.LabelTTF.create("callback 2 called", "Marker Felt", 16);
        label.setPosition(s.width / 4 * 2, s.height / 2);

        this.addChild(label);
        this.called2 = true;
    },
    onCallback3:function () {
        var s = director.getWinSize();
        var label = cc.LabelTTF.create("callback 3 called", "Marker Felt", 16);
        label.setPosition(s.width / 4 * 3, s.height / 2);

        this.addChild(label);
        this.called3 = true;
    },
    title:function () {
        return "Sequence of InstantActions";
    },
    //
    // Automation
    //
    testDuration:1.1,
    getExpectedResult:function() {
        var ret = [true,true,true,true,{"x":300,"y":200}];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        ret.push( this.called1 );
        ret.push( this.called2 );
        ret.push( this.called3 );
        ret.push( this._grossini.isVisible() );
        ret.push( this._grossini.getPosition() );
        return JSON.stringify(ret);
    }
});
//------------------------------------------------------------------
//
//	ActionCallFunc1
//
//------------------------------------------------------------------
var ActionCallFunc1 = ActionsDemo.extend({
    _code:"a = cc.CallFunc.create( this.callback );\n" +
        "a = cc.CallFunc.create( this.callback, this, optional_arg );",

    onEnter:function () {
        this._super();
        this.centerSprites(3);

        // Testing different ways to pass "this"
        var action = cc.Sequence.create(
            cc.MoveBy.create(2, cc.p(200, 0)),
            cc.CallFunc.create(this.onCallback1.bind(this))  // 'this' is bound to the callback function using "bind"
        );

        var action2 = cc.Sequence.create(
            cc.ScaleBy.create(2, 2),
            cc.FadeOut.create(2),
            cc.CallFunc.create(this.onCallback2, this)      // 'this' is passed as 2nd argument.
        );

        var action3 = cc.Sequence.create(
            cc.RotateBy.create(3, 360),
            cc.FadeOut.create(2),
            cc.CallFunc.create(this.onCallback3, this, "Hi!")  // If you want to pass a optional value, like "Hi!", then you should pass 'this' too
        );

        this._grossini.runAction(action);
        this._tamara.runAction(action2);
        this._kathia.runAction(action3);

    },
    onCallback1:function (nodeExecutingAction, value) {
        var s = director.getWinSize();
        var label = cc.LabelTTF.create("callback 1 called", "Marker Felt", 16);
        label.setPosition(s.width / 4 * 1, s.height / 2);
        this.addChild(label);
        this.control1 = true;
    },
    onCallback2:function (nodeExecutingAction, value) {
        var s = director.getWinSize();
        var label = cc.LabelTTF.create("callback 2 called", "Marker Felt", 16);
        label.setPosition(s.width / 4 * 2, s.height / 2);

        this.addChild(label);
        this.control2 = true;
    },
    onCallback3:function (nodeExecutingAction, value) {
        var s = director.getWinSize();
        var label = cc.LabelTTF.create("callback 3 called:" + value, "Marker Felt", 16);
        label.setPosition(s.width / 4 * 3, s.height / 2);
        this.addChild(label);
        this.control3 = true;
    },
    title:function () {
        return "Callbacks: CallFunc and friends";
    },
    //
    // Automation
    //
    testDuration:5.05,
    setupAutomation:function() {
        this.control1 = this.control2 = this.control3 = false;
    },
    getExpectedResult:function() {
        var ret = [true,true,true];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        ret.push( this.control1 );
        ret.push( this.control2 );
        ret.push( this.control3 );
        return JSON.stringify(ret);
    }
});
//------------------------------------------------------------------
//
// ActionCallFunc2
//
//------------------------------------------------------------------
var ActionCallFunc2 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(1);

        var action = cc.Sequence.create(cc.MoveBy.create(2.0, cc.p(200, 0)),
            cc.CallFunc.create(this.removeFromParentAndCleanup, this._grossini, true));

        this._grossini.runAction(action);
    },

    removeFromParentAndCleanup:function (nodeExecutingAction, data) {
        nodeExecutingAction.removeFromParent(data);
    },

    title:function () {
        return "cc.CallFunc + auto remove";
    },
    subtitle:function () {
        return "cc.CallFunc + removeFromParentAndCleanup. Grossini dissapears in 2s";
    },
    //
    // Automation
    //
    testDuration:2.1,
    setupAutomation:function() {
    },
    getExpectedResult:function() {
        var ret = [null];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        ret.push( this.getChildByTag(SPRITE_GROSSINI_TAG) );
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// ActionCallFunc3
//
//------------------------------------------------------------------
var ActionCallFunc3 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(1);

        var action = cc.CallFunc.create(function (nodeExecutingAction, value) {
            this.control1 = "Value is: " + value;
            this.log("Object:" + nodeExecutingAction + ". " + this.control1);
        }, this, "Hello world");

        this.runAction(action);
    },

    title:function () {
        return "cc.CallFunc + parameters";
    },
    subtitle:function () {
        return "cc.CallFunc + parameters. Take a look at the console";
    },
    //
    // Automation
    //
    testDuration:0.1,
    setupAutomation:function() {
    },
    getExpectedResult:function() {
        var ret = ["Value is: Hello world"];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        ret.push( this.control1 );
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// ActionSpawn
//
//------------------------------------------------------------------
var ActionSpawn = ActionsDemo.extend({

    _code:"a = cc.Spawn.create( a1, a2, ..., aN );",

    onEnter:function () {
        this._super();
        this.alignSpritesLeft(1);

        var action = cc.Spawn.create(
            cc.JumpBy.create(2, cc.p(300, 0), 50, 4),
            cc.RotateBy.create(2, 720));

        this._grossini.runAction(action);

    },
    title:function () {
        return "cc.Spawn: Jump + Rotate";
    },
    //
    // Automation
    //
    testDuration:2.1,
    getExpectedResult:function() {
        var ret = [{"x":300+60,"y":winSize.height/2},720];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        ret.push( this._grossini.getPosition() );
        ret.push( this._grossini.getRotation() );
        return JSON.stringify(ret);
    }
});
//------------------------------------------------------------------
//
// ActionRepeatForever
//
//------------------------------------------------------------------
var ActionRepeatForever = ActionsDemo.extend({
    _code:"a = cc.RepeatForever.create( action_to_repeat );",

    onEnter:function () {
        this._super();
        this.centerSprites(1);
        var action = cc.Sequence.create(
            cc.DelayTime.create(1),
            cc.CallFunc.create(this.repeatForever));    // not passing 'this' since it is not used by the callback func

        this._grossini.runAction(action);


    },
    repeatForever:function (sender) {
        var repeat = cc.RepeatForever.create(cc.RotateBy.create(1, 360));
        sender.runAction(repeat);
    },
    title:function () {
        return "cc.CallFunc + cc.RepeatForever";
    },
    //
    // Automation
    //
    testDuration:3.5,
    getExpectedResult:function() {
        var ret = [true];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        var r = this._grossini.getRotation();
        var expected = 900;
        var error = 15;
        ret.push( r < expected+error && r > expected-error );
        return JSON.stringify(ret);
    }

});
//------------------------------------------------------------------
//
// ActionRotateToRepeat
//
//------------------------------------------------------------------
var ActionRotateToRepeat = ActionsDemo.extend({
    _code:"a = cc.Repeat.create( action_to_repeat, #_of_times );",

    onEnter:function () {
        this._super();
        this.centerSprites(2);

        var act1 = cc.RotateTo.create(0.5, 90);
        var act2 = cc.RotateTo.create(0.5, 0);
        var seq = cc.Sequence.create(act1, act2);
        var rep1 = cc.RepeatForever.create(seq);
        var rep2 = cc.Repeat.create((seq.clone()), 4);

        this._tamara.runAction(rep1);
        this._kathia.runAction(rep2);

    },
    title:function () {
        return "Repeat/RepeatForever + RotateTo";
    },
    //
    // Automation
    //
    testDuration:4.5,
    getExpectedResult:function() {
        var ret = [0,true];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        ret.push( this._kathia.getRotation() );
        var r = this._tamara.getRotation();
        var expected = 90;
        var error = 15;
        ret.push( r < expected+error && r > expected-error );
        return JSON.stringify(ret);
    }

});
//------------------------------------------------------------------
//
// ActionRotateJerk
//
//------------------------------------------------------------------
var ActionRotateJerk = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(2);
        var seq = cc.Sequence.create(
            cc.RotateTo.create(0.5, -20),
            cc.RotateTo.create(0.5, 20));

        var rep1 = cc.Repeat.create(seq, 10);
        var rep2 = cc.RepeatForever.create((seq.clone()));

        this._tamara.runAction(rep1);
        this._kathia.runAction(rep2);
    },
    title:function () {
        return "RepeatForever / Repeat + Rotate";
    }
});
//------------------------------------------------------------------
//
// ActionReverse
//
//------------------------------------------------------------------
var ActionReverse = ActionsDemo.extend({

    _code:"a = action.reverse();",

    onEnter:function () {
        this._super();
        this.alignSpritesLeft(1);

        var jump = cc.JumpBy.create(2, cc.p(300, 0), 50, 4);
        var delay = cc.DelayTime.create(0.25);
        var action = cc.Sequence.create(jump, delay, jump.reverse());

        this._grossini.runAction(action);
    },
    title:function () {
        return "Reverse Jump action";
    },

    //
    // Automation
    //
    testDuration:4.4,
    setupAutomation:function() {
        this.scheduleOnce(this.checkControl1,2.1);
    },
    checkControl1:function(dt) {
        this.control1 = this._grossini.getPosition();
    },
    getExpectedResult:function() {
        var ret = [{"x":360,"y":winSize.height/2},{"x":60,"y":winSize.height/2}];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        ret.push( this.control1 );
        ret.push( this._grossini.getPosition() );
        return JSON.stringify(ret);
    }

});
//------------------------------------------------------------------
//
// ActionDelayTime
//
//------------------------------------------------------------------
var ActionDelayTime = ActionsDemo.extend({

    _code:"a = cc.DelayTime.create( time );",

    onEnter:function () {
        this._super();
        this.alignSpritesLeft(1);

        var move = cc.MoveBy.create(1, cc.p(150, 0));
        var action = cc.Sequence.create(move, cc.DelayTime.create(2), move.clone());

        this._grossini.runAction(action);
    },
    title:function () {
        return "DelayTime: m + delay + m";
    },
    //
    // Automation
    //
    testDuration:2.9,
    getExpectedResult:function() {
        var ret = [{"x":210,"y":winSize.height/2}];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        ret.push( this._grossini.getPosition() );
        return JSON.stringify(ret);
    }
});
//------------------------------------------------------------------
//
// ActionReverseSequence
//
//------------------------------------------------------------------
var ActionReverseSequence = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.alignSpritesLeft(1);

        var move1 = cc.MoveBy.create(1, cc.p(250, 0));
        var move2 = cc.MoveBy.create(1, cc.p(0, 50));
        var seq = cc.Sequence.create(move1, move2, move1.reverse());
        var action = cc.Sequence.create(seq, seq.reverse());

        this._grossini.runAction(action);

    },
    subtitle:function () {
        return "Reverse a sequence";
    }
});
//------------------------------------------------------------------
//
// ActionReverseSequence2
//
//------------------------------------------------------------------
var ActionReverseSequence2 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.alignSpritesLeft(2);


        // Test:
        //   Sequence should work both with IntervalAction and InstantActions
        var move1 = cc.MoveBy.create(3, cc.p(250, 0));
        var move2 = cc.MoveBy.create(3, cc.p(0, 50));
        var tog1 = cc.ToggleVisibility.create();
        var tog2 = cc.ToggleVisibility.create();
        var seq = cc.Sequence.create(move1, tog1, move2, tog2, move1.reverse());
        var action = cc.Repeat.create(
            cc.Sequence.create(seq, seq.reverse()), 3
        );


        // Test:
        //   Also test that the reverse of Hide is Show, and vice-versa
        this._kathia.runAction(action);

        var move_tamara = cc.MoveBy.create(1, cc.p(100, 0));
        var move_tamara2 = cc.MoveBy.create(1, cc.p(50, 0));
        var hide = cc.Hide.create();
        var seq_tamara = cc.Sequence.create(move_tamara, hide, move_tamara2);
        var seq_back = seq_tamara.reverse();
        this._tamara.runAction(cc.Sequence.create(seq_tamara, seq_back));
    },
    subtitle:function () {
        return "Reverse sequence 2";
    }
});
//------------------------------------------------------------------
//
// ActionRepeat
//
//------------------------------------------------------------------
var ActionRepeat = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.alignSpritesLeft(2);


        var a1 = cc.MoveBy.create(1, cc.p(150, 0));
        var action1 = cc.Repeat.create(
            cc.Sequence.create(cc.Place.create(cc.p(60, 60)), a1),
            3);
        var action2 = cc.RepeatForever.create(
            cc.Sequence.create( a1.clone(), a1.reverse(), cc.DelayTime.create(0.25) )
        );

        this._kathia.runAction(action1);
        this._tamara.runAction(action2);
    },
    title:function () {
        return "Repeat / RepeatForever actions";
    },
    //
    // Automation
    //
    testDuration:4.30,
    getExpectedResult:function() {
        var ret = [{"x":210,"y":60},{"x":60,"y":2*winSize.height/3}];
        return JSON.stringify(ret);
    },
    getCurrentResult:function() {
        var ret = [];
        ret.push( this._kathia.getPosition() );
        ret.push( this._tamara.getPosition() );
        return JSON.stringify(ret);
    }

});
//------------------------------------------------------------------
//
// ActionOrbit
//
//------------------------------------------------------------------
var ActionOrbit = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(3);

        var orbit1 = cc.OrbitCamera.create(2, 1, 0, 0, 180, 0, 0);
        var action1 = cc.Sequence.create(
            orbit1,
            orbit1.reverse());

        var orbit2 = cc.OrbitCamera.create(2, 1, 0, 0, 180, -45, 0);
        var action2 = cc.Sequence.create(
            orbit2,
            orbit2.reverse());

        var orbit3 = cc.OrbitCamera.create(2, 1, 0, 0, 180, 90, 0);
        var action3 = cc.Sequence.create(
            orbit3,
            orbit3.reverse());

        this._kathia.runAction(cc.RepeatForever.create(action1));
        this._tamara.runAction(cc.RepeatForever.create(action2));
        this._grossini.runAction(cc.RepeatForever.create(action3));

        var move = cc.MoveBy.create(3, cc.p(100, -100));
        var move_back = move.reverse();
        var seq = cc.Sequence.create(move, move_back);
        var rfe = cc.RepeatForever.create(seq);
        this._kathia.runAction(rfe);
        this._tamara.runAction((rfe.clone()));
        this._grossini.runAction((rfe.clone()));

    },
    subtitle:function () {
        return "OrbitCamera action";
    }
});
//------------------------------------------------------------------
//
// ActionFollow
//
//------------------------------------------------------------------
var ActionFollow = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(1);
        var s = director.getWinSize();

        this._grossini.setPosition(-(s.width / 2), s.height / 2);
        var move = cc.MoveBy.create(2, cc.p(s.width * 3, 0));
        var move_back = move.reverse();
        var seq = cc.Sequence.create(move, move_back);
        var rep = cc.RepeatForever.create(seq);

        this._grossini.runAction(rep);

        this.runAction(cc.Follow.create(this._grossini, cc.rect(0, 0, s.width * 2 - 100, s.height)));
    },
    subtitle:function () {
        return "Follow action";
    }
});

//------------------------------------------------------------------
//
// ActionCardinalSpline
//
//------------------------------------------------------------------
var ActionCardinalSpline = ActionsDemo.extend({
    _array:null,

    _code:" a = cc.CadinalSplineBy.create( time, array_of_points, tension );\n" +
        " a = cc.CadinalSplineTo.create( time, array_of_points, tension );",

    ctor:function () {
        this._super();
        this._array = [];
    },

    onEnter:function () {
        this._super();

        this.centerSprites(2);

        var delay = cc.DelayTime.create(0.25);

        var array = [
            cc.p(0, 0),
            cc.p(winSize.width / 2 - 30, 0),
            cc.p(winSize.width / 2 - 30, winSize.height - 80),
            cc.p(0, winSize.height - 80),
            cc.p(0, 0)
        ];

        //
        // sprite 1 (By)
        //
        // Spline with no tension (tension==0)
        //
        var action1 = cc.CardinalSplineBy.create(2, array, 0);
        var reverse1 = action1.reverse();
        var seq = cc.Sequence.create(action1, delay, reverse1, delay.clone() );

        this._tamara.setPosition(50, 50);
        this._tamara.runAction(seq);

        //
        // sprite 2 (By)
        //
        // Spline with high tension (tension==1)
        //
        var action2 = cc.CardinalSplineBy.create(2, array, 1);
        var reverse2 = action2.reverse();
        var seq2 = cc.Sequence.create(action2, delay.clone(), reverse2, delay.clone());

        this._kathia.setPosition(winSize.width / 2, 50);
        this._kathia.runAction(seq2);

        this._array = array;
    },

    draw:function (ctx) {
        // Draw is only supported in cocos2d-html5.
        // Not supported yet on cocos2d-iphone / cocos2d-x + JSB
        this._super();

        var context = ctx || cc.renderContext;
        var winSize = director.getWinSize();

        if(!("opengl" in sys.capabilities)){
            var locScaleX = cc.EGLView.getInstance().getScaleX(), locScaleY = cc.EGLView.getInstance().getScaleY();
            var apPoint = this.getAnchorPointInPoints();
            // move to 50,50 since the "by" path will start at 50,50
            context.save();
            context.translate(50 * locScaleX , -50 * locScaleY);
            cc.drawingUtil.drawCardinalSpline(this._array, 0, 100);
            context.restore();

            context.save();
            context.translate((winSize.width * locScaleX) * 0.5 , -50 * locScaleY);
            cc.drawingUtil.drawCardinalSpline(this._array, 1, 100);
            context.restore();
        } else {
            // move to 50,50 since the "by" path will start at 50,50
            cc.kmGLPushMatrix();
            cc.kmGLTranslatef(50, 50, 0);
            cc.drawingUtil.drawCardinalSpline(this._array, 0, 100);
            cc.kmGLPopMatrix();

            cc.kmGLPushMatrix();
            cc.kmGLTranslatef(winSize.width/2, 50, 0);
            cc.drawingUtil.drawCardinalSpline(this._array, 1, 100);
            cc.kmGLPopMatrix();
        }
    },
    subtitle:function () {
        return "Cardinal Spline paths. Testing different tensions for one array";
    },
    title:function () {
        return "CardinalSplineBy / CardinalSplineAt";
    },
    //
    // Automation
    //
    testDuration:2.1,
    setupAutomation:function() {
        this.scheduleOnce(this.checkControl1, 0.5);
        this.scheduleOnce(this.checkControl2, 1.0);
        this.scheduleOnce(this.checkControl3, 1.5);
    },
    checkControl1:function(dt) {
        this.control1 = this._tamara.getPosition();
    },
    verifyControl1:function(dt) {
        var x = Math.abs( 50 + winSize.width/2 - 30 - this.control1.x);
        var y = Math.abs( 50 - this.control1.y);
        //  -/+ 5 pixels of error
        return ( x < 5 && y < 5);
    },
    checkControl2:function(dt) {
        this.control2 = this._tamara.getPosition();
    },
    verifyControl2:function(dt) {
        var x = Math.abs( 50 + winSize.width/2 - 30 - this.control2.x );
        var y = Math.abs( 50 + winSize.height - 80 - this.control2.y );
        //  -/+ 5 pixels of error
        return ( x < 5 && y < 5);
    },
    checkControl3:function(dt) {
        this.control3 = this._tamara.getPosition();
    },
    verifyControl3:function(dt) {
        var x = Math.abs( 50 - this.control3.x );
        var y = Math.abs( 50 + winSize.height - 80 - this.control3.y );
        //  -/+ 5 pixels of error
        return ( x < 5 && y < 5);
    },

    getExpectedResult:function() {
        var ret = [ true,
                    true,
                    true,
                    {"x":50,"y":50}];
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = [];
        ret.push( this.verifyControl1() );
        ret.push( this.verifyControl2() );
        ret.push( this.verifyControl3() );
        ret.push( this._tamara.getPosition() );

        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// ActionCatmullRom
//
//------------------------------------------------------------------
var ActionCatmullRom = ActionsDemo.extend({
    _array1:null,
    _array2:null,

    _code:"a = cc.CatmullRomBy.create( time, array_of_points );\n" +
        " a = cc.CatmullRomTo.create( time, array_of_points );",

    ctor:function () {
        this._super();
        this._array1 = [];
        this._array2 = [];
    },

    onEnter:function () {
        this._super();

        this.centerSprites(2);

        var delay = cc.DelayTime.create(0.25);

        //
        // sprite 1 (By)
        //
        // startPosition can be any coordinate, but since the movement
        // is relative to the Catmull Rom curve, it is better to start with (0,0).
        //
        this._tamara.setPosition(50, 50);

        var array = [
            cc.p(0, 0),
            cc.p(80, 80),
            cc.p(winSize.width - 80, 80),
            cc.p(winSize.width - 80, winSize.height - 80),
            cc.p(80, winSize.height - 80),
            cc.p(80, 80),
            cc.p(winSize.width / 2, winSize.height / 2)
        ];

        var action1 = cc.CatmullRomBy.create(3, array);
        var reverse1 = action1.reverse();
        var seq1 = cc.Sequence.create(action1, delay, reverse1);

        this._tamara.runAction(seq1);

        //
        // sprite 2 (To)
        //
        // The startPosition is not important here, because it uses a "To" action.
        // The initial position will be the 1st point of the Catmull Rom path
        //
        var array2 = [
            cc.p(winSize.width / 2, 30),
            cc.p(winSize.width - 80, 30),
            cc.p(winSize.width - 80, winSize.height - 80),
            cc.p(winSize.width / 2, winSize.height - 80),
            cc.p(winSize.width / 2, 30) ];

        var action2 = cc.CatmullRomTo.create(3, array2);
        var reverse2 = action2.reverse();

        var seq2 = cc.Sequence.create(action2, delay.clone(), reverse2);

        this._kathia.runAction(seq2);

        this._array1 = array;
        this._array2 = array2;
    },
    draw:function (ctx) {
        // Draw is only supported in cocos2d-html5.
        // Not supported yet on cocos2d-iphone / cocos2d-x + JSB
        this._super();
        var context = ctx || cc.renderContext;

        if(!("opengl" in sys.capabilities)){
            var eglViewer = cc.EGLView.getInstance();
            // move to 50,50 since the "by" path will start at 50,50
            context.save();
            context.translate(50 * eglViewer.getScaleX(), - 50 * eglViewer.getScaleY());
            cc.drawingUtil.drawCatmullRom(this._array1, 50);
            context.restore();

            cc.drawingUtil.drawCatmullRom(this._array2, 50);
        } else {
            // move to 50,50 since the "by" path will start at 50,50
            cc.kmGLPushMatrix();
            cc.kmGLTranslatef(50, 50, 0);
            cc.drawingUtil.drawCatmullRom(this._array1, 50);
            cc.kmGLPopMatrix();

            cc.drawingUtil.drawCatmullRom(this._array2,50);
        }
    },
    subtitle:function () {
        return "Catmull Rom spline paths. Testing reverse too";
    },
    title:function () {
        return "CatmullRomBy / CatmullRomTo";
    },
    //
    // Automation
    //
    testDuration:3.1,
    setupAutomation:function() {
        this.scheduleOnce(this.checkControl1, 3 / 4 * 0);
        this.scheduleOnce(this.checkControl2, 3 / 4 * 1);
        this.scheduleOnce(this.checkControl3, 3 / 4 * 2);
    },
    checkControl1:function(dt) {
        this.control1 = this._kathia.getPosition();
    },
    verifyControl1:function(dt) {
        var x = Math.abs( winSize.width/2 - this.control1.x);
        var y = Math.abs( 30 - this.control1.y);
        //  -/+ 5 pixels of error
        return ( x < 5 && y < 5);
    },
    checkControl2:function(dt) {
        this.control2 = this._kathia.getPosition();
    },
    verifyControl2:function(dt) {
        var x = Math.abs( winSize.width - 80 - this.control2.x );
        var y = Math.abs( 30 - this.control2.y );
        //  -/+ 5 pixels of error
        return ( x < 5 && y < 5);
    },
    checkControl3:function(dt) {
        this.control3 = this._kathia.getPosition();
    },
    verifyControl3:function(dt) {
        var x = Math.abs( winSize.width - 80 - this.control3.x );
        var y = Math.abs( winSize.height - 80 - this.control3.y );
        //  -/+ 5 pixels of error
        return ( x < 5 && y < 5);
    },

    getExpectedResult:function() {
        var ret = [ true,
                    true,
                    true,
                    {"x":winSize.width/2,"y":30}];
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = [];
        ret.push( this.verifyControl1() );
        ret.push( this.verifyControl2() );
        ret.push( this.verifyControl3() );
        ret.push( this._kathia.getPosition() );

        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// ActionTargeted
//
//------------------------------------------------------------------
var ActionTargeted = ActionsDemo.extend({
    _code:"a = cc.TargetedAction.create( target, action );",

    onEnter:function () {
        this._super();
        this.centerSprites(2);

        var jump1 = cc.JumpBy.create(2, cc.p(0, 0), 100, 3);
        var jump2 = jump1.clone();
        var rot1 = cc.RotateBy.create(1, 360);
        var rot2 = rot1.clone();

        var t1 = cc.TargetedAction.create(this._kathia, jump2);
        var t2 = cc.TargetedAction.create(this._kathia, rot2);

        var seq = cc.Sequence.create(jump1, t1, rot1, t2);
        var always = cc.RepeatForever.create(seq);

        this._tamara.runAction(always);
    },
    title:function () {
        return "Action that runs on another target. Useful for sequences";
    },
    subtitle:function () {
        return "ActionTargeted";
    }
});

//------------------------------------------------------------------
//
// ActionTargetedCopy
//
//------------------------------------------------------------------
var ActionTargetedCopy = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(2);

        var jump1 = cc.JumpBy.create(2, cc.p(0, 0), 100, 3);
        var jump2 = jump1.clone();

        var t1 = cc.TargetedAction.create(this._kathia, jump2);
        var t_copy = t1.clone();

        var seq = cc.Sequence.create(jump1, t_copy);

        this._tamara.runAction(seq);
    },
    title:function () {
        return "Action that runs on another target. Useful for sequences";
    },
    subtitle:function () {
        return "Testing copy on TargetedAction";
    }
});

//------------------------------------------------------------------
//
// ActionStackableMove
//
//------------------------------------------------------------------
var ActionStackableMove = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(1);

        this._grossini.setPosition(40, winSize.height / 2);

        // shake
        var move = cc.MoveBy.create(0.2, cc._p(0,50));
        var move_back = move.reverse();
        var delay = cc.DelayTime.create(0.25);
        var move_seq = cc.Sequence.create( move, move_back );
        var move_rep = cc.RepeatForever.create( move_seq );
        this._grossini.runAction( move_rep );

        // move
        var action = cc.MoveBy.create(2, cc._p(winSize.width - 80, 0));
        var back = action.reverse();
        var seq = cc.Sequence.create(action, back);
        var repeat = cc.RepeatForever.create(seq);
        this._grossini.runAction(repeat);


    },
    title:function () {
        return "Stackable actions: MoveBy + MoveBy";
    },
    subtitle:function () {
        return "Grossini shall move up and down while moving horizontally";
    },
    //
    // Automation
    //
    testDuration:0.2,
    getExpectedResult:function() {
        var ret = [true, true];
        return JSON.stringify(ret);
    },

    getCurrentResult:function() {
        var ret = [];
        var p = this._grossini.getPosition();
        var error = 10;
        var expected_x = 40 + 0.2 * (winSize.width-80) / 2;
        var expected_y =winSize.height/2 + 50;
        var ret_x = p.x < expected_x+error && p.x > expected_x-error;
        var ret_y = p.y < expected_y+error && p.y > expected_y-error;
        ret.push( ret_x );
        ret.push( ret_y );
        return JSON.stringify(ret);
    }
});

//------------------------------------------------------------------
//
// ActionStackableJump
//
//------------------------------------------------------------------
var ActionStackableJump = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(1);

        this._grossini.setPosition(40, winSize.height / 2);

        // shake
        var move = cc.MoveBy.create(0.05, cc._p(8, 8));
        var move_back = move.reverse();
        var move_seq = cc.Sequence.create(move, move_back);
        var move_rep = cc.RepeatForever.create(move_seq);
        this._grossini.runAction(move_rep);

        // jump
        var action = cc.JumpBy.create(2, cc._p(winSize.width - 80, 0), 90, 5);
        var back = action.reverse();
        var seq = cc.Sequence.create(action, back);
        var repeat = cc.RepeatForever.create(seq);
        this._grossini.runAction(repeat);


    },
    title:function () {
        return "Stackable actions: MoveBy + JumpBy";
    },
    subtitle:function () {
        return "Grossini shall shake while he is jumping";
    }
});

//------------------------------------------------------------------
//
// ActionStackableBezier
//
//------------------------------------------------------------------
var ActionStackableBezier = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(1);

        this._grossini.setPosition(40, winSize.height / 2);

        // shake
        var move = cc.MoveBy.create(0.05, cc._p(8, 8));
        var move_back = move.reverse();
        var move_seq = cc.Sequence.create(move, move_back);
        var move_rep = cc.RepeatForever.create(move_seq);
        this._grossini.runAction(move_rep);

        // Bezier
        var controlPoints = [ cc.p(0, winSize.height / 2),
            cc.p(winSize.width - 80, -winSize.height / 2),
            cc.p(winSize.width - 80, 100) ];

        var bezierForward = cc.BezierBy.create(3, controlPoints);
        var repeat = cc.RepeatForever.create(
            cc.Sequence.create(bezierForward, bezierForward.reverse()));
        this._grossini.runAction(repeat);


    },
    title:function () {
        return "Stackable actions: MoveBy + BezierBy";
    },
    subtitle:function () {
        return "Grossini shall shake while he moves along a bezier path";
    }
});

//------------------------------------------------------------------
//
// ActionStackableCatmullRom
//
//------------------------------------------------------------------
var ActionStackableCatmullRom = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(1);

        this._grossini.setPosition(40, 40);

        // shake
        var move = cc.MoveBy.create(0.05, cc._p(8, 8));
        var move_back = move.reverse();
        var move_seq = cc.Sequence.create(move, move_back);
        var move_rep = cc.RepeatForever.create(move_seq);
        this._grossini.runAction(move_rep);

        // CatmullRom
        var array = [
            cc.p(0, 0),
            cc.p(80, 80),
            cc.p(winSize.width - 80, 80),
            cc.p(winSize.width - 80, winSize.height - 80),
            cc.p(80, winSize.height - 80),
            cc.p(80, 80),
            cc.p(winSize.width / 2, winSize.height / 2)
        ];

        var action1 = cc.CatmullRomBy.create(6, array);
        var reverse1 = action1.reverse();
        var seq1 = cc.Sequence.create(action1, reverse1);
        var repeat = cc.RepeatForever.create(seq1);
        this._grossini.runAction(repeat);

    },
    title:function () {
        return "Stackable actions: MoveBy + CatmullRomBy";
    },
    subtitle:function () {
        return "Grossini shall shake while he moves along a CatmullRom path";
    }
});

//------------------------------------------------------------------
//
// ActionStackableCardinalSpline
//
//------------------------------------------------------------------
var ActionStackableCardinalSpline = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(1);

        this._grossini.setPosition(40, 40);

        // shake
        var move = cc.MoveBy.create(0.05, cc._p(8, 8));
        var move_back = move.reverse();
        var move_seq = cc.Sequence.create(move, move_back);
        var move_rep = cc.RepeatForever.create(move_seq);
        this._grossini.runAction(move_rep);

        // CardinalSpline
        var array = [
            cc.p(0, 0),
            cc.p(80, 80),
            cc.p(winSize.width - 80, 80),
            cc.p(winSize.width - 80, winSize.height - 80),
            cc.p(80, winSize.height - 80),
            cc.p(80, 80),
            cc.p(winSize.width / 2, winSize.height / 2)
        ];

        var action1 = cc.CardinalSplineBy.create(6, array, 0.9);
        var reverse1 = action1.reverse();
        var seq1 = cc.Sequence.create(action1, reverse1);
        var repeat = cc.RepeatForever.create(seq1);
        this._grossini.runAction(repeat);

    },
    title:function () {
        return "Stackable actions: MoveBy + CardinalSplineBy";
    },
    subtitle:function () {
        return "Grossini shall shake while he moves along a CardinalSpline path";
    }
});

//------------------------------------------------------------------
//
// PauseResumeActions
//
//------------------------------------------------------------------
var PauseResumeActions = ActionsDemo.extend({
    _pausedTargets:[],
    onEnter:function () {
        this._super();
        this.centerSprites(2);

        this._tamara.runAction(cc.RepeatForever.create(cc.RotateBy.create(3, 360)));
        this._grossini.runAction(cc.RepeatForever.create(cc.RotateBy.create(3, -360)));
        this._kathia.runAction(cc.RepeatForever.create(cc.RotateBy.create(3, 360)));

        this.schedule(this.pause, 3, false, 0);
        this.schedule(this.resume, 5, false, 0);
    },

    pause:function () {
        cc.log("Pausing");
        this._pausedTargets = director.getActionManager().pauseAllRunningActions();
    },
    resume:function () {
        cc.log("Resuming");
        director.getActionManager().resumeTargets(this._pausedTargets);
    },

    title:function () {
        return "PauseResumeActions";
    },
    subtitle:function () {
        return "All actions pause at 3s and resume at 5s";
    }
});

//------------------------------------------------------------------
//
// Issue1305
//
//------------------------------------------------------------------
var Issue1305 = ActionsDemo.extend({
    _spriteTemp:null,
    onEnter:function () {
        this._super();
        this.centerSprites(0);

        this._spriteTmp = cc.Sprite.create(s_pathGrossini);
        /* c++ can't support block, so we use CCCallFuncN instead.
         [spriteTmp_ runAction:[CCCallBlockN actionWithBlock:^(CCNode* node) {
         NSLog(@"This message SHALL ONLY appear when the sprite is added to the scene, NOT BEFORE");
         }] ];
         */

        this._spriteTmp.runAction(cc.CallFunc.create(this.onLog, this));
        this.scheduleOnce(this.onAddSprite, 2);
    },
    onExit:function () {
        this._super();
    },
    onLog:function (pSender) {
        cc.log("This message SHALL ONLY appear when the sprite is added to the scene, NOT BEFORE");
    },
    onAddSprite:function (dt) {
        this._spriteTmp.setPosition(250, 250);
        this.addChild(this._spriteTmp);
    },
    title:function () {
        return "Issue 1305";
    },
    subtitle:function () {
        return "In two seconds you should see a message on the console. NOT BEFORE.";
    }
});

//------------------------------------------------------------------
//
// Issue1305_2
//
//------------------------------------------------------------------
var Issue1305_2 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(0);

        var spr = cc.Sprite.create(s_pathGrossini);
        spr.setPosition(200, 200);
        this.addChild(spr);

        var act1 = cc.MoveBy.create(2, cc.p(0, 100));

        var act2 = cc.CallFunc.create(this.onLog1);
        var act3 = cc.MoveBy.create(2, cc.p(0, -100));
        var act4 = cc.CallFunc.create(this.onLog2, this);
        var act5 = cc.MoveBy.create(2, cc.p(100, -100));
        var act6 = cc.CallFunc.create(this.onLog3.bind(this));
        var act7 = cc.MoveBy.create(2, cc.p(-100, 0));
        var act8 = cc.CallFunc.create(this.onLog4, this);

        var actF = cc.Sequence.create(act1, act2, act3, act4, act5, act6, act7, act8);

        //    [spr runAction:actF];
        director.getActionManager().addAction(actF, spr, false);
    },
    onLog1:function () {
        cc.log("1st block");
    },
    onLog2:function () {
        cc.log("2nd block");
    },
    onLog3:function () {
        cc.log("3rd block");
    },
    onLog4:function () {
        cc.log("4th block");
    },
    title:function () {
        return "Issue 1305 #2";
    },
    subtitle:function () {
        return "See console. You should only see one message for each block";
    }
});

//------------------------------------------------------------------
//
// Issue1288
//
//------------------------------------------------------------------
var Issue1288 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(0);

        var spr = cc.Sprite.create(s_pathGrossini);
        spr.setPosition(100, 100);
        this.addChild(spr);

        var act1 = cc.MoveBy.create(0.5, cc.p(100, 0));
        var act2 = act1.reverse();
        var act3 = cc.Sequence.create(act1, act2);
        var act4 = cc.Repeat.create(act3, 2);

        spr.runAction(act4);
    },
    title:function () {
        return "Issue 1288";
    },
    subtitle:function () {
        return "Sprite should end at the position where it started.";
    }
});

//------------------------------------------------------------------
//
// Issue1288_2
//
//------------------------------------------------------------------
var Issue1288_2 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(0);

        var spr = cc.Sprite.create(s_pathGrossini);
        spr.setPosition(100, 100);
        this.addChild(spr);

        var act1 = cc.MoveBy.create(0.5, cc.p(100, 0));
        spr.runAction(cc.Repeat.create(act1, 1));
    },
    title:function () {
        return "Issue 1288 #2";
    },
    subtitle:function () {
        return "Sprite should move 100 pixels, and stay there";
    }
});

//------------------------------------------------------------------
//
// Issue1327
//
//------------------------------------------------------------------
var Issue1327 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(0);

        var spr = cc.Sprite.create(s_pathGrossini);
        spr.setPosition(100, 100);
        this.addChild(spr);

        var act1 = cc.CallFunc.create(this.onLogSprRotation);
        var act2 = cc.RotateBy.create(0.25, 45);
        var act3 = cc.CallFunc.create(this.onLogSprRotation, this);
        var act4 = cc.RotateBy.create(0.25, 45);
        var act5 = cc.CallFunc.create(this.onLogSprRotation.bind(this));
        var act6 = cc.RotateBy.create(0.25, 45);
        var act7 = cc.CallFunc.create(this.onLogSprRotation);
        var act8 = cc.RotateBy.create(0.25, 45);
        var act9 = cc.CallFunc.create(this.onLogSprRotation);

        var actF = cc.Sequence.create(act1, act2, act3, act4, act5, act6, act7, act8, act9);
        spr.runAction(actF);
    },
    onLogSprRotation:function (pSender) {
        cc.log(pSender.getRotation());
    },
    title:function () {
        return "Issue 1327";
    },
    subtitle:function () {
        return "See console: You should see: 0, 45, 90, 135, 180";
    }
});

//------------------------------------------------------------------
//
// Issue1438
//
//------------------------------------------------------------------
var Issue1438 = ActionsDemo.extend({
    onEnter:function () {
        this._super();
        this.centerSprites(2);

        //
        // manual animation
        //
        var animation = cc.Animation.create();

        // Add 60 frames
        for (var j = 0; j < 4; j++) {
            for (var i = 1; i < 15; i++) {
                var frameName = "res/Images/grossini_dance_" + ((i < 10) ? ("0" + i) : i) + ".png";
                animation.addSpriteFrameWithFile(frameName);
            }
        }
        // And display 60 frames per second
        animation.setDelayPerUnit(1 / 60);
        animation.setRestoreOriginalFrame(true);

        var action = cc.Animate.create(animation);
        this._kathia.runAction(action);

        //
        // File animation
        //
        var animCache = cc.AnimationCache.getInstance();
        animCache.addAnimations(s_animations2Plist);
        var animation2 = animCache.getAnimation("dance_1");
        animation2.setDelayPerUnit(1 / 60);

        var action2 = cc.Animate.create(animation2);
        this._tamara.runAction(cc.Sequence.create(action2, action2.reverse()));
    },

    title:function () {
        return "Animation";
    },

    subtitle:function () {
        return "Issue 1438. Set FPS to 30 to test this bug.";
    }
});

//------------------------------------------------------------------
//
// Issue1438
//
//------------------------------------------------------------------
var Issue1446 = ActionsDemo.extend({
    title:function () {
        return "Sequence + Speed in 'reverse mode'";
    },

    subtitle:function () {
        return "Issue #1446. 'Hello World' should be visible for only 0.1 seconds";
    },

    onEnter:function () {
        this._super();
        this.centerSprites(0);
        var label = this.label = cc.LabelTTF.create("Hello World", "Arial", 64);

        label.setPosition(winSize.width / 2, winSize.height / 2);
        label.setOpacity(0);

        this.addChild(label);

        this.backwardsFade = cc.Speed.create(cc.Sequence.create(
            cc.DelayTime.create(2),
            cc.FadeTo.create(1, 255),
            cc.DelayTime.create(2)), 1);
        label.runAction(this.backwardsFade);

        // Comment out to see that 1.0 in the update function is called which is expected
        // Leave it uncommented to see that 0.0 is never called when going in reverse
        this.scheduleOnce(this.stepForwardGoBackward, 0.1);
    },

    stepForwardGoBackward:function () {
        var action = this.backwardsFade.getInnerAction();
        action.step(2.5);
        // Try with -10.0f and you can see the opacity not fully faded out. Try with lower values to see it 'almost' fade out
        this.backwardsFade.setSpeed(-10);
    }
});

//-
//
// Flow control
//
var arrayOfActionsTest = [
    ActionManual,
    ActionMove,
    ActionScale,
    ActionRotate,
    ActionRotateXY,
    ActionSkew,
    ActionSkewRotateScale,
    ActionJump,
    ActionBezier,
    ActionBezierToCopy,
    Issue1008,
    ActionCardinalSpline,
    ActionCatmullRom,
    ActionBlink,
    ActionFade,
    ActionTint,
    ActionSequence,
    ActionSequence2,
    ActionSpawn,
    ActionReverse,
    ActionDelayTime,
    ActionRepeat,
    ActionRepeatForever,
    ActionRotateToRepeat,
    ActionRotateJerk,
    ActionCallFunc1,
    ActionCallFunc2,
    ActionCallFunc3,
    ActionReverseSequence,
    ActionReverseSequence2,

    ActionFollow,
    ActionTargeted,
    ActionTargetedCopy,

    ActionStackableMove,
    ActionStackableJump,
    ActionStackableBezier,
    ActionStackableCatmullRom,
    ActionStackableCardinalSpline,

    PauseResumeActions,
    Issue1305,
    Issue1305_2,
    Issue1288,
    Issue1288_2,
    Issue1327,
    ActionAnimate,
    Issue1438,
    Issue1446
];

if("opengl" in sys.capabilities){
    arrayOfActionsTest.push(ActionOrbit);
}

var nextActionsTest = function () {
    actionsTestIdx++;
    actionsTestIdx = actionsTestIdx % arrayOfActionsTest.length;

    return new arrayOfActionsTest[actionsTestIdx]();
};
var previousActionsTest = function () {
    actionsTestIdx--;
    if (actionsTestIdx < 0)
        actionsTestIdx += arrayOfActionsTest.length;

    return new arrayOfActionsTest[actionsTestIdx]();
};
var restartActionsTest = function () {
    return new arrayOfActionsTest[actionsTestIdx]();
};
