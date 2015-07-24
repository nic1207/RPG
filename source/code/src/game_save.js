var GameSave = cc.Class.extend({

  ctor:function () {
    this.level = 1;
    this.hp = 100;
    this.max_hp = 100;
    this.exp = 0;
    this.levelup_exp = 100;
    this._instance = this;
    this.pos = cc.p(0,0);
  },

});

/**
 * Sington
 */
GameSave.getInstance = function() {  
  if (!this._instance) {
    this._instance = new GameSave();
  }
  //console.log(this.level,this.hp);
  return this._instance;
};
                                                                                                                           