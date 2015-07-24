var TG = {};
TG.MUTE = false ;

var GameConfig = cc.Class.extend({

  ctor:function (filename) {
    var mapSize = cc.Director.getInstance().getWinSize();
    this.npcNum = 0;
    this.hardDieTime = 10;
    this.player = {
      "baseTextureRect":cc.rect(0, 0, 32, 32),
      "startPosition":cc.p(0, 0),
      "hitbox":cc.rect(17,8,44,59),
      "centerOffset":cc.p(16,16),
      "baseSpeed":1,
      "maxVelocity":7,
      "baseAccelleration":1,
      "startingMovementDirection":null,
      "startingRenderDirection":"right"
    };


    this.maps = {
      level1:{
        "filename":"res/tilemaps/room.tmx",
        "position":cc.p(1,1)
      },
      level2: {
        "filename":"res/tilemaps/town.tmx",
        "position": cc.p(1,1)
      },
      level3: {
        "filename":"res/tilemaps/town1.tmx",
        "position": cc.p(1,1)
      },
      level4: {
        "filename":"res/tilemaps/town2.tmx",
        "position": cc.p(1,1)
      }
                            
                            
    };

    this.globals = {
      "MSG_LAYER_TOUCHED": 1,
      "MSG_PLAYER_MOVED": 2,
      "MSG_MAP_TOUCHED": 3,
      "MSG_INPUT_CHANGED": 4,
      "MSG_TIME_OVER": 5,
      "TAG_TILE_MAP": 1,
      "TAG_MEDIATOR": 2,
      "TAG_PLAYER": 3,
      "TAG_CAMERA": 4,
      "TAG_TIMER": 5,
      "TAG_TIMER_TEXT": 6,
      "TAG_HUDLAYER": 7,
      "TAG_SCORE": 8,
      "TAG_CUSTOMER": 9,
      "TAG_SIGN": 10,
      "TAG_GAME_LAYER": 11,
      "TAG_MENU_BACKGROUND": 12,
      "TAG_MENU_TITLE": 13,
      "TAG_CAR_ENTITY": 14,
      "TAG_CONTROL_BAR": 15,
      "TAG_HEADER_BAR": 16,
      "TAG_NPC": 17,
      "TAG_POPUP": 18
    };

    this.score = {
      "position":cc.p(200,440),
      "alignment":cc.TEXT_ALIGNMENT_LEFT
    };

    this.headerbar = {
      "scaleHeight": 10,
      "menu": {
        "offsetWidth": 100,
        "offsetHeight": 40,
        "exitNormal": cc.Sprite.create(s_MenuExit, cc.rect(0, 0, 49, 50)),
        "exitSelected": cc.Sprite.create(s_MenuExit, cc.rect(51, 0, 49, 50)),
        "pauseNormal": cc.Sprite.create(s_MenuPause, cc.rect(0, 0, 64, 64)),
        "pauseSelected": cc.Sprite.create(s_MenuPause, cc.rect(0, 0, 64, 64))
      },
      "moneyScore": {
        "iconTexture": cc.TextureCache.getInstance().addImage(s_DollarSign),
        "iconTextureRect": cc.rect(0, 0, 48, 48),
        "iconPosition": cc.p(5,5),
        "textFont":"DejaVuSansMono",
        "textSize": 30,
        "textColor":cc.c3b(255,255,255),
        "textPosition": cc.p(80,25)
      },
      "timer": {
		    "level1": {"INIT_MINUTE":6, "INIT_SECOND":30},
        "position":cc.p(mapSize.width-135, 25),
        "textFont":"DejaVuSansMono",
        "textSize": 30
      }
    };

    //遊戲中所有道具項目
    this.gameResultScene = {
      "failedBackground": cc.TextureCache.getInstance().addImage(s_OverBG),
      "passededBackground": cc.TextureCache.getInstance().addImage(s_PassedBG),
      "backgroundTextureRect":cc.rect(0, 0, 960, 640),
      "backgroundPosition":cc.p(mapSize.width/2,mapSize.height/2),
      "result":{
        "resultFont":"Comica BD",
        "resultFontSize":38,
        "resultTitleColor": cc.c3b(0xff,0x95,0x00),
        "resultTextColor": cc.c3b(0,0,0)
      },
      "menuConfig":{
        "menuPosition":cc.p(mapSize.width/2, 100),
        "menuFont":"Comica BD",
        "menuFontSize":42,
        "menuFontColor":cc.c3b(0x00, 0xc6, 0x18)
      }
    };

    this.gameMenuScene = {
      "backgroundTexture": cc.TextureCache.getInstance().addImage(s_MenuBG),
      "backgroundTextureRect":cc.rect(0, 0, 800, 600),
      //"backgroundPosition":cc.p(400,225),
      //"backgroundTextureRect":cc.rect(0, 0, 800, 450),
      "backgroundPosition":cc.p(mapSize.width/2,mapSize.height/2),
      "titleTexture": cc.TextureCache.getInstance().addImage(s_MenuTitle),
      "titlePosition":cc.p(400,250),
      "menuConfig":{
        "menuPosition":cc.p((mapSize.width-400)/2, 0),
        "playNormal": cc.Sprite.create(s_MenuPlay, cc.rect(0, 85, 300, 80)),
        "playSelected": cc.Sprite.create(s_MenuPlay, cc.rect(0, 170, 300, 80)),
        "playDisabled": cc.Sprite.create(s_MenuPlay, cc.rect(0, 0, 300, 80)),
        "aboutNormal": cc.Sprite.create(s_MenuAbout, cc.rect(0, 0, 300, 80)),
        "aboutSelected": cc.Sprite.create(s_MenuAbout, cc.rect(0, 85, 300, 80)),
        "menuPlayPosition": cc.p(200, 210),
        "menuAboutPosition": cc.p(200, 125),
        "labelFont":"Oblivious font",
        "labelPosition":cc.p(170, 40),
        "labelSize":32
      }
    };

    this.gameActionBtn = {
      "background": cc.Sprite.create(s_Pie, cc.rect(0, 0, 150, 150)),
      "leftNormal": cc.Sprite.create(s_MenuL, cc.rect(0, 0, 24, 33)),
      "leftSelected": cc.Sprite.create(s_MenuL, cc.rect(0, 0, 24, 33)),
      "rightNormal": cc.Sprite.create(s_MenuR, cc.rect(0, 0, 24, 33)),
      "rightSelected": cc.Sprite.create(s_MenuR, cc.rect(0, 0, 24, 33)),
      "upNormal": cc.Sprite.create(s_MenuU, cc.rect(0, 0, 33, 24)),
      "upSelected": cc.Sprite.create(s_MenuU, cc.rect(0, 0, 33, 24)), 
      "downNormal": cc.Sprite.create(s_MenuD, cc.rect(0, 0, 33, 24)),
      "downSelected": cc.Sprite.create(s_MenuD, cc.rect(0, 0, 33, 24)), 
                        
      "jumpNormal": cc.Sprite.create(s_MenuA, cc.rect(0, 0, 65, 65)),
      "jumpSelected": cc.Sprite.create(s_MenuA, cc.rect(67, 0, 72, 72)),
      //"hitNormal": cc.Sprite.create(s_MenuB, cc.rect(0, 0, 65, 65)),
      //"hitSelected": cc.Sprite.create(s_MenuB, cc.rect(67, 0, 72, 72)),
      "leftPosition":cc.p(10, 75),
      "rightPosition":cc.p(120, 75),
      "upPosition":cc.p(60, 130),
      "downPosition":cc.p(60, 30),
            
      "jumpPosition":cc.p(mapSize.width-180, 40)
      //"hitPosition":cc.p(mapSize.width-90, 40)
    };


    // needed for JS-Bindings compatibility
    cc.associateWithNative( this, cc.Class );
  },

});

GameConfig.isMute = function() {
  return TG.MUTE ;
};

GameConfig.toggleGameSound = function() {
  TG.MUTE = !TG.MUTE ;

  var audioEngine = cc.AudioEngine.getInstance() ;
  if(TG.MUTE) {
    audioEngine.pauseAllEffects();
    audioEngine.pauseMusic();
  } else {
    audioEngine.resumeMusic();
  }
};

GameConfig.playEffect = function(s_effect) {
  var audioEngine = cc.AudioEngine.getInstance() ;
  audioEngine.setEffectsVolume(0.8);
  audioEngine.playEffect(s_effect);
};

GameConfig.playMusic = function(s_music) {
  var audioEngine = cc.AudioEngine.getInstance() ;
  audioEngine.setMusicVolume(0.7);
  audioEngine.playMusic(s_music, true);
};

GameConfig.stopMusic = function(s_music) {
  var audioEngine = cc.AudioEngine.getInstance() ;
  if(audioEngine.isMusicPlaying())
    audioEngine.stopMusic(s_music);
};
