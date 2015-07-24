/*
 * GameBullet.js
 */
//===========================================================================================
var PTM_RATIO = 32;
/*
var b2Vec2 = Box2D.Common.Math.b2Vec2
  , b2BodyDef = Box2D.Dynamics.b2BodyDef
  , b2Body = Box2D.Dynamics.b2Body
  , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
  , b2World = Box2D.Dynamics.b2World
  , b2debugDraw = Box2D.Dynamics.b2DebugDraw
  , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
  , ContactListener = Box2D.Dynamics.b2ContactListener
  , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
*/
//===========================================================================================
var GameBullet = cc.Sprite.extend({
  isEnemy: false,
  _needDestroyBody: false,
  //dx: 4,

  ctor: function(Config,pos,enemy) {
    cc.log("GameBullet ctor()");
    this._super();
    this.bulletConfig = Config;
    this.position = pos;
    this.isLaunch = false;
    this.isCollision = false;
    this.init();
    this.isFront = true;
    this.isEnemy = enemy;

    return this;
  },

  init: function() {
    //initial item
    this.initWithTexture(this.bulletConfig.texture, this.bulletConfig.textureRect);

    //set Scale
    this.setScale(this.bulletConfig.textureSize);

    //Set Position
    this.setPosition(cc.p(this.position.x, this.position.y));

    //Set Show items
    this.setShow();

    this.bullet = true;

    //Schedule Update
    this.scheduleUpdate();
  },

  createBox2dObject: function(world) {

    var playerBodyDef = new b2BodyDef();
    playerBodyDef.type = b2Body.b2_dynamicBody;
    //console.log(this.position);
    this.csize = this.getContentSize();
    playerBodyDef.position.Set(this.position.x/PTM_RATIO, this.position.y/PTM_RATIO);
    //playerBodyDef.position.Set(0, 0);
    playerBodyDef.userData = this;
    //playerBodyDef.gametype = "BOSS";
    //console.log(playerBodyDef);
    var csize = this.getContentSize();

    playerBodyDef.fixedRotation = true;

    var body = world.CreateBody(playerBodyDef);
    if(this.isEnemy)
      body.gametype = "eBULLET";
    else
      body.gametype = "pBULLET";
    this.body = body;

    this.xPos = this.body.GetPosition().x;
    //var circleShape = new b2CircleShape();
    //circleShape.m_radius = 1;
    var dynamicBox = new b2PolygonShape();
    //dynamicBox.SetAsBox(1, 1);//These are mid points for our 1m box
    //console.log(this);
    dynamicBox.SetAsBox(this.csize.width/2/PTM_RATIO, this.csize.height/2/PTM_RATIO);
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = dynamicBox;
    fixtureDef.density = 1;//密度
    fixtureDef.friction = 1;//摩擦
    fixtureDef.restitution = 0;//彈性
    fixtureDef.isSensor = false;   // 对象之间有碰撞检测但是又不想让它们有碰撞反应
    body.CreateFixture(fixtureDef);
    body.parent = this;
    this._world = world;
  },

  launch: function(type){
    this.isFront = type;
    //console.log(this.isFront);
    this.isLaunch = true;
    this.isCollision = false;
  },

  moveRight: function() {
    var vel = this.body.GetLinearVelocity();
    vel.x = 7;
    vel.y = 1.7;
    this.body.SetLinearVelocity( vel );
  },

  moveLeft: function() {
    var vel = this.body.GetLinearVelocity();
    vel.x = -7;
    vel.y = 1.7;
    this.body.SetLinearVelocity( vel );
  },

  setShow: function() {
    this.setVisible(true);
  },

  setHide: function() {
    this.setVisible(false);
    this.isCollision = true;
  },

  destroy: function() {
    console.log("destroy()");
    this.isCollision = true;
    this.stopAllActions();
    //var sz = cc.Director.getInstance().getWinSize();
    this._needDestroyBody = true;
  },
  doDestroyBody: function() {
    this._world.DestroyBody(this.body);
    this.removeFromParent();
  },

  update:function() {
    if(this.isLaunch) {
      if(!this.isCollision) {
        if(this.isFront)
          this.moveRight();
        else
          this.moveLeft();
      }
      else {

      }
    }
    if(this._needDestroyBody)
      this.doDestroyBody();
  },

});
