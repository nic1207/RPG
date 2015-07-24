var GameBackgroundLayer = cc.Layer.extend({
    map00:null,
    //map01:null,
    mapWidth:0,
    temp:0,
	ctor:function () {
		this._super();
        this.gameConfig = new GameConfig();
        this.init();
    },

    init:function () {
        this._super();

        this.map00 = cc.TMXTiledMap.create("res/tilemaps/nic7.tmx");
        this.addChild(this.map00);
        this.mapWidth = this.map00.getContentSize().width;

        //this.map01 = cc.TMXTiledMap.create(s_map01);
        //this.map01.setPosition(cc.p(this.mapWidth, 0));
        //this.addChild(this.map01);
        this.scheduleUpdate();

    },

    checkAndReload:function (eyeX) {
        var newMapIndex = parseInt(eyeX / this.mapWidth);
        if (this.mapIndex == newMapIndex) {
            return false;
        }

        //if (0 == newMapIndex % 2) {
            // change mapSecond
        //    this.map01.setPositionX(this.mapWidth * (newMapIndex + 1));
        //} else {
            // change mapFirst
            this.map00.setPositionX(this.mapWidth * (newMapIndex + 1));
        //}
        this.mapIndex = newMapIndex;
        console.log(this.mapIndex);

        return true;
    },

    update:function (dt) {
        this.temp = this.temp + 2;
        //var animationLayer = this.getParent().getChildByTag(this.gameConfig.globals.TAG_GAME_LAYER);
        //var eyeX = animationLayer.getEyeX();
        var eyeX = this.temp;
        //console.log(eyeX);
        //this.checkAndReload(eyeX);
        var camera = this.getCamera();
        var eyeZ = cc.Camera.getZEye();
        camera.setEye(eyeX, 0, 200);
        camera.setCenter(eyeX, 0, 0);
    }

});