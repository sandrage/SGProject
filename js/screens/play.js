game.PlayScreen = me.ScreenObject.extend({
  
  onResetEvent: function()
   {
     me.levelDirector.loadLevel("livelloone");
     game.data.score=0;
     game.data.lives=3;
     this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
     me.audio.playTrack("livellouno");
         
    },

    onDestroyEvent: function() {
     
        me.game.world.removeChild(this.HUD);
        me.audio.stopTrack();
    }
});