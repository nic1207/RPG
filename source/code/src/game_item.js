/*
 * GameNpc.js
 */
//===========================================================================================
var GameItem = cc.Sprite.extend({
  ctor: function(Config, pos, no, tagPoint) {
    this._super();
    this.itemConfig = Config; 
    this.position = pos;  
    this.no = no;
    //console.log(tagPoint);
    this.tag = tagPoint;
    this.init();
    return this;
  },

  init: function() {
    //initial item
    this.initWithTexture(this.itemConfig.texture, this.itemConfig.textureRect);

    //set Scale
    this.setScale(this.itemConfig.textureSize);
    
    //Set Position
    this.setPosition(cc.p(this.position.x, this.position.y));

    //Set Show items
    this.setShow();

    //Schedule Update
    this.scheduleUpdate();
  },

  setShow: function() {
    this.setVisible(true);
  },

  setHide: function() {
    this.setVisible(false);
  },

  update:function() {

    
  }

});