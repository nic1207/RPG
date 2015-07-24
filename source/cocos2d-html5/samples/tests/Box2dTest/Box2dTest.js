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
var TAG_SPRITE_MANAGER = 1;
var PTM_RATIO = 32;

var b2Vec2 = Box2D.Common.Math.b2Vec2
  , b2BodyDef = Box2D.Dynamics.b2BodyDef
  , b2Body = Box2D.Dynamics.b2Body
  , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
  , b2World = Box2D.Dynamics.b2World
  , b2debugDraw = Box2D.Dynamics.b2DebugDraw
  , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
  , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

var Box2DTestLayer = cc.Layer.extend({
  world:null,
  player: null,
  tileMapNode: null,
  isTouching: 0,//0.none 1.left 2.right
  ElapsedTime: 0,

  ctor: function() {
    this._super();
    //this.setKeyboardEnabled(true);
    
    //if( 'touches' in sys.capabilities ) {
      this.setTouchEnabled(true);
    //}
    if( 'mouse' in sys.capabilities ) {
      this.setMouseEnabled(true);
      this.setKeyboardEnabled(true);
    }
    
    //this.setTouchEnabled(true);
    //this.setMouseEnabled(true);
    //setAccelerometerEnabled( true );

    var screenSize = cc.Director.getInstance().getWinSize();
    this.screenSize = screenSize;

    /*
    var m_debugDraw = new Box2D.Dynamics.b2DebugDraw(PTM_RATIO);
    m_debugDraw.SetSprite(document.getElementById("gameCanvas").getContext("2d"));
    m_debugDraw.SetDrawScale(1.0);
    m_debugDraw.SetFillAlpha(0.3);
    m_debugDraw.SetLineThickness(1.0);
    m_debugDraw.SetFlags(b2DebugDraw.e_shapeBit|b2DebugDraw.e_jointBit| Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit);
    this.world.SetDebugDraw(m_debugDraw);
    */
    this.setupPhysicsWorld();
    this.addScrollingBackgroundWithTileMap();
    this.setupCollisionTiles();
    this.setupPlayer();
    /*
    // Define the ground body.
    //var groundBodyDef = new b2BodyDef(); // TODO
    //groundBodyDef.position.Set(screenSize.width / 2 / PTM_RATIO, screenSize.height / 2 / PTM_RATIO); // bottom-left corner

    // Call the body factory which allocates memory for the ground body
    // from a pool and creates the ground box shape (also from a pool).
    // The body is also added to the world.
    //var groundBody = this.world.CreateBody(groundBodyDef);

    var fixDef = new b2FixtureDef();
    fixDef.density = 1;//密度, 在碰撞的等式中使用密度*面积=质量，密度如果是0或者null,将会是一个静止的对象。
    fixDef.friction = 1;//摩擦力, 用来计算两个对象之间的摩擦，可以在0.0-1.0之间调整它们
    fixDef.restitution = 0;//弹性, 这是调整对象弹性程度的属性，可以在0.0-1.0之间调整它们

    var bodyDef = new b2BodyDef;

    //create ground
    bodyDef.type = b2Body.b2_staticBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(20, 2);
    // upper
    bodyDef.position.Set(10, screenSize.height / PTM_RATIO + 1.8);
    this.world.CreateBody(bodyDef).CreateFixture(fixDef);
    // bottom
    bodyDef.position.Set(10, -1.8);
    this.world.CreateBody(bodyDef).CreateFixture(fixDef);

    fixDef.shape.SetAsBox(2, 14);
    // left
    bodyDef.position.Set(-1.8, 13);
    this.world.CreateBody(bodyDef).CreateFixture(fixDef);
    // right
    bodyDef.position.Set(26.8, 13);
    this.world.CreateBody(bodyDef).CreateFixture(fixDef);

    //Set up sprite

    var mgr = cc.SpriteBatchNode.create(s_pathBlock, 150);
    this.addChild(mgr, 0, TAG_SPRITE_MANAGER);

    this.addNewSpriteWithCoords(cc.p(screenSize.width / 2, screenSize.height / 2));

    //var label = cc.LabelTTF.create("Tap screen", "Marker Felt", 32);
    //this.addChild(label, 0);
    //label.setColor(cc.c3b(0, 0, 255));
    //label.setPosition(screenSize.width / 2, screenSize.height - 50);
    */
    this.scheduleUpdate();
    //if (sys.capabilities.hasOwnProperty('keyboard')) {
    //  this.setKeyboardEnabled(true);
    //}
  },
  
  //onEnter: function(){
  //  this._super();
  //  cc.registerTargetedDelegate(0, true, this);
  //},
                       
  //onExit: function(){
  //  cc.unregisterTouchDelegate(this);
  //},

  setupPhysicsWorld: function() {
    var gravity = new b2Vec2(0, -100);//重力
    var doSleep = true;
    this.world = new b2World(gravity, doSleep);//有重力的物理世界
    this.world.SetContinuousPhysics(true);//設定為連續物理模擬
    //var debugs = cc.Sprite.create();
    //this.addChild(debugs);
    var debugDraw = new b2debugDraw();
    debugDraw.SetSprite(cc.renderContext);
    debugDraw.SetDrawScale(64);
    debugDraw.SetFillAlpha(1);
    debugDraw.SetLineThickness(2);
    debugDraw.SetFlags(b2debugDraw.e_shapeBit | b2debugDraw.e_centerOfMassBit );
    this.world.SetDebugDraw(debugDraw);

    //var m_debugDraw = new GLESDebugDraw(PTM_RATIO);
    //this.world.SetDebugDraw(m_debugDraw);
    //uint32 flags = 0;
    //flags += b2DebugDraw::e_shapeBit;
    //m_debugDraw->SetFlags(flags);
    //contactListener = new ContactListener();
    //world->SetContactListener(contactListener);
  },

  setupPlayer: function() {
    cc.SpriteFrameCache.getInstance().addSpriteFrames("res/TileMaps/robot.plist");
    var mgr = cc.SpriteBatchNode.create("res/TileMaps/robot.png","res/TileMaps/robot.plist");
    //this.addChild(mgr, 0, TAG_SPRITE_MANAGER);

    var player = new Player("robotFrames_012.png");
    player.position = cc.p(100, 100);
    player.setAnchorPoint(0.5, 0.5);
    player.createBox2dObject(this.world);
    this.player = player;
    this.addChild(player);
  },
  /*
  addNewSpriteWithCoords:function (p) {
        //UXLog(L"Add sprite %0.2f x %02.f",p.x,p.y);
        var batch = this.getChildByTag(TAG_SPRITE_MANAGER);

        //We have a 64x64 sprite sheet with 4 different 32x32 images.  The following code is
        //just randomly picking one of the images
        var idx = (Math.random() > .5 ? 0 : 1);
        var idy = (Math.random() > .5 ? 0 : 1);
        var sprite = cc.Sprite.createWithTexture(batch.getTexture(), cc.rect(32 * idx, 32 * idy, 32, 32));
        batch.addChild(sprite);

        sprite.setPosition(p.x, p.y);

        // Define the dynamic body.
        //Set up a 1m squared box in the physics world
        var b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(p.x / PTM_RATIO, p.y / PTM_RATIO);
        bodyDef.userData = sprite;
        var body = this.world.CreateBody(bodyDef);

        // Define another box shape for our dynamic body.
        var dynamicBox = new b2PolygonShape();
        dynamicBox.SetAsBox(0.5, 0.5);//These are mid points for our 1m box

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.3;
        body.CreateFixture(fixtureDef);

  },
  */
  addScrollingBackgroundWithTileMap: function() {
    var tileMapNode = cc.TMXTiledMap.create(s_resprefix + "TileMaps/scroller.tmx");
    this.tileMapNode = tileMapNode;
    //tileMapNode.setAnchorPoint(0, 0);
    //tileMapNode.setAnchorPoint(0.5, 0.5);
    this.addChild(tileMapNode,0,1);
  },
  setupCollisionTiles: function() {
    var group = this.tileMapNode.getObjectGroup("Wall");
    if(group) {
      var objs = group.getObjects();
      //console.log(objs);
      //var objPoint;
      var x, y, w, h;
      for (var i in objs) {
        //console.log(i);
        x = objs[i].x;
        y = objs[i].y;
        w = objs[i].width;
        h = objs[i].height;
        //console.log(x,y,w,h);
        var _point=cc.p(x+w/2,y+h/2);
        var _size=cc.p(w,h);
        //console.log(i,"p=",_point,"size=",_size);
        this.makeBox2dObjAt(_point, _size, false, 0, 1.5, 0, 0, -1);
      }
    }
  },
  makeBox2dObjAt: function(p, size, d, r, f, dens, rest, boxid) {
    var sprite = cc.Sprite.create();

    var bodyDef = new b2BodyDef();
    if(d)
      bodyDef.type = b2_dynamicBody;
    bodyDef.position.Set(p.x/PTM_RATIO, p.y/PTM_RATIO);

    sprite.setPosition(p.x, p.y);

    bodyDef.userData = sprite;
    var body = this.world.CreateBody(bodyDef);
    var dynamicBox = new b2PolygonShape();
    dynamicBox.SetAsBox(size.x/2/PTM_RATIO, size.y/2/PTM_RATIO);//These are mid points for our 1m box

    // Define the dynamic body fixture.
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = dynamicBox;
    fixtureDef.density = dens;
    fixtureDef.friction = f;
    fixtureDef.restitution = rest;
    body.CreateFixture(fixtureDef);
    this.addChild(sprite);
  },

  draw: function() {
    //this.world.DrawDebugData();
    this._super();
    this.world.DrawDebugData();
    /*
    var group = this.tileMapNode.getObjectGroup("Wall");
    if(group) {
      var objs = group.getObjects();
      var x, y, w, h;
      for (var i in objs) {
        x = objs[i].x;
        y = objs[i].y;
        w = objs[i].width;
        h = objs[i].height;
        //console.log(x,y,w,h);
        //var _point=cc.p(x+w/2,y+h/2);
        //var _size=cc.p(w,h);

        cc.renderContext.lineWidth = 3;
        //cc.renderContext.strokeStyle = "green";
        //cc.renderContext.fillStyle = "rgba(0,255,255,1)";//上下文填充颜色
        cc.renderContext.strokeStyle = "rgba(0,0,255,1)";
        cc.drawingUtil.drawLine(cc.p(x, y), cc.p(x + w, y));
        cc.drawingUtil.drawLine(cc.p(x + w, y), cc.p(x + w, y + h));
        cc.drawingUtil.drawLine(cc.p(x + w, y + h), cc.p(x, y + h));
        cc.drawingUtil.drawLine(cc.p(x, y + h), cc.p(x, y));
        cc.renderContext.lineWidth = 1;

      }
    }
    */
  },

  update: function (dt) {
    //It is recommended that a fixed time step is used with Box2D for stability
    //of the simulation, however, we are using a variable time step here.
    //You need to make an informed choice, the following URL is useful
    //http://gafferongames.com/game-physics/fix-your-timestep/
    var velocityIterations = 8;
    var positionIterations = 1;

    // Instruct the world to perform a single step of simulation. It is
    // generally best to keep the time step and iterations fixed.
    this.world.Step(dt, velocityIterations, positionIterations);
    this.world.DrawDebugData();

    //Iterate over the bodies in the physics world
    for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
      if (b.GetUserData() != null) {
        //Synchronize the AtlasSprites position and rotation with the corresponding body
        var myActor = b.GetUserData();
        myActor.setPosition(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO);
        //myActor.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
       // console.log(b.GetAngle());
      }
    }
    if(this.isTouching>0) {
      //console.log(this.isTouching,this.ElapsedTime);
      //if(this.ElapsedTime >=0.2) {
      if(this.isTouching==1)
        this.player.moveLeft();
      else if(this.isTouching==2)
        this.player.moveRight();
      //  this.ElapsedTime = 0;
      //}
      //this.ElapsedTime += dt;
    }
  },
  onKeyDown: function(e) {
    //console.log("kkkkk",e);
    if(e === cc.KEY.a) {
      this.player.moveLeft();
      this.isTouching = 1;
    } 
    else if(e===cc.KEY.d) {
      this.player.moveRight();
      this.isTouching = 2;
    }
    else if(e===cc.KEY.k) {
      this.player.jump();
      this.isTouching = 0;
    }
    //return true;
  },
  
  onKeyUp: function(e) {
    this.isTouching = 0;
  },

  onTouchesBegan: function(touches) {
    //console.log("XXXX");
    var touch = touches[0];
    var location = touch.getLocation();
    if (location.x <= this.screenSize.width / 2) {
      this.player.moveLeft();
      this.isTouching = 1;
    } else {
      this.player.moveRight();
      this.isTouching = 2;
      //this.player.jump();
    }
    return true;
  },
  onTouchesEnded: function(touches){
    this.isTouching = 0;
    console.log("!!!");
    //Add a new body/atlas sprite at the touched location
    //var touch = touches[0];
    //var location = touch.getLocation();
    //location = cc.Director.getInstance().convertToGL(location);
    //this.addNewSpriteWithCoords(location);
  }
  //CREATE_NODE(Box2DTestLayer);
});

var Box2DTestScene = TestScene.extend({
    runThisTest:function () {
        var layer = new Box2DTestLayer();
        this.addChild(layer);

        cc.Director.getInstance().replaceScene(this);
    }
});


var Player = cc.Sprite.extend({
  body: null,
  velocity: null,
  
  ctor: function(file) {
    this._super(file);
    this.velocity = new b2Vec2(0, 0);
  },
  createBox2dObject: function(world) {
    var playerBodyDef = new b2BodyDef();
    playerBodyDef.type = b2Body.b2_dynamicBody;
    playerBodyDef.position.Set(this.position.x/PTM_RATIO, this.position.y/PTM_RATIO);
    playerBodyDef.userData = this;
    playerBodyDef.fixedRotation = true;

    var body = world.CreateBody(playerBodyDef);
    this.body = body;
    //console.log(body);
    //var circleShape = new b2CircleShape();
    //circleShape.m_radius = 1;

    var dynamicBox = new b2PolygonShape();
    dynamicBox.SetAsBox(1, 1);//These are mid points for our 1m box
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = dynamicBox;
    fixtureDef.density = 1;
    fixtureDef.friction = 1;
    fixtureDef.restitution = 0;
    body.CreateFixture(fixtureDef);
    //console.log(this.body);
  },
  /*
  draw: function() {
    this._super();
    //console.log(this.body);
    var w = 64;
    var h =64;
    var x = this.position.x-92;
    var y = this.position.y-92;

    //var _point=cc.p(x+w/2,y+h/2);
        //var _size=cc.p(w,h);

        cc.renderContext.lineWidth = 3;
        //cc.renderContext.strokeStyle = "green";
        //cc.renderContext.fillStyle = "rgba(0,255,255,1)";//上下文填充颜色
        cc.renderContext.strokeStyle = "rgba(0,255,0,1)";
        cc.drawingUtil.drawLine(cc.p(x, y), cc.p(x + w, y));
        cc.drawingUtil.drawLine(cc.p(x + w, y), cc.p(x + w, y + h));
        cc.drawingUtil.drawLine(cc.p(x + w, y + h), cc.p(x, y + h));
        cc.drawingUtil.drawLine(cc.p(x, y + h), cc.p(x, y));
        cc.renderContext.lineWidth = 1;
    
  },
  */

  moveLeft: function() {
    //var impulse = new b2Vec2(-4, 0);
    //this.body.ApplyImpulse(impulse, this.body.GetWorldCenter());
    //console.log("mmmmmm",this.body);
    if(!this.body.IsAwake())   
      this.body.SetAwake(true);
    this.velocity.x = -10;
    this.velocity.y = 0;
    this.body.SetLinearVelocity(this.velocity);
                      
  },

  moveRight: function() {
    //var impulse = new b2Vec2(4, 0);
    //this.body.ApplyImpulse(impulse, this.body.GetWorldCenter());		
    //console.log("mmmmmm",this.body);
    if(!this.body.IsAwake())
      this.body.SetAwake(true);
    this.velocity.x = 10;
    this.velocity.y = 0;
    this.body.SetLinearVelocity(this.velocity);
                              
  },

  jump: function() {
    //var impulse = new b2Vec2(0, 15);
    //console.log("jjjjjj",this.body);
    //this.body.ApplyImpulse(impulse, this.body.GetWorldCenter());		    
    this.velocity.y = 30;
    if(!this.body.IsAwake())
      this.body.SetAwake(true);
    this.body.SetLinearVelocity(this.velocity);
  }
});
