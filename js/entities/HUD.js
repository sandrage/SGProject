game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		this.parent();
		

		this.isPersistent = true;
		
		// non collisionabile
		this.collidable = false;
		
		
		this.z = Infinity;

	
		this.name = "HUD";

		this.addChild(new game.HUD.ScoreItem(930, 470));
        this.addChild(new game.HUD.Lives(220,10));
       
	}
});


game.HUD.sound=me.Renderable.extend(
{
 init: function(x,y)
 {
  this.parent(new me.Vector2d(x,y),10,10);
  this.floating=true;
  this.conta=0;
  this.soundb=new me.SpriteObject(930, 10, me.loader.getImage("bottoneaudio"));
  this.ad();
  
 },
 ad: function()
 {
  me.input.registerPointerEvent('mousedown', this.soundb, this.abilita.bind(this), this.floating);
 },

 draw: function(context)
 {
  this.soundb.draw(context);
  
  
 },
  
 abilita: function()
 {
  if(me.audio.isAudioEnable())
  {
   me.audio.muteAll();
  }
  else
  {
   me.audio.unmuteAll();
  }
     me.input.registerPointerEvent('mousedown', this.soundb, this.ad.bind(this), this.floating);
  
 },
 
   
});


game.HUD.Lives= me.Renderable.extend(
{
 init: function(x,y)
 {
  this.parent(new me.Vector2d(x,y), 10,10);
  this.font=new me.BitmapFont("32x32_font",{x:28,y:28});
  this.font.set("right");
  this.lives=-1;
  this.floating=true;
 },
 update: function()
 {
  if(this.lives !==game.data.lifes)
        {
         this.lives=game.data.lifes;
         return true;
        }
  if(game.data.lifes<=0)
  {
    game.data.lifes=3;
  }
  
        return false;
 },
 draw: function(context)
 {
// this.font.draw (context, game.data.lifes, this.pos.x, this.pos.y);
 this.font.draw (context, "LIFES:"+game.data.lifes, this.pos.x, this.pos.y);
 }
});
 
game.HUD.ScoreItem = me.Renderable.extend({	

	init: function(x, y) {
	
		this.parent(new me.Vector2d(x, y), 10, 10); 
		this.font=new me.BitmapFont("32x32_font",{x:28,y:28});
        this.font.set("right");

		this.score = -1;
 
		this.floating = true;
	},

	update : function () {
		if (this.score !== game.data.score) 
        {	
			this.score = game.data.score;
			return true;
		}
     
        if (game.data.score <0 || game.data.score > game.data.maxscore)
        {
          game.data.score=0;
          me.state.change(me.state.MENU);
          
        }
		return false;
	},

	draw : function (context) {
		 //this.font.draw (context, game.data.score, this.pos.x, this.pos.y);
         this.font.draw (context, "SCORE:"+game.data.score+"/"+game.data.maxscore, this.pos.x, this.pos.y);
	}

});
