// score for each round
var GameScore = cc.Sprite.extend({

	ctor:function (filename) {
		this._super(filename);
    this.scoreConfig = new GameConfig().headerbar.moneyScore;
    this.score = 0 ;
    this.scoreText = cc.LabelTTF.create("0", this.scoreConfig.textFont, this.scoreConfig.textSize);
    this.scoreText.setHorizontalAlignment(this.scoreConfig.alignment);
    this.scoreText.setColor(this.scoreConfig.textColor);
    this.scoreText.visible = true;
    this.addChild(this.scoreText, 99);
    this.audioEngine = cc.AudioEngine.getInstance();
    this.scheduleUpdate();
  },

  setScore: function(s) {
    this.score = s;
    if (!GameConfig.isMute()) {
      GameConfig.playEffect(s_coinMP3) ;
    }
  },

  getScore: function() {
    return (Math.ceil(this.score)) ;
  },

  update:function(dt) {
    this.timeLeft -= dt;
    this.scoreText.setString((Math.ceil(this.score)));
  }

});