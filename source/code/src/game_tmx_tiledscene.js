// an array of the entities in the game
var TAG_SPRITE_MANAGER = 1;
var PTM_RATIO = 32;
var EMPTY_TILE_GID = 64;
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
/*
var Butter = cc.Class.extend({
  this.position;
  this.StartGID;
});
*/

//var entities = new Array();
//var physicsEntities = new Array();
var GameTileLayer = cc.Layer.extend({
  tileMapNode: null,
  _BG: null,
  _player: null,
  //_npc: null,
  _lastEyeX:0,
  _world:null,
  _coin: 0,
  _status: false,

  ctor: function() {
    this._super();
    this.objects = [];

    //道具初始化
    this.flourBag = new Array();
    this.flourBagNum = 0;
    this.corn = new Array();
    this.cornNum = 0;
    this.butter = new Array();
    this.butterNum = 0;
    this.chocoSauce = new Array();
    this.chocoSauceNum = 0;

    this.hardDieLimit = 0;
    this.hardDieStart = 0;

    this.setTouchEnabled(true);
    this.setKeyboardEnabled(true);
    this.gameConfig = new GameConfig();
    var sz = cc.Director.getInstance().getWinSize();
    this.screenSize = sz;

    //this.setupPhysicsWorld();
    
    //this._BG = cc.LayerColor.create(new cc.Color4B(100, 100, 250, 255));
    //this.addChild(this._BG, 0, 99);
    
    this.gameLayer = new GameLayer();
    this.gameLayer.world = this._world;
    this.gameLayer.setPosition(cc.p(0,0));
    this.addChild(this.gameLayer, 1, this.gameConfig.globals.TAG_GAME_LAYER);
    //this.backgroundLayer = new GameBackgroundLayer();
    //this.gameLayer.addChild(this.backgroundLayer, 0, this.gameConfig.globals.TAG_TILE_MAP);
    this.addScrollingBackgroundWithTileMap();
    this.setupCollisionTiles();
    this.setupNPC();
    this.setupPlayer();
    //this.setupBoss();
    //this._BG = cc.LayerColor.create(new cc.Color4B(100, 100, 250, 255));
    //this.gameLayer.addChild(this._BG);
    
    this.controlBarLayer = new ControlBarLayer();
    this.controlBarLayer.parent = this;
    this.controlBarLayer.setPosition(cc.p(0,0));
    this.controlBarLayer.setTarget(this._player);
    this.addChild(this.controlBarLayer, 2, this.gameConfig.globals.TAG_CONTROL_BAR);
    
    //this.headerBar = new HeaderBarLayer("level1");
    //this.headerBar.parent = this;
    //this.moneyStatus = this.headerBar.initMoneyStatus();
    //this.headerBar.delegateTimesUp(this.gameOver.bind(this));

    //this.addChild(this.headerBar, 2, this.gameConfig.globals.TAG_HEADER_BAR);
    this.setupMission();

    this.scheduleUpdate();
  },
  setupMission: function() {
    var saveData = GameSave.getInstance();  
    //console.log(saveData);
    switch(saveData.level) {
      case 1:
        var hids = new Array();
        var story = new Array();
        var obj = new Object();
        obj.id = 1;
        obj.say = "正妹 : \n走吧~出發了～跟緊我~別跟丟了";
        story.push(obj);
        
        obj = new Object();
        obj.id = 0;
        obj.say = "歐大 : \n好啦好啦...";
        
        story.push(obj);
        var popup = new GamePopupLayer(story,false,true);
        popup.parent = this;
        this.gameLayer.addChild(popup, 99, this.gameConfig.globals.TAG_POPUP);
        this.popup = popup;
        //this.NPCS
      break;
      case 2:
        var story = new Array();
        var obj = new Object();
        obj.id = 1;
        obj.say = "正妹 : \n趕快趕路吧快來不及了...........";
        story.push(obj);
        var popup = new GamePopupLayer(story,false,true);
        popup.parent = this;
        this.gameLayer.addChild(popup, 99, this.gameConfig.globals.TAG_POPUP);
        this.popup = popup;
      break;
      case 3:
        
      break;
    }        
  },

  setupPhysicsWorld: function() {
    /*
    //var gravity = new b2Vec2(0, -60);//重力
    var gravity = new b2Vec2(0, -100);//重力
    var doSleep = true;
    this._world = new b2World(gravity, doSleep);//有重力的物理世界
    this._world.SetContinuousPhysics(true);//設定為連續物理模擬

    
    var debugDraw = new b2debugDraw();
    debugDraw.SetSprite(cc.renderContext);
    var screenSize = cc.Director.getInstance().getVisibleSize();
    //console.log("xx=",screenSize.width);
    debugDraw.SetDrawScale(PTM_RATIO);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1);
    debugDraw.SetFlags(b2debugDraw.e_shapeBit);
    this._world.SetDebugDraw(debugDraw);
    

    this._listener = new ContactListener();
    var that = this;
    this._listener.BeginContact = function(contact) {
      //console.log(contact.GetFixtureA().GetBody().gametype,contact.GetFixtureB().GetBody().gametype);
      var a = contact.GetFixtureA().GetBody();
      var b = contact.GetFixtureB().GetBody();
      if ((a.gametype == 'PLAYER' && b.gametype == 'BOSS')
        || (a.gametype == 'BOSS' && b.gametype == 'PLAYER')
        || (a.gametype == 'PLAYER' && b.gametype == 'NPC')
        || (a.gametype == 'NPC' && b.gametype == 'PLAYER')
        ) {
        if(that._player.hardDie) {//無敵星星
          //NPC Die
          //console.log(a.parent,b.parent);
          if(a.gametype=="NPC"||a.gametype == 'BOSS' )
            a.parent.die();
          if(b.gametype=="NPC"||b.gametype == 'BOSS' )
            b.parent.die();
        } else {
          if(!that._player.scaleUp&&!that._player.changing)
            that.gameOver();//Game Over
          else
            that._player.setNormalState();//人物變小
        }
      }
      if((a.gametype == 'NPC' && b.gametype == 'pBULLET')
        ||(a.gametype == 'pBULLET' && b.gametype == 'NPC')
        ||(a.gametype == 'BOSS' && b.gametype == 'pBULLET')
        ||(a.gametype == 'pBULLET' && b.gametype == 'BOSS')
        ) {
        if(a.gametype == 'pBULLET') {
          a.parent.destroy();
        }
        if(b.gametype == 'pBULLET') {
          b.parent.destroy();
        }
        if(a.gametype == 'NPC'||a.gametype == 'BOSS') {
          a.parent.die();
        }
        if(b.gametype == 'NPC'||b.gametype == 'BOSS') {
          b.parent.die();
        }

      }
       if((a.gametype == 'PLAYER' && b.gametype == 'eBULLET')
        ||(a.gametype == 'eBULLET' && b.gametype == 'PLAYER')
        ) {
        console.log("pppppp",a.gametype,b.gametype);
        if(a.gametype == 'eBULLET') {
          a.parent.destroy();
        }
        if(b.gametype == 'eBULLET') {
          b.parent.destroy();
        }
        if(a.gametype == 'PLAYER') {
          if(!that._player.scaleUp&&!that._player.changing)
            that.gameOver();//Game Over
          else
            that._player.setNormalState();//人物變小
        }
        if(b.gametype == 'PLAYER') {
          if(!that._player.scaleUp&&!that._player.changing)
            that.gameOver();//Game Over
          else
            that._player.setNormalState();//人物變小
        }

      }
      //子彈與場景碰撞
      if((a.gametype == 'WALL' && b.gametype == 'eBULLET')
           || (a.gametype == 'eBULLET' && b.gametype == 'WALL')
           || (a.gametype == 'WALL' && b.gametype == 'pBULLET')
           || (a.gametype == 'pBULLET' && b.gametype == 'WALL')
           || (a.gametype == 'eBULLET' && b.gametype == 'pBULLET')
           || (a.gametype == 'pBULLET' && b.gametype == 'eBULLET')
        ) {
        if(a.gametype == 'eBULLET'||a.gametype == 'pBULLET') {
          a.parent.destroy();
        }
        if(b.gametype == 'eBULLET'||b.gametype == 'pBULLET') {
          b.parent.destroy();
        }
      }
      if(a.gametype == 'eBULLET') {
          a.parent.destroy();
      }
      if(b.gametype == 'eBULLET' ) {
          b.parent.destroy();
      }
    }
    this._world.SetContactListener(this._listener);
    */
  },

  setupPlayer: function() {
    cc.SpriteFrameCache.getInstance().addSpriteFrames(s_PlayerPlist);
    var mgr = cc.SpriteBatchNode.create(s_PlayerMotion);
    var player = new GamePlayer();
    player.parent = this;
    player.setAnchorPoint(0.5, 0.5);
    //player.position = cc.p(50, 1200);
    //player.position = cc.p(32*6+16,64+16);
    var saveData = GameSave.getInstance();  
    //console.log(saveData);
    switch(saveData.level) {
      case 1:
      player.setPosition(32*8+16,32*3+16);
      break;
      case 2:
      player.setPosition(32*3+16,32*15+16);
      break;
      case 3:
      if(saveData.pos.x!=0&&saveData.pos.y!=0)
        player.setPosition(saveData.pos.x,saveData.pos.y);
      else
        player.setPosition(32*1+16,32*1+16);
      break;
      case 4:
      player.setPosition(32*2+16,32*1+16); 
      break;
    }
    //player.createBox2dObject(this._world);
    this.gameLayer.addChild(player,99, this.gameConfig.globals.TAG_PLAYER);
    this._player = player;
  },

  setupBoss: function() {
    /*
    //cc.SpriteFrameCache.getInstance().addSpriteFrames(s_BossMonsterPlist);
    // var bossMgr = cc.SpriteBatchNode.create(s_BossMonsterMotion);
    var boss = new GameBoss(cc.p(1350,400));
    boss._layer = this.gameLayer;
    //boss.position = cc.p(1500,400);
    //boss.basePosition = boss.position;
    boss.setAnchorPoint(0.5, 0.5);
    boss.createBox2dObject(this._world);
    this.boss = boss;
    this.gameLayer.addChild(boss, 99, this.gameConfig.globals.TAG_NPC);
    */
  },

  setupNPC: function() {
    var map = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    var layer = map.getLayer("npc");
    if(!layer)
      return;
    cc.SpriteFrameCache.getInstance().addSpriteFrames(s_NPC1Plist);
    var mgr = cc.SpriteBatchNode.create(s_NPC1Motion);
    cc.SpriteFrameCache.getInstance().addSpriteFrames(s_NPC2Plist);
    mgr = cc.SpriteBatchNode.create(s_NPC2Motion);
    cc.SpriteFrameCache.getInstance().addSpriteFrames(s_NPC98Plist);
    var mgr = cc.SpriteBatchNode.create(s_NPC98Motion);
    cc.SpriteFrameCache.getInstance().addSpriteFrames(s_NPC99Plist);
    mgr = cc.SpriteBatchNode.create(s_NPC99Motion);
    
    this.NPCS = new Array();
    var mapSize = layer.getLayerSize();
    for (var i = 0 ; i < mapSize.width ; i++) {
      for (var j = 0; j < mapSize.height ; j++) {
        var GID = layer.getTileGIDAt(cc.p(i,j));
        if(GID) {
          //console.log("!!!!!!!!",i,j,GID,map.propertiesForGID(GID));
          var obj = map.propertiesForGID(GID);
          //console.log("!!!!",obj.npcid);
          if(obj) {
            var x = i * map.getTileSize().width+16;
            var y = (map.getMapSize().height * map.getTileSize().height) - j * map.getTileSize().height;
            var position = cc.p(x,y);
            var npc = new GameNPC(obj.npcid);
            this.NPCS.push(npc);
            npc.parent = this;
            npc.setAnchorPoint(0.5, 0.5);    
            //npc.setPosition(32*6+16,32*3+16);
            npc.setPosition(x,y);
            this.gameLayer.addChild(npc, 99, this.gameConfig.globals.TAG_NPC);
            /*
            cc.renderContext.lineWidth = 3;
            cc.renderContext.fillStyle = "rgba(0,0,0,1)";
            cc.renderContext.strokeStyle = "rgba(0,255,0,1)";
            this._radians = 360;
            cc.drawingUtil.drawCircle(position, 5, cc.DEGREES_TO_RADIANS(this._radians), 60, true);
            cc.renderContext.lineWidth = 1;                             
            */
            //if(tileProperties == "{\"npcid\":\"1\"}") {
            //}
          }
        }
      }
    }
    /*
    //======================= New NPC =======================
    cc.SpriteFrameCache.getInstance().addSpriteFrames(s_NPC1Plist);
    var mgr = cc.SpriteBatchNode.create(s_NPC1Motion);
    var NPC = new GameNPC();
    NPC.parent = this;
    NPC.setAnchorPoint(0.5, 0.5);   
    NPC.setPosition(32*6+16,32*3+16);
    this.gameLayer.addChild(NPC, 99, this.gameConfig.globals.TAG_NPC);
    var saveData = GameSave.getInstance();
    //console.log(saveData);
    switch(saveData.level) {
      case 1:
        //var npc = new GameNPC();
        
      break;
      case 2:
      break;
      case 3:
      break;
      case 4:
      break;
    }
    */        
  },

  addScrollingBackgroundWithTileMap: function() {
    var tileMapNode = new GameTileMap();
    this.tileMapNode = tileMapNode;
    var saveData = GameSave.getInstance();
    //console.log(saveData);
    switch(saveData.level) {
      case 1:
      tileMapNode.initWithTMXFile(this.gameConfig.maps.level1.filename);
      cc.AudioEngine.getInstance().playMusic(s_scene1mp3,true);
      break;
      case 2:
      tileMapNode.initWithTMXFile(this.gameConfig.maps.level2.filename);
      cc.AudioEngine.getInstance().playMusic(s_scene2mp3,true);
      //console.log(this.gameConfig.maps.level2.filename);
      break;
      case 3:
      tileMapNode.initWithTMXFile(this.gameConfig.maps.level3.filename);
      cc.AudioEngine.getInstance().playMusic(s_scene3mp3,true);
      //console.log(this.gameConfig.maps.level3.filename);
      break;
      case 4:
      tileMapNode.initWithTMXFile(this.gameConfig.maps.level4.filename);
      //console.log(this.gameConfig.maps.level4.filename);
      break;
                  
    }
    //tileMapNode.setAnchorPoint(0.5, 0.5);
    tileMapNode.setPosition(0,0);
    this.gameLayer.addChild(tileMapNode, 0, this.gameConfig.globals.TAG_TILE_MAP);
    //this.loadItems();

  },

  setupCollisionTiles: function() {
    //console.log(this.tileMapNode);
    /*
    if(!this.tileMapNode)
      return;
    var group = this.tileMapNode.getObjectGroup("Wall");
    if(group) {
      var objs = group.getObjects();
      var x, y, w, h;
      for (var i in objs) {
        x = objs[i].x;
        y = objs[i].y;
        w = objs[i].width;
        h = objs[i].height;
        var _point=cc.p(x+w/2,y+h/2);
        var _size=cc.p(w,h);
        this.makeBox2dObjAt(_point, _size, 0.3, 1, 0, -1);
      }
    }
    */
  },

  makeBox2dObjAt: function(p, size, f, dens, rest, boxid) {
    /*
    var sprite = cc.Sprite.create();
    var bodyDef = new b2BodyDef();
    //if(d)
    //  bodyDef.type = b2_dynamicBody;
    bodyDef.position.Set(p.x/PTM_RATIO, p.y/PTM_RATIO);

    sprite.setPosition(p.x, p.y);

    bodyDef.userData = sprite;
    var body = this._world.CreateBody(bodyDef);
    body.gametype = "WALL";
    var dynamicBox = new b2PolygonShape();
    //console.log(size);
    dynamicBox.SetAsBox(size.x/2/PTM_RATIO, size.y/2/PTM_RATIO);//These are mid points for our 1m box

    // Define the dynamic body fixture.
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = dynamicBox;
    fixtureDef.density = dens;//密度
    fixtureDef.friction = f;//摩擦力
    fixtureDef.restitution = rest;//彈性
    body.CreateFixture(fixtureDef);
    this.addChild(sprite);
    */
  },
  
  draw: function() {
    this._super();
    //this._world.DrawDebugData();
    cc.renderContext.lineWidth = 3;
    cc.renderContext.fillStyle = "rgba(0,0,0,1)";
    cc.renderContext.strokeStyle = "rgba(0,255,0,1)";

    //if (this._radians < 0)
    this._radians = 360;
    //console.log(this.tp);
    if(this.tp)
    cc.drawingUtil.drawCircle(this.tp, 5, cc.DEGREES_TO_RADIANS(this._radians), 60, true);

    //this._super();
    //this._world.DrawDebugData();
    //console.log("XXXXXXXXX");
     //cc.renderContext.lineWidth = 3;
     //cc.renderContext.strokeStyle = "rgba(0,255,0,1)";
     //cc.drawingUtil.drawLine(cc.p(100, 100), cc.p(200, 200));

    //console.log("DDDDDDDDDDDDDDDDDDDDDDDDD");
    //if(!this.tileMapNode)
    // return;
    /*
    var group = this.tileMapNode.getObjectGroup("Wall");
    if(group) {
      var objs = group.getObjects();
      //console.log(objs);
      var x, y, w, h;
      for (var i in objs) {
        x = objs[i].x;
        y = objs[i].y;
        //x = 0;
        //y = 0;
        w = objs[i].width;
        h = objs[i].height;
        //console.log(x,y,w,h);
        //var _point=cc.p(x+w/2,y+h/2);
        //var _size=cc.p(w,h);
        cc.renderContext.lineWidth = 3;
        //cc.renderContext.fillStyle = "rgba(255,255,255,1)";//上下文填充颜色
        cc.renderContext.strokeStyle = "rgba(0,255,0,1)";
        cc.drawingUtil.drawLine(cc.p(x, y), cc.p(x + w, y));
        cc.drawingUtil.drawLine(cc.p(x + w, y), cc.p(x + w, y + h));
        cc.drawingUtil.drawLine(cc.p(x + w, y + h), cc.p(x, y + h));
        cc.drawingUtil.drawLine(cc.p(x, y + h), cc.p(x, y));
        cc.renderContext.lineWidth = 1;
      }
    }
    */

  },
  /*
  // Keyboard handling
  onKeyUp:function(e){
    this._player.setIdle(e);
  },

  onKeyDown:function(e){
    this._player.handleKey(e);
  },
  */

  // make a player, initialize, add to layer
  initPlayer: function(){
    // test animaiton on player
    var actionTo = cc.MoveTo.create(5, cc.p(1024, 32));
    this.player.runAction(actionTo);
  },
  
  tileCoordForPosition: function(p) {
    var map = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    var tileSize = map.getTileSize();
    var mapSize = map.getMapSize();
    var x = Math.floor(p.x / tileSize.width);
    var y = Math.floor(((mapSize.height* tileSize.height) - p.y) / tileSize.height);
    return cc.p(x,y);
  },
  
  checkCollision: function(p) {
    this.tp = p;
    //console.log(this.tp);
    var map = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    var tileCoord = this.tileCoordForPosition(p);
    //console.log(tileCoord);
    if(p.x<0||tileCoord.x> map.getMapSize().width-1||tileCoord.y<0||tileCoord.y>map.getMapSize().height-1)
      return false;
    var layer = map.getLayer("meta");
    if(!layer)
      return false;
    var GID = layer.getTileGIDAt(tileCoord);
    if(GID) {
      //console.log(GID);
      return true;
    }
    this.checkExit(p);
    return false;
  },
  
  getItemTileInfo: function(p) {
    var map = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    var tileCoord = this.tileCoordForPosition(p);
    if(p.x<0||tileCoord.x> map.getMapSize().width-1||tileCoord.y<0||tileCoord.y>map.getMapSize().height-1)
      return;
    var layer = map.getLayer("item");
    if(!layer)
      return;
    var GID = layer.getTileGIDAt(tileCoord);
    if(GID) {
      //console.log(GID);
      var obj = map.propertiesForGID(GID);
      return obj;
    }
                                                                     
  },
                                                                       
  
  getNPCTileInfo: function(p) {
    var map = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    var tileCoord = this.tileCoordForPosition(p);
    if(p.x<0||tileCoord.x> map.getMapSize().width-1||tileCoord.y<0||tileCoord.y>map.getMapSize().height-1)
      return;
    var layer = map.getLayer("npc");
    if(!layer)
      return; 
    var GID = layer.getTileGIDAt(tileCoord);
    if(GID) {
      //console.log(GID);
      var obj = map.propertiesForGID(GID);
      return obj;
    }
  },
  
  checkExit: function(p) {
    var map = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    var tileCoord = this.tileCoordForPosition(p);
    if(p.x<0||tileCoord.x> map.getMapSize().width-1||tileCoord.y<0||tileCoord.y>map.getMapSize().height-1)
      return;
    var layer = map.getLayer("exit");
    if(!layer)
      return;
    var GID = layer.getTileGIDAt(tileCoord);
    if(GID && !this.transiting) {
      //console.log(GID);
      this.transiting = true;
      var saveData = GameSave.getInstance();
      saveData.level++;
      this.goNextLevel(saveData.level);
    }
  },
  
  goNextLevel: function(lv) {
    console.log(lv);
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameLevelScene()));    
  },
  
  checkSomething: function() {
    /*
    var tileMap = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    //var tileMap = this.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    if(!tileMap)
      return;
    var tileMapPos = tileMap.getPosition();
    var tileSize = tileMap.getTileSize();
    var mapSize = tileMap.getMapSize();
    var layer = tileMap.getLayer("meta");
    var playerPosition = this._player.getPosition();

    //console.log(this._player.getContentSize().width);
    //console.log(playerPosition.x);
    var tileI = Math.floor(playerPosition.x / tileSize.width);
    var tileJ = Math.floor(((mapSize.height * tileSize.height) - playerPosition.y+32) / tileSize.height);
    //console.log(tileI,tileJ);
    //console.log(tileJ);
    //if(this._player.scaleUp) {
    //  tileI = tileI + 1;
    //  tileJ = tileJ + 1;
    //}
    if(!layer)
      return;
    // Tiled Map space coordinates. Start at top left, 0,0
    var tileCoord = cc.p(tileI, tileJ);
    //console.log(tileCoord,mapSize);
    if(tileI<0||tileI>=mapSize.width) {
      //console.log(tileI,"gameOver I");
      //this.gameOver();
      return;
    }
    if((mapSize.height-tileJ)<=0||(mapSize.height-tileJ)>=mapSize.height) {
      //if(mapSize.height-tileJ<=0) {
        //console.log(tileJ,mapSize.height,"gameOver J",(mapSize.height-tileJ));
        //this.gameOver();
      //}
      return;
    }

    var GID = layer.getTileGIDAt(tileCoord);
    if(GID) {
      //console.log("GID=",GID);
       this._player.stopMoving = true;
    }
    else
    {
      this._player.stopMoving = false;
    }
    */
    //var tileProperties = JSON.stringify(tileMap.propertiesForGID(GID));
    /*
    //console.log("tileProperties=",tileProperties);

    //console.log(tileProperties);
    if(tileProperties && !this._player.die) {
      //if(tileProperties == "{\"type\":\"coin\"}") {
      //  console.log("getGoin");
      //  this.collectItemAtPoint(tileCoord);
      //}
      if(tileProperties == "{\"type\":\"coin\"}") {
        //console.log("getGoin");
        this.collectItemAtPoint(tileCoord);
      }

      if(tileProperties == "{\"type\":\"exit\"}") {
        //console.log("gameSuccess");
        this.gameSuccess();
      }

      if(tileProperties == "{\"type\":\"flourBag\"}") {
        console.log("hugePlayerEffect");
        this.hugePlayerEffect(tileCoord);
      }

      if(tileProperties == "{\"type\":\"corn\"}") {
        //console.log("getBullet");
        this.getCornBullet(tileCoord);
      }

      if(tileProperties == "{\"type\":\"butter\"}") {
        //console.log("getBullet");
        this.hardDie(tileCoord);
      }

      if(tileProperties == "{\"type\":\"chocoSauce\"}") {
        //console.log("getBullet");
        this.freeze(tileCoord);
      }
    }
    */
    
  },

  //吃金幣
  collectItemAtPoint:function(point) {
    //cc.log("collectItem()");
    this._coin++;
    var map = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    var layer = map.getLayer("Layer 0");
    //var existingGID = layer.getTileGIDAt(point);
    //cc.log("ORB GID " + existingGID);
    layer.setTileGID(EMPTY_TILE_GID, point);
    //console.log(this._coin);
    this.moneyStatus.setScore(this._coin);
  },

  //吃麵粉袋變大隻視效
  hugePlayerEffect:function(point) {
    //先對場景中的tile物件作隱藏
    var map = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    var layer = map.getLayer("Layer 0");
    layer.setTileGID(EMPTY_TILE_GID, point);

    //再觸發隱藏真實的物件
    for(var i = 0 ; i < this.flourBag.length ; i++) {
      if(point.x === this.flourBag[i].tag.x && point.y === this.flourBag[i].tag.y) {
        this.flourBag[i].setHide();
      }
    }

    //變大視效
    this._player.setScaleUp(0,0.55);
  },

  //吃到玉米粒得到玉米子彈
  getCornBullet:function(point) {
    //先對場景中的tile物件作隱藏
    var map = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    var layer = map.getLayer("Layer 0");
    layer.setTileGID(EMPTY_TILE_GID, point);

    //再觸發隱藏真實的物件
    for(var i = 0 ; i < this.corn.length ; i++) {
      if(point.x === this.corn[i].tag.x && point.y === this.corn[i].tag.y) {
        this.corn[i].setHide();
      }
    }

    //得到子彈視效
    this._player.equipBullet(this.gameLayer);
  },

  //吃到奶油變成無敵
  hardDie:function(point) {
    //先對場景中的tile物件作隱藏
    var map = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    var layer = map.getLayer("Layer 0");
    layer.setTileGID(EMPTY_TILE_GID, point);

    //再觸發隱藏真實的物件
    for(var i = 0 ; i < this.butter.length ; i++) {
      if(point.x === this.butter[i].tag.x && point.y === this.butter[i].tag.y) {
        this.butter[i].setHide();
      }
    }

    //無敵視效
    this._player.setHardDieState();
    //開始計算有效時間
    this.hardDieStart = this.headerBar.getElapsedTime();
  },

  //吃到巧克力醬獲得凝固能力
  freeze:function(point) {
    //先對場景中的tile物件作隱藏
    var map = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    var layer = map.getLayer("Layer 0");
    layer.setTileGID(EMPTY_TILE_GID, point);

    //再觸發隱藏真實的物件
    for(var i = 0 ; i < this.chocoSauce.length ; i++) {
      if(point.x === this.chocoSauce[i].tag.x && point.y === this.chocoSauce[i].tag.y) {
        this.chocoSauce[i].setHide();
      }
    }

    //凝固能力視效
  },

  //遊戲失敗結束
  gameOver: function() {
    if(this._status)
      return;
    console.log(this.level + ' gameOver!!,  elapsed:'+ this.headerBar.getElapsedTime() +',   money: '+ this.moneyStatus.getScore());
    //死掉人物淡出
    this._player.setDieState();
    //切到GAME OVER SCENE
    this.scheduleOnce(this.showFail, 2);
    this._status = true;
  },

  //遊戲成功結束
  gameSuccess: function() {
    if(this._status)
      return;
    //cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameMenuScene()));
    console.log(this.level + ' gameSuccess!!,  elapsed:'+ this.headerBar.getElapsedTime()
      + ',   money: '+this.moneyStatus.getScore()) ;

    this._player.playWinEffect();
    this.scheduleOnce(this.showSuccess, 3);
    this._status = true;
  },

  //
  showFail: function() {
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(3, GameResultLayer.failScene({
      level: this.level,
      elapsed:  this.headerBar.getElapsedTime(),
      money: this._coin
    })));

  },
  //顯示過關資訊
  showSuccess: function() {
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(3, GameResultLayer.successScene({
      level: this.level,
      elapsed:  this.headerBar.getElapsedTime(),
      money: this._coin
    })));
  },

  updateRender: function(dt) {
    //this.checkSomething();
    //if(this._npc)
    //  this._npc.updateRender();
    //if(this._player)
    //  this._player.updateRender();
  },
  loadNPC: function() {
    /*
    var map = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    var layer = map.getLayer("Fight");
    var mapSize = layer.getLayerSize();
    for (var i = 0 ; i < mapSize.width ; i++) {
      for (var j = 0; j < mapSize.height ; j++) {
        var GID = layer.getTileGIDAt(cc.p(i,j));
        var tileProperties = JSON.stringify(map.propertiesForGID(GID));
        if(tileProperties) {
          var x = i * map.getTileSize().width;
          var y = (map.getMapSize().height * map.getTileSize().height) - j * map.getTileSize().height;
          var position = cc.p(x,y);
          if(tileProperties == "{\"type\":\"BOSS\"}") {
            
          }
        }                
      }
    }
    */
  },

  //Load道具
  loadItems: function () {
    /*
    var map = this.gameLayer.getChildByTag(this.gameConfig.globals.TAG_TILE_MAP);
    var layer = map.getLayer("Layer 0");
    var mapSize = layer.getLayerSize();
    for (var i = 0 ; i < mapSize.width ; i++) {
      for (var j = 0; j < mapSize.height ; j++) {
        var GID = layer.getTileGIDAt(cc.p(i,j));
        var tileProperties = JSON.stringify(map.propertiesForGID(GID));
        if(tileProperties) {
          var x = i * map.getTileSize().width;
          var y = (map.getMapSize().height * map.getTileSize().height) - j * map.getTileSize().height;
          var position = cc.p(x,y);

          //麵粉袋
          if(tileProperties == "{\"type\":\"flourBag\"}") {
            var tempFlourBag = new GameItem(this.gameConfig.items.flourBag, position, this.flourBagNum, cc.p(i,j));
            this.flourBagNum++;
            this.flourBag[this.flourBagNum - 1] = tempFlourBag;
            delete tempFlourBag;
            this.gameLayer.addChild(this.flourBag[this.flourBagNum - 1], 98);
          }
          //玉米
          else if(tileProperties == "{\"type\":\"corn\"}") {
            var tempCorn = new GameItem(this.gameConfig.items.corn, position, this.cornNum, cc.p(i,j));
            this.cornNum++;
            this.corn[this.cornNum - 1] = tempCorn;
            delete tempCorn;
            this.gameLayer.addChild(this.corn[this.cornNum - 1], 98);
          }
          //奶油
          else if(tileProperties == "{\"type\":\"butter\"}") {
            var tempButter = new GameItem(this.gameConfig.items.butter, position, this.butterNum, cc.p(i,j));
            this.butterNum++;
            this.butter[this.butterNum - 1] = tempButter;
            delete tempButter;
            this.gameLayer.addChild(this.butter[this.butterNum - 1], 98);
          }
          //巧克力醬
          else if(tileProperties == "{\"type\":\"chocoSauce\"}") {
            var tempChocoSauce = new GameItem(this.gameConfig.items.chocoSauce, position, this.chocoSauceNum, cc.p(i,j));
            this.chocoSauceNum++;
            this.chocoSauce[this.chocoSauceNum - 1] = tempChocoSauce;
            delete tempChocoSauce;
            this.gameLayer.addChild(this.chocoSauce[this.chocoSauceNum - 1], 98);
          }
        }
      }
    }
    */
  },

  // update every frame of the game
  update:function (dt) {
    //It is recommended that a fixed time step is used with Box2D for stability
    //of the simulation, however, we are using a variable time step here.
    //You need to make an informed choice, the following URL is useful
    //http://gafferongames.com/game-physics/fix-your-timestep/
    
    /*
    //抓取Player是否發射子彈
    if(this._player.hitBullet) {
      if(this._player.isGoing) {
        var tempBullet = new GameBullet(this.gameConfig.items.cornBullet, cc.p(this._player.getPosition().x + 20, this._player.getPosition().y));
      }
      else {
        var tempBullet = new GameBullet(this.gameConfig.items.cornBullet, cc.p(this._player.getPosition().x - 20, this._player.getPosition().y));
      }
      tempBullet.setAnchorPoint(0.5, 0.5);
      tempBullet.createBox2dObject(this._world);
      tempBullet.launch(this._player.isGoing);
      this.gameLayer.addChild(tempBullet,99);
    }
    */


    //吃到無敵奶油呈現無敵 超過時間恢復正常
    //if(this._player.hardDie) {
    //  if(this.headerBar.getElapsedTime() - this.hardDieStart > this.gameConfig.hardDieTime) {
    //    this._player.setNormalState();
    //  }
    //}

    /*
    var velocityIterations = 8;
    var positionIterations = 1;

    // Instruct the world to perform a single step of simulation. It is
    // generally best to keep the time step and iterations fixed.
    this._world.Step(dt, velocityIterations, positionIterations);
    //this._world.DrawDebugData();

    //Iterate over the bodies in the physics world
    for (var b = this._world.GetBodyList(); b; b = b.GetNext()) {
      if (b.GetUserData() != null) {
        //Synchronize the AtlasSprites position and rotation with the corresponding body
        var myActor = b.GetUserData();
        myActor.setPosition(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO);
        //myActor.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
       // console.log(b.GetAngle());
      }
    }
    */
    //this.updateRender(dt);
  },

});


// Use this to create different levels / areas on a map
var GameLevelScene = cc.Scene.extend({
  ctor:function () {
    this._super();
    var layer = new GameTileLayer();
    layer.init();
    this.addChild(layer,0);
    var saveData = GameSave.getInstance();
    //console.log(saveData.level);
  }

  // not currently used. fix this up to make it easy to launch any level
  /*
  initWithLevelName:function (levelName) {
    var map = new GameTileMap();
    console.log("levelName=",levelName);
    map.initWithTMXFile(levelName);
    map.setPosition(cc.p(0,0));
    this.addChild(map, 0, this.gameConfig.globals.TAG_TILE_MAP);
  }
  */
});

