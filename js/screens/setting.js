game.settingScreen=me.ScreenObject.extend(
{
 init: function()
 {
  this.parent(true);
  
  this.sfondo=null;
  this.testo=null;
  this.avanti=null;
  
 },
 onResetEvent: function()
 {
     this.testo=new me.BitmapFont("fontbello", {x:28,y:28});
     me.input.bindKey(me.input.KEY.ENTER, "invio");
     this.avanti=new game.settingScreen.avantigioco(620,400);
     this.sfondo=me.loader.getImage("screenscore");
     this.blubby=me.loader.getImage("blubby");
     this.avantiin();

 },
 avantiin: function()
    {
      var tween=new me.Tween(this.avanti).to({textScale: 0.7}, 1000).onComplete(this.avantiout.bind(this));
      tween.easing(me.Tween.Easing.Elastic.InOut);
      tween.start();
    },
 avantiout: function()
    {
     var tween=new me.Tween(this.avanti).to({textScale: 0.9}, 1000).onComplete(this.avantiin.bind(this));
      tween.easing(me.Tween.Easing.Elastic.InOut);
      tween.start();
    },
    
 draw: function(context)
 {
  context.drawImage(this.sfondo,0,0);
  context.drawImage(this.blubby,330,20);
  this.avanti.draw(context);
  var messaggio="  DOPO AVER OTTENUTO I VARI BONUS"+'\n\n'+"   DEL LIVELLO, TROVA LA CHIAVE"+'\n\n'+"   NASCOSTA PER POTER PASSARE AL"+'\n\n'+"    LIVELLO SUCCESSIVO!";
  this.testo.draw(context,messaggio,15,150); 
  this.avanti.draw(context);
  
 },
 update: function()
 {
   if (me.input.isKeyPressed('invio')) {

            me.audio.play("blip");
            game.data.lifes=3;
            me.state.change(me.state.PLAY);
            
   }
   this.avanti.update();
   return true;
 },
 onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        }
        
});


game.settingScreen.avantigioco=me.Renderable.extend(
{
 init: function(x,y)
 {
  this.parent(new me.Vector2d(x,y),10,10);
   this.avanti=new me.SpriteObject(620,250, me.loader.getImage("avantigioca"));
  this.textScale=1;
  this.floating=true;
 },
 update: function()
 {
  this.avanti.resize(this.textScale);
  return true;
 },
 draw: function(context)
 {
  this.avanti.draw(context);
 }
});