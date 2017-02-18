game.scoreScreen=me.ScreenObject.extend(
{
 init: function()
 {
  this.parent(true);
  
  this.sfondo=null;
  this.testo=null;
  this.backto=null;
  
 },
 onResetEvent: function()
 {
     me.audio.play("scorefinale");
     this.punt= new me.BitmapFont("fontbello", {x:28,y:28});
     this.testo=new me.BitmapFont("fontbello", {x:28,y:28});
     me.input.bindKey(me.input.KEY.ENTER, "invio");
     this.backto=new game.scoreScreen.backtomenu(400,400);
     this.sfondo=me.loader.getImage("screenscore");
     this.backin();

 },
 backin: function()
    {
      var tween=new me.Tween(this.backto).to({textScale: 0.7}, 1000).onComplete(this.backout.bind(this));
      tween.easing(me.Tween.Easing.Elastic.InOut);
      tween.start();
    },
 backout: function()
    {
     var tween=new me.Tween(this.backto).to({textScale: 0.9}, 1000).onComplete(this.backin.bind(this));
      tween.easing(me.Tween.Easing.Elastic.InOut);
      tween.start();
    },
    
 draw: function(context)
 {
  context.drawImage(this.sfondo,0,0);
  this.backto.draw(context);
  var punteggio=game.data.score+"/"+game.data.maxscore;
  if(game.data.score<(game.data.maxscore/2))
  {
   var messaggio="POTRESTI FARE DI MEGLIO...";
  }
  if(game.data.score>(game.data.maxscore/2))
  {
   var messaggio="ECCELLENTE!!!";
  }
  if(game.data.score==(game.data.maxscore/2))
  {
   var messaggio="BEN FATTO!";
  }
  this.testo.draw(context,messaggio,300,50);
  this.punt.draw(context, "YOUR SCORE IS: "+punteggio, 210 ,150);
  
  
 },
 update: function()
 {
   if (me.input.isKeyPressed('invio')) {

            me.audio.play("blip");
            game.data.lifes=3;
            game.data.contacolpi=3;
            me.state.change(me.state.MENU);
            
   }
   this.backto.update();
   return true;
 },
 onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        }
        
});


game.scoreScreen.backtomenu=me.Renderable.extend(
{
 init: function(x,y)
 {
  this.parent(new me.Vector2d(x,y),10,10);
   this.back=new me.SpriteObject(400,400, me.loader.getImage("backtomenu"));
  this.textScale=1;
  this.floating=true;
 },
 update: function()
 {
  this.back.resize(this.textScale);
  return true;
 },
 draw: function(context)
 {
  this.back.draw(context);
 }
});