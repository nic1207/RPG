//對話框
var GamePopupLayer = cc.Layer.extend({
  lines: [],
  talkIndex: 0,

  ctor:function (words,dofight,npcmove) {
    this._super();
    this.setTouchEnabled(true);
    this.setMouseEnabled(true);
    this.lines = words;
    this.needFight = dofight;
    this.npcMove = npcmove;
  },

  onEnter:function () {
    this._super();

    //this.gameConfig  = new GameConfig();
    this.audioEngine = cc.AudioEngine.getInstance();

    var sz = cc.Director.getInstance().getWinSize();
    var director = cc.Director.getInstance();

    var background = cc.Sprite.create(s_PopupBG);
    //var scale = sz.height / background.getContentSize().height;
    background.setAnchorPoint(0,0);
    background.setScale(6.3);
    background.setPosition(20,sz.height-200);
    
    if(this.lines[this.talkIndex].id>=0) {
      var path = this.getHead(this.lines[this.talkIndex].id);
      var head = null;
      if(path!="")
        head = cc.Sprite.create(path);
      else
        head = cc.Sprite.create();
      head.setAnchorPoint(0,0);
      head.setPosition(5,5);
      head.setScale(0.1);
      this.head = head;
      background.addChild(head,0,0);
    }
    var label = cc.LabelTTF.create("xx", "Arial", 20);
    label.setDimensions(cc.SizeMake(500, 0)); // 设置显示区域
    var word = this.lines[this.talkIndex].say;
    label.setString(word);
    label.setPosition(60,12);
    label.setScale(1/7);
    this.label = label;
    background.addChild(label,0,0);
    this.addChild(background, 999, 0);
    this.talkIndex++;
  },
  
  getHead: function(id) {
    console.log("id=",id);
    switch(id) {
      case 0:
        return s_Headf1;
      break;
      case 1:
        return s_Heado4;
      break;
      case 88://秋意
        return s_Headcc;
      break;
      case 98:
        return s_Headcc;
      break;
      case 99:
        return s_Headcc;
      break;
      default:
        return "";
      break;
    }
  },

  onTouchBegan: function(touches, event) {
    this.doNextTalk();
    return true;
  },
  onTouchesBegan: function(touches, event) {
    this.doNextTalk();
    return true;
  },
  
  doNextTalk: function() {
    //delete this;
    console.log("doNextTalk()");
    if(this.talkIndex<this.lines.length) {
      var head = this.getHead(this.lines[this.talkIndex].id);
      if(head) {
        var h = cc.TextureCache.getInstance().addImage(head);
        console.log(h);
        this.head.setTexture(h);
      }
      var nextStr = this.lines[this.talkIndex].say;
      this.label.setString(nextStr);
      this.talkIndex++;
    } else {
      console.log(this.needFight,this.npcMove);
      if(this.needFight)
        this.doFight2();
      else if(this.npcMove)
        this.doNpcMove();
      else
        this.doClose();
    }
  },
  doNpcMove: function() {
    var npcs = this.parent.NPCS;
    var saveData = GameSave.getInstance();
    //console.log(saveData);
            
    //console.log(npcs);
    for(var i=0;i<npcs.length;i++) {
      var npc = npcs[i];
      switch(saveData.level) { 
        case 1:
          npc.doMoveTo(cc.p(32*7+16,32*1));
        break;
        case 2:
          npc.doMoveTo(cc.p(32*15+16,32*6));
        break;
      }
      //console.log(npc);
    }
    this.doClose();
  },
  
  doFight: function() {
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameFightScene()));
  },
  
  doFight2: function() {
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameFight2Scene()));
  },
        
  
  doClose: function() {
    console.log("doClose()");
    this.parent.popup = null;
    this.removeFromParent();
  }
  

});

