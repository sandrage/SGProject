game.GameOverScreen= me.ScreenObject.extend({
  init: function()
   {
      this.parent(true);
 
        // title screen image
        this.title = null;
 
        this.restart= null;
    },
 
    // reset function
    onResetEvent: function()
   {
        if (this.title == null) {
           
            this.title = me.loader.getImage("gameover");
          
 
        }
        this.restart=new game.GameOverScreen.restart(500,500);
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.audio.playTrack("gameover");
        this.restartin();
 
    },
    restartin: function()
    {
      var tween=new me.Tween(this.restart).to({textScale: 0.7}, 1000).onComplete(this.restout.bind(this));
      tween.easing(me.Tween.Easing.Elastic.InOut);
      tween.start();
    },
    restout: function()
    {
     var tween=new me.Tween(this.restart).to({textScale: 0.9}, 1000).onComplete(this.restartin.bind(this));
      tween.easing(me.Tween.Easing.Elastic.InOut);
      tween.start();
    },
    update: function() {
 
        if (me.input.isKeyPressed('enter')) {
            me.audio.stopTrack();
            game.data.lifes=3;
            game.data.score=0;
            game.data.accesso=false;
            me.state.change(me.state.MENU);
        }
        this.restart.update();
        return true;
    },
 
    draw: function(context) {
        context.drawImage(this.title, 0, 0);
 
        this.restart.draw(context);
        
    },
 
    // destroy function
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
 
    
    }
 
});

game.GameOverScreen.restart=me.Renderable.extend(
{
 init: function(x,y)
 {
  this.parent(new me.Vector2d(x,y),10,10);
   this.restart=new me.SpriteObject(275,250, me.loader.getImage("restart"));
  this.textScale=1;
  this.floating=true;
 },
 update: function()
 {
  this.restart.resize(this.textScale);
  return true;
 },
 draw: function(context)
 {
  this.restart.draw(context);
 }
});