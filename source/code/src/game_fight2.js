//about 

//全域
	 var boss1;
    var boss2;
    var boss3;
    var boss4;
    var boss5;
	 var boss6;  
 	 var people;  
 	 var people2; 
 	 var people3; 
 	 var people4; 
 	 var people5; 
 	 var people6; 
	 var onecard=0;
	 var twocard=0;
	 var first_card=false;
	 var sec_card=false;
	 var open_1=false;
var open_2=false;
var open_3=false;
var open_4=false;
var open_5=false;
var open_6=false;
var card_1=true;
var card_2=true;
var card_3=true;
var card_4=true;
var card_5=true;
var card_6=true;

var ss1=false;
var ss2=false;
var ss3=false;

var end=false;

var background;
	 //var id;
var GameFight2Layer = cc.Layer.extend({

  ctor:function () {
    this._super();
    this.setTouchEnabled(true);
    this.setMouseEnabled(true);
    cc.SpriteFrameCache.getInstance().addSpriteFrames(s_SPELL1Plist);
    var mgr = cc.SpriteBatchNode.create(s_SPELL1Motion);

  },

  onEnter:function () {
    this._super();
    
    this.gameConfig  = new GameConfig();
    this.audioEngine = cc.AudioEngine.getInstance();

    var sz = cc.Director.getInstance().getWinSize();
    var director = cc.Director.getInstance();

    background = cc.Sprite.create(s_bacc);
    var scale = sz.height / background.getContentSize().height;
    background.setScale(1.25);
    
    background.setPosition(this.gameConfig.gameMenuScene.backgroundPosition);
    this.addChild(background, -999, this.gameConfig.globals.TAG_MENU_BACKGROUND);
    
		/*戰鬥音樂*/
	 this.audioEngine.playMusic(s_Sbattleing, true);
    
    
    boss = cc.Sprite.create(s_wolf);
    var x=sz.width/2;
    var y=sz.height/2;
    boss.setPosition(x,y-80);
    this.boss = boss;
    this.addChild(boss,99);
    
    boss2 = cc.Sprite.create(s_wolf);
    var x=sz.width/2;
    var y=sz.height/2;
    boss2.setPosition(x-150,y+80);
    this.boss2 = boss2;
    this.addChild(boss2,99);
    
    boss3 = cc.Sprite.create(s_wolf);
    var x=sz.width/2;
    var y=sz.height/2;
    boss3.setPosition(x-150,y-80);
    this.boss3 = boss3;
    this.addChild(boss3,99);
    
    boss4 = cc.Sprite.create(s_wolf);
    var x=sz.width/2;
    var y=sz.height/2;
    boss4.setPosition(x+145,y+80);
    this.boss4 = boss4;
    this.addChild(boss4,99);
    
    boss5 = cc.Sprite.create(s_wolf);
    var x=sz.width/2;
    var y=sz.height/2;
    boss5.setPosition(x,y+80);
    this.boss5 = boss5;
    this.addChild(boss5,99);
    
    boss6 = cc.Sprite.create(s_wolf);
    var x=sz.width/2;
    var y=sz.height/2;
    boss6.setPosition(x+150,y-80);
    //boss6.setOpacity(50);
    this.boss6 = boss6;
    this.addChild(boss6,99);
    
    /*人物*/
	people = cc.Sprite.create(s_bingman);
    var x=sz.width/2;
    var y=sz.height/2;
    people.setPosition(x,y-80);
    this.people = people;
    this.addChild(people,98);
    
    people2 = cc.Sprite.create(s_comeman);
    var x=sz.width/2;
    var y=sz.height/2;
    people2.setPosition(x-150,y+80);
    this.people2 = people2;
    this.addChild(people2,98);
    
    people3 = cc.Sprite.create(s_fuckman);
    var x=sz.width/2;
    var y=sz.height/2;
    people3.setPosition(x-150,y-80);
    this.people3 = people3;
    this.addChild(people3,98);
    
    people4 = cc.Sprite.create(s_bingman);
    var x=sz.width/2;
    var y=sz.height/2;
    people4.setPosition(x+145,y+80);
    this.people4 = people4;
    this.addChild(people4,98);
    
    people5 = cc.Sprite.create(s_fuckman);
    var x=sz.width/2;
    var y=sz.height/2;
    people5.setPosition(x,y+80);
    this.people5 = people5;
    this.addChild(people5,98);
    
    people6 = cc.Sprite.create(s_comeman);
    var x=sz.width/2;
    var y=sz.height/2;
    people6.setPosition(x+150,y-80);
    this.people6 = people6;
    this.addChild(people6,98);
    
 
    var bosstext = cc.LabelTTF.create('『 白狼之三寶 』', "Oblivious font", 20);
    bosstext.setColor(cc.c3b(115, 177, 255));
    bosstext.setPosition(sz.width/2,sz.height/2+195);
    this.addChild(bosstext);

		var bosstext2 = cc.LabelTTF.create('遊戲方法:翻出相同圖片即可消除。', "Oblivious font", 20);
    bosstext2.setColor(cc.c3b(255, 0, 0));
    bosstext2.setPosition(sz.width/2,sz.height/2-200);
    this.addChild(bosstext2);
    
     
    //對話框 背景
/*
    var fmenuBG = cc.Sprite.create(s_FMenuBG);
    fmenuBG.setAnchorPoint(0.5,0.5);
    fmenuBG.setScale(5);
    fmenuBG.setPosition(400,100);
    this.addChild(fmenuBG);
    

    this.magicFrame = new Object();
    this.magicFrame.spell1 = new Array();
    for(var i=4;i>0;i--) {
      var str = "spell1_0"+i+".png";
      var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
      this.magicFrame.spell1.push(frame);
    }
    //console.log(this.playerFrame.left);
    var magicAni = cc.Animation.create(this.magicFrame.spell1, 0.1);
    this.magicA = cc.Animate.create(magicAni);
    //this.addChild(this.magicA);
    
                                                                 
    
    var menuAttLabel = cc.LabelTTF.create("很普通的攻擊", "Oblivious font", 22);
    //menuPlayTitle.setColor(cc.c3b(255, 255, 255));
    //menuAttLabel.setPosition(0,0);
    var menuAtt = cc.MenuItemLabel.create(menuAttLabel,this.doNormalAttack,this);
    menuAtt.setPosition(200,120);
    var menuPowerLabel = cc.LabelTTF.create("一擊必殺", "Oblivious font", 22);
    var menuPower = cc.MenuItemLabel.create(menuPowerLabel,this.doPowerAttack,this);
    menuPower.setPosition(180,90);
    
                             
    //var menuAtt = cc.LabelTTF.create('攻擊', "Oblivious font", 24);
    //var menuPower = cc.LabelTTF.create('太陽花攻擊', "Oblivious font", 24);
    this.fightMenu = cc.Menu.create(menuAtt, menuPower);
    this.fightMenu.setPosition(0,0);
    
    //this.fightMenu.setPosition(0,sz.height/2);
    this.addChild(this.fightMenu, 20);
         
             */    
    return true;
  },
  
  doNormalAttack: function() {
    console.log("doNormalAttack()");
    var blink = cc.Blink.create(0.5, 1);
    this.boss2.runAction(blink);
  },
  doPowerAttack: function() {
    console.log("doPowerAttack()");
    //cc.SpriteFrameCache.getInstance().addSpriteFrames(s_SPELL1Plist);
    //var mgr = cc.SpriteBatchNode.create(s_SPELL1Motion);
        
    var magic = cc.Sprite.create();
    //var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("spell1_01.png");
    //magic.setDisplayFrame(frame);
    magic.setAnchorPoint(0.5,0.5);
    magic.setPosition(50,100);
    this.boss.addChild(magic);
    var blink = cc.Blink.create(0.5, 1);
    this.boss.runAction(blink);
        
    //magic.runAction(this.magicA);
    var oFade = cc.FadeOut.create(0.2);
    
    var act = cc.Sequence.create(this.magicA,oFade);
    magic.runAction(act);
  },

	//滑鼠按下
  onTouchesEnded:function (touches, event) {
    //this.isMouseDown = false;
    //this.backtoMenu();

    var loc = touches[0].getLocation();  
    console.log("loc.x: "+loc.x+"-loc.y: "+loc.y);  
    //console.log("滑鼠按下: "+ first_card);
    //console.log("onecard: "+ onecard+"-twocard: "+ twocard);
    
	if (loc.x>=200 && loc.x<=299 && loc.y>=314 && loc.y <=444 && open_2==false){
			//boss6.setOpacity(0);
			console.log("a");
			//id='a';
			var FadeOut = cc.FadeOut.create(0.5,0);
    		boss2.runAction(FadeOut);
			if(first_card==false){
					onecard=2;
					first_card=true;			
			}else{
					twocard=2;
					sec_card=true;
			}
			open_2=true;
			this.oooopppp();

			
		}
		
	if (loc.x>=350 && loc.x<=451 && loc.y>=313 && loc.y <=445 && open_5==false){
			//boss6.setOpacity(0);
			console.log("b");
			var FadeOut = cc.FadeOut.create(0.5,0);
    		boss5.runAction(FadeOut);
			if(first_card==false){
					onecard=1;
					first_card=true;				
			}else{
					twocard=1;
					sec_card=true;
				}
open_5=true;
				this.oooopppp();
		}
		
	if (loc.x>=439 && loc.x<=593 && loc.y>=313 && loc.y <=445 && open_4==false){
			//boss2.setOpacity(0);
			console.log("c");
			var FadeOut = cc.FadeOut.create(0.5,0);
    		boss4.runAction(FadeOut);
			if(first_card==false){
					onecard=3;
					first_card=true;				
			}else{
					twocard=3;
					sec_card=true;
				}
				open_4=true;
				this.oooopppp();
		}
	if (loc.x>=200 && loc.x<=299 && loc.y>=152 && loc.y <=286 && open_3==false){
			//boss3.setOpacity(0);
			console.log("d");
			var FadeOut = cc.FadeOut.create(0.5,0);
    		boss3.runAction(FadeOut);
			if(first_card==false){
					onecard=1;
					first_card=true;				
			}else{
					twocard=1;
					sec_card=true;
				}
				open_3=true;
				this.oooopppp();
		}
	if (loc.x>=350 && loc.x<=451 && loc.y>=152 && loc.y <=286 && open_1==false){
			//boss4.setOpacity(0);
			console.log("e");
			var FadeOut = cc.FadeOut.create(0.5,0);
    		boss.runAction(FadeOut);
			if(first_card==false){
					onecard=3;
					first_card=true;				
			}else{
					twocard=3;
					sec_card=true;
				}
				open_1=true;
				this.oooopppp();
		}
	if (loc.x>=500 && loc.x<=600 && loc.y>=152 && loc.y <=286 && open_6==false){
			//boss5.setOpacity(0);
			console.log("f");
			var FadeOut = cc.FadeOut.create(0.5,0);
    		boss6.runAction(FadeOut);
			if(first_card==false){
					onecard=2;
					first_card=true;				
			}else{
					twocard=2;
					sec_card=true;
				}
open_6=true;
				this.oooopppp();
		}
		
		
		/*結束遊戲*/
		if (loc.x>=104 && loc.x<=199 && loc.y>=105 && loc.y <=575 && end==true){
			this.audioEngine.stopMusic(s_Sbattleing, true);

			
			this.backtoMenu();
			
		}
		
		/*
		if(end==true){
				//this.backtoMenu();
				console.log("END????")		
				this.backtoMenu();	
			}*/
  },
  
  oooopppp:function(){
  	console.log("onecard: "+ onecard+"-twocard: "+ twocard);
console.log("first_card: "+ first_card+"-sec_card: "+ sec_card);
  	if(first_card==true && sec_card==true){
  		
  		if(onecard==twocard){
				console.log("消失"); 
				//cc.DelayTime.create(1);
				this.disspp();
				first_card=false;
  				sec_card=false;
  				onecard=0;
  				twocard=0;
				 			
  			}else{
  				console.log("不是同一張");  
  				this.reseatCard();
  				first_card=false;
  				sec_card=false;
  				onecard=0;
  				twocard=0;
  				//this.playEffect(s_Ecard);
  				this.audioEngine.playEffect(s_Ecard);
  				}
  		
  	}
  	
  	//kke=ss;
  	//console.log("kke: "+kke);
  	
  	
  	},
  	
  	reseatCard:function(){
  		
   		
  			if(open_1==true && card_1==true){
 				var FadeIn = cc.FadeIn.create(0.5,255);
    			boss.runAction(FadeIn);
    			console.log("open_1");
    			open_1=false;
    		}
    		if(open_2==true && card_2==true){
 				var FadeIn = cc.FadeIn.create(0.5,255);
    			boss2.runAction(FadeIn);
				console.log("open_2");
    			open_2=false;
    		}
			if(open_3==true  && card_3==true){
 				var FadeIn = cc.FadeIn.create(0.5,255);
    			boss3.runAction(FadeIn);
    			console.log("open_3");
    			open_3=false;
    		}
			if(open_4==true  && card_4==true){
 				var FadeIn = cc.FadeIn.create(0.5,255);
    			boss4.runAction(FadeIn);
    			console.log("open_4");
    			open_4=false;
    			
    		}
    		if(open_5==true  && card_5==true){
 				var FadeIn = cc.FadeIn.create(0.5,255);
    			boss5.runAction(FadeIn);
    			open_5=false;
    		}
    		if(open_6==true  && card_6==true ){
 				var FadeIn = cc.FadeIn.create(0.5,255);
    			boss6.runAction(FadeIn);
    			open_6=false;
    		}
  	
  	},
  
  /*消失圖片*/
  disspp:function(){
		if(open_1==true && card_1==true){
				var bf= cc.FadeOut.create(0.5,0);
				boss.runAction(bf);
    			var pf = cc.FadeOut.create(0.5,0);
    			people.runAction(pf);
 				card_1=false;
 				ss1=true;
 				
    		}
    		if(open_2==true && card_2==true){
    			var bf= cc.FadeOut.create(0.5,0);
				boss2.runAction(bf);
    			var pf = cc.FadeOut.create(0.5,0);
    			people2.runAction(pf);
				card_2=false;
				ss2=true;
    		}
			if(open_3==true  && card_3==true){
				var bf= cc.FadeOut.create(0.5,0);
				boss3.runAction(bf);
    			var pf = cc.FadeOut.create(0.5,0);
    			people3.runAction(pf);
				card_3=false;
				ss3=true;
    		}
			if(open_4==true  && card_4==true){
				var bf= cc.FadeOut.create(0.5,0);
				boss4.runAction(bf);
    			var pf = cc.FadeOut.create(0.5,0);
    			people4.runAction(pf);
				card_4=false;
				this.bigmanAn();
    		}
    		if(open_5==true  && card_5==true){
    			var bf= cc.FadeOut.create(0.5,0);
				boss5.runAction(bf);
    			var pf = cc.FadeOut.create(0.5,0);
    			people5.runAction(pf);
				card_5=false;
				this.fuckmanAn();
    		}
    		if(open_6==true  && card_6==true){
    			var bf= cc.FadeOut.create(0.5,0);
				boss6.runAction(bf);
    			var pf = cc.FadeOut.create(0.5,0);
    			people6.runAction(pf);
				card_6=false;
				this.comemanAn();
				
    		}
 		/*三個凍話效果結束,轉場*/
    		if (ss3==true && ss1==true && ss2==true){

    			//this.endimage();
    			end=true;

    			}
  	},

	endimage:function(){
		var sz = cc.Director.getInstance().getWinSize();
		var bi = cc.Sprite.create(s_bacc2);
    	var x=sz.width/2;
    	var y=sz.height/2;
    	bi.setPosition(x,y);
    	this.bi = bi;
    	this.addChild(bi,100);
    	var delay=cc.DelayTime.create(3);
    	var oScale = cc.ScaleTo.create(1);
    	    
    	var act = cc.Sequence.create(oScale,delay,oScale,delay);
   	this.bi.runAction(act);
		
		end=true;
		this.audioEngine.stopMusic(s_Sbattleing, true);
		this.backtoMenu();
		
		},
	

	/*丙 消失效果*/
	bigmanAn:function(){
		var sz = cc.Director.getInstance().getWinSize();
		var bi = cc.Sprite.create(s_bingmanK);
    	var x=sz.width/2;
    	var y=sz.height/2;
    	bi.setPosition(x,y);
    	this.bi = bi;
    	this.addChild(bi,100);
    	
    	var oFade = cc.FadeOut.create(0.5);
    	var iFade = cc.FadeIn.create(0.5);
    	var bScale = cc.ScaleTo.create(0.5,1.5);
    	var sScale = cc.ScaleTo.create(0.5,0.75);
    	var oScale = cc.ScaleTo.create(0.5,1);
    	var blink = cc.Blink.create(0.3,4);
    	var delay=cc.DelayTime.create(0.5);
    	var delay1=cc.DelayTime.create(0.1);
    	    
    	var act = cc.Sequence.create(iFade,bScale,blink,sScale,delay1,oScale,delay,oFade);
   	this.bi.runAction(act);
   	this.audioEngine.playEffect(s_yise);
  	},
  	
  	/*來來歌 消失效果*/
	comemanAn:function(){
		var sz = cc.Director.getInstance().getWinSize();
		var bi = cc.Sprite.create(s_comemanN);
    	var x=sz.width/2;
    	var y=sz.height/2;
    	bi.setPosition(x,y);
    	this.bi = bi;
    	this.addChild(bi,100);
    	
    	var oFade = cc.FadeOut.create(0.5);
    	var iFade = cc.FadeIn.create(0.5);
    	var bScale = cc.MoveTo.create(2,cc.PointMake(x-30,y));
    	var delay=cc.DelayTime.create(0.5);
    	    
    	var act = cc.Sequence.create(iFade,bScale,delay,oFade);
   	this.bi.runAction(act);
   	this.audioEngine.playEffect(s_gocard);
  	},

	/*幹幹歌 消失效果*/
	fuckmanAn:function(){
		var sz = cc.Director.getInstance().getWinSize();
		var bi = cc.Sprite.create(s_fuckmanN);
    	var x=sz.width/2;
    	var y=sz.height/2;
    	bi.setPosition(x,y);
    	this.bi = bi;
    	this.addChild(bi,100);
    	
    	var oFade = cc.FadeOut.create(0.5);
    	var iFade = cc.FadeIn.create(0.5);
    	var bScale = cc.MoveTo.create(2,cc.PointMake(x+30,y));
    	var delay=cc.DelayTime.create(0.5);
    	    
    	var act = cc.Sequence.create(iFade,bScale,delay,oFade);
   	this.bi.runAction(act);
   	this.audioEngine.playEffect(s_gocard);
  	},
  	
  		/*在完一次*/
	againgame:function(){
			 onecard=0;
	 twocard=0;
	  first_card=false;
	 sec_card=false;
	  open_1=false;
open_2=false;
open_3=false;
open_4=false;
open_5=false;
open_6=false;
card_1=true;
card_2=true;
card_3=true;
card_4=true;
card_5=true;
card_6=true;

ss1=false;
ss2=false;
ss3=false;

end=false;
  	},

  backtoMenu:function() {
		this.againgame();
    delete this;
    cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameLevelScene()));
  }

});

GameConfig.playEffect = function(s_effect) {
  var audioEngine2 = cc.AudioEngine.getInstance() ;
  audioEngine2.setEffectsVolume(0.8);
  audioEngine2.playEffect(s_effect);
};

GameConfig.playMusic = function(s_music) {
  var audioEngine = cc.AudioEngine.getInstance() ;
  audioEngine.setMusicVolume(0.1);
  audioEngine.playMusic(s_music, true);
};

GameConfig.stopMusic = function(s_music) {
  var audioEngine = cc.AudioEngine.getInstance() ;
  if(audioEngine.isMusicPlaying())
    audioEngine.stopMusic(s_music);
};


var GameFight2Scene = cc.Scene.extend({
  onEnter:function() {
    this._super();
    var layer = new GameFight2Layer();
    this.addChild(layer);
  }
  
});
