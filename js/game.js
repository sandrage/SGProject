var game= {

data: { 
 score: 0,
 lifes: 3,
 accesso: false,
 contacolpi: 2,
 contamax: 2,
 uccidipg: false
 },
 
 "onload" : function() {
 
 if(!me.video.init("screen", 980, 500, true, 0))
 {
   alert("IL TUO PC NON SUPPORTA CANVAS");
   return ;
 }
   
    if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }
   
   me.audio.init("mp3");
   me.loader.onload=this.loaded.bind(this);
   me.loader.preload(game.resources);
   me.state.change(me.state.LOADING);
 },
 
 "loaded" : function()
 {
    me.state.set(me.state.MENU, new game.TitleScreen());
    me.state.set(me.state.GAMEOVER, new game.GameOverScreen());
    me.state.set(me.state.SCORE,new game.scoreScreen());
    me.state.set(me.state.PLAY, new game.PlayScreen());
    me.state.set(me.state.SETTINGS, new game.settingScreen());

   me.state.transition("fade", "#000000", 100);
   
   
   //piazziamo il nostro giocatore
   me.entityPool.add("Drago", game.playerEntity);
   me.entityPool.add("bonus", game.bonuspunti);
   me.entityPool.add("cuorebonus", game.cuorebonus);
  me.entityPool.add("nemico", game.nemico);
   me.entityPool.add("collision_scale",game.scale);
  me.entityPool.add("nemico2",game.nemico2);
 me.entityPool.add("chiave",game.chiave);

   //abilito la tastiera e ad ogni tasto associo una funzione
   me.input.bindKey(me.input.KEY.LEFT, "left");
   me.input.bindKey(me.input.KEY.RIGHT, "right");
   me.input.bindKey(me.input.KEY.SPACE, "jump", true);
   me.input.bindKey(me.input.KEY.UP, "up");
   me.input.bindKey(me.input.KEY.DOWN, "down");
   me.input.bindKey(me.input.KEY.X, "attack");
   me.input.bindKey(me.input.KEY.ENTER, "invio");


   
 
        me.state.change(me.state.MENU);
 }
};
me.LevelEntity = me.ObjectEntity.extend(
{
        init: function (x, y, settings) {
            this.parent(x, y, settings);

            this.nextlevel = settings.to;

            this.fade = settings.fade;
            this.duration = settings.duration;
            this.fading = false;

            this.gotolevel = settings.to;
        },
        onFadeComplete: function () {
            me.levelDirector.loadLevel(this.gotolevel);
            me.game.viewport.fadeOut(this.fade, this.duration);
        },

       
        goTo: function (level) {
            this.gotolevel = level || this.nextlevel;
            
            if (this.fade && this.duration) {
                if (!this.fading) {
                    this.fading = true;
                    me.game.viewport.fadeIn(this.fade, this.duration,
                            this.onFadeComplete.bind(this));
                }
            } else {
                
                me.levelDirector.loadLevel(this.gotolevel);
            }
        },

        onCollision: function (res,obj) {
            if(game.data.accesso)
            {
            if (obj instanceof game.playerEntity)
            { 
                
                if(this.nextlevel=="livellodue")
                {
                 me.audio.stopTrack();
                 me.audio.playTrack("gameforest");
                 game.data.maxscore=1560;
                }
                if(this.nextlevel=="livelloone")
                
                {
                 me.audio.stopTrack();
                 me.audio.playTrack("livellouno");
                }
                if(this.nextlevel=="score")
                
                {
                 me.state.change(me.state.SCORE);
                }
           
                this.goTo();
            }
            }
        }
    });