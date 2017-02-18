game.TitleScreen = me.ScreenObject.extend({
  init: function()
   {
      this.parent(true);
 
        // title screen image
        this.nuvola= null;
        this.sfondo=null;
        this.play=null;
        this.scrollerfont  =  null;
		this.scrollertween = null;
		
		this.scroller = "PRESS ENTER TO PLAY";
		this.scrollerpos = 400;
   },
 
    onResetEvent: function()
   {
        if (this.sfondo== null) {
         
            this.sfondo=me.loader.getImage("sfondo");           
            this.scrollerfont= new me.BitmapFont("32x32_font", {x:28,y:28});	
        }
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        this.scrollerpos = 400;
	
		this.scrollertween = new me.Tween(this).to({scrollerpos: -1000}, 10000).onComplete(this.scrollover.bind(this)).start();
        
        this.img=new game.TitleScreen.img(250,0);
        this.play= new game.TitleScreen.play(400,250);
       
        this.imagein();
        this.playin();
       
    },
    scrollover : function() {
		
		this.scrollerpos = 500;
		this.scrollertween.to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
	},
   
    imagein: function()
    {
      var tween=new me.Tween(this.img).to({textScale: 0.9}, 1000).onComplete(this.imageout.bind(this));
      tween.easing(me.Tween.Easing.Quadratic.InOut);
      tween.start();
    },
    imageout:function()
    {
     var tween=new me.Tween(this.img).to({textScale: 0.8}, 1000).onComplete(this.imagein.bind(this));
      tween.easing(me.Tween.Easing.Quadratic.InOut);
      tween.start();
    },
    playin: function()
    {
      var tween=new me.Tween(this.play).to({textScale: 0.9}, 1000).onComplete(this.playout.bind(this));
      tween.easing(me.Tween.Easing.Elastic.InOut);
      tween.start();
    },
    playout:function()
    {
     var tween=new me.Tween(this.play).to({textScale: 0.8}, 1000).onComplete(this.playin.bind(this));
      tween.easing(me.Tween.Easing.Elastic.InOut);
      tween.start();
    },

 
    // update function
    update: function() {
        
        if (me.input.isKeyPressed('enter')) {
            
            me.audio.play("blip");
            me.state.change(me.state.SETTINGS);
        }
       
        this.img.update();
        this.play.update();
        return true;
    },
 
    // draw function
    draw: function(context) 
   {
       
        context.drawImage(this.sfondo, 0, 0);
       
        this.img.draw(context);
        this.play.draw(context);
       this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
    },
 
    // destroy function
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
       	this.scrollertween.stop();
 
    }
 
});

game.TitleScreen.img=me.Renderable.extend(
{
 init: function(x,y)
 {
  this.parent(new me.Vector2d(x,y),10,10);
  this.nuvola=new me.SpriteObject(250,0, me.loader.getImage("nuvola"));
  this.textScale=1;
  this.floating=true;
 },
 update: function()
 {
  this.nuvola.resize(this.textScale);
  return true;
 },
 draw: function(context)
 {
  this.nuvola.draw(context);
 }
});


game.TitleScreen.play=me.Renderable.extend(
{
 init: function(x,y)
 {
  this.parent(new me.Vector2d(x,y),10,10);
   this.play=new me.SpriteObject(400,240, me.loader.getImage("cominciamo"));
  this.textScale=1;
  this.floating=true;
 },
 update: function()
 {
  this.play.resize(this.textScale);
  return true;
 },
 draw: function(context)
 {
  this.play.draw(context);
 }
});
