game.chiave=me.CollectableEntity.extend(
{
 init:function(x,y,settings)
 {
  this.parent(x,y,settings);
  this.name="chiave";
 },
 onCollision: function()
 {
    var res= me.game.collide(this);

    if (res) 
    {
      if(res.obj.type==me.game.ACTION_OBJECT)
      {  
       me.audio.play("key");
       game.data.accesso=true;
       this.collidable=false;
       me.game.remove(this);
      }
    }
 }
});

game.scale=me.ObjectEntity.extend(
{
 init: function(x,y,settings)
 {
  this.parent(x,y,settings);
  this.name="scale";
 }
});


game.playerEntity=me.ObjectEntity.extend(
{
  init: function(x, y, settings)
   {
     this.parent(x,y,settings);
        this.setVelocity(3, 11);
        this.setFriction(0.24, 0);
        this.setMaxVelocity(4, 12);
        this.gravity=0.5;
        this.walkLeft=false;
        this.type=me.game.ACTION_OBJECT;
     this.attacking=false;
     this.dying=false;
     this.gameover=false;
    
    this.fuococooldown=0;
    this.fuocomax=10;
     this.spawnPosition = new me.Vector2d(x, y);
     
     me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

     this.renderable.addAnimation("walk",  [1,0,1,2], 150);
     this.renderable.addAnimation("jump", [4]);
     this.renderable.addAnimation("attack", [3]);
     this.renderable.addAnimation("falling", [5,6], 150);
     this.renderable.addAnimation("die", [7,8,9], 200);
     this.renderable.setCurrentAnimation("walk");
     
     if(me.levelDirector.getCurrentLevelId()=="livelloone")
        {
         game.data.maxscore=750;
        }
        if(me.levelDirector.getCurrentLevelId()=="livellodue")
        {
         game.data.maxscore=1560;
        }
   },
   
   
   
   update: function() 
   {
     if(me.input.isKeyPressed('left'))
     {
       this.walkLeft=true;
       this.flipX(true);
       this.vel.x-=this.accel.x * me.timer.tick;
       
     }
     
     
     
     else if(me.input.isKeyPressed('right'))
     {
         this.walkLeft=false;
         this.flipX(false);
         this.vel.x+= this.accel.x * me.timer.tick;
         
     }
     else
     {
       this.vel.x=0;
     }
     
     
   
       if(me.input.isKeyPressed('up') && this.onladder)
       {
         //var res=me.game.collide(this);
         //if(res)
         //{
          //  if(res.obj.name=="scale")
         //   {
         //    this.vel.y=-3;
         //   }
         //}
          this.vel.y=-3;
       
       }
       else if(me.input.isKeyPressed('down') && this.onladder)
       {
         //var res=me.game.collide(this);
        // if(res)
        // {
         //   if(res.obj.name=="scale")
        //    {
       
              //this.vel.y=+3;
         //   }
        // }
        this.vel.y=+3
 
       }
   
     
     
     
     

     if(me.input.isKeyPressed('jump'))
     {
 
       if(!this.jumping && !this.falling)
       {
         this.vel.y= -this.maxVel.y * me.timer.tick;
         this.jumping=true;
         me.audio.play("jump");
       }
     }

     
     if(me.input.isKeyPressed("attack") && this.fuococooldown==0)
     {
        
         if(!this.walkLeft)
         {
                    var flip=false;
                    this.attacking=true;           
                    this.renderable.setCurrentAnimation("attack", (function () {
                        this.renderable.setCurrentAnimation("walk");
                        this.attacking = false;
                        }).bind(this));       
                    
                    var posiz=this.pos.x;
                    var pos=this.pos.y+20;
                    var f=new fuoco(this.pos.x, pos, flip, posiz); 
                    
                    me.game.add(f,20);
                    me.game.sort();
                    this.fuococooldown=this.fuocomax;
                    me.audio.play("fuoco");
                    
                   
                   
         }
         
         
         else
           if(this.walkLeft)
           {
             this.flipX(true);
             var flip=true;
             this.attacking=true;           
             this.renderable.setCurrentAnimation("attack", (function () {
                        this.renderable.setCurrentAnimation("walk");
                        this.attacking = false;
                        }).bind(this));
             
             
             var pos=this.pos.y+20;
             var posiz=this.pos.x;
           var f=new fuoco(this.pos.x-55, pos, flip, posiz);
              me.game.add(f,20);
              me.game.sort();
              me.audio.play("fuoco");
             this.fuococooldown=this.fuocomax;
                   
          }
      
          
     }
     else
     if(me.input.isKeyPressed("attack") && this.fuococooldown>0)
     {
      this.fuococooldown--;
     }

     

         
     
     if ((this.jumping && !this.falling) && !this.attacking)
     {
            this.renderable.setCurrentAnimation("jump");
     }
     else
     {
          if(this.falling && !this.attacking)
          {
            this.renderable.setCurrentAnimation("falling");
          }
       
       
          else 
          {
            if (!this.renderable.isCurrentAnimation("walk") && !this.attacking) 
            this.renderable.setCurrentAnimation("walk");
          }
     }
       if (this.dying)
       {
                if (game.data.lifes == 0)
                {
                    this.gameover = true;
                    game.data.contacolpi=game.data.contamax;
                    me.state.change(me.state.GAMEOVER);
                    
                    return;
                } else 
                {
                    game.data.contacolpi=game.data.contamax;
                   this.renderable.setCurrentAnimation("die");
                    me.game.viewport.fadeIn("#000000", 500, this.reset.bind(this));
                }
      }
           
        
     
     
     var lala = me.game.collide(this);
      if ((this.pos.y+54 > me.game.currentLevel.rows * me.game.currentLevel.tileheight)||(lala && lala.obj.name=="nemico2") && !this.dying) {
            this.vel.y = -this.maxVel.y;
            this.vel.x = 0;
            this.die();
        }
     
     
     var res = me.game.collide(this);
 

     
    if (res) 
    {
      
         if(res.obj.name=="nemico")
         {
           
              if(game.data.contacolpi>0)
              {
              game.data.contacolpi--;
              game.data.uccidipg=false;
              this.vel.y=-(this.maxVel.y-3);
              }
              else if(game.data.contacolpi<=0 && game.data.uccidipg==true)
              {
               game.data.contacolpi=game.data.contamax;
               this.vel.y=-(this.maxVel.y-3);
               this.die();
              }
            
         
        } 
   
    }   

     
     this.updateMovement();
     
     if (this.vel.x!=0 || this.vel.y!=0 || this.dying) 
     {
            this.parent();
            return true;
     }
     
     
     return false;
   },
   die: function()
   {
     if(!this.dying)
     {
     this.renderable.setCurrentAnimation("die");
     this.renderable.setAnimationFrame(0);
     this.renderable.flicker(0);
      this.dying=true;
      game.data.lifes--;
      game.data.uccidipg=false;
      game.data.contacolpi=game.data.contamax;
     }
   },
   reset: function () {
       
        this.pos.x = this.spawnPosition.x;
        this.pos.y = this.spawnPosition.y;
        this.dying = false;
        this.attacking = false;
        this.falling = false;
        this.jumping = false;
        this.gravity=0.5;
        game.data.uccidipg=false;
        game.data.contacolpi=game.data.contamax;
        this.renderable.setCurrentAnimation("walk");
        this.renderable.setAnimationFrame(0);
        this.setVelocity(3, 11);
        this.setFriction(0.24, 0);
        this.setMaxVelocity(4, 12);
        }
   
  });

game.bonuspunti=me.CollectableEntity.extend(
{
  init: function(x,y,settings)
   {
     this.parent(x,y,settings);
   },
   
   
   
   onCollision: function()
   {
     var res = me.game.collide(this);
 
     
     
    if (res) 
    {
      if(res.obj.type==me.game.ACTION_OBJECT)
      {  
         me.audio.play("item");
         game.data.score+=10;
         this.collidable=false;
         me.game.remove(this);
      }
    }
   }
});
game.cuorebonus=me.CollectableEntity.extend(
{
 init:function(x,y,settings)
 {
  this.parent(x,y,settings);
 },
  
 onCollision:function()
 {
  var res=me.game.collide(this);
  if(res)
  {
   if(res.obj.type==me.game.ACTION_OBJECT)
   {
     me.audio.play("item");
     
      game.data.lifes++;
      this.collidable=false;
      me.game.remove(this);
     
   }
 }
 }
});

var fuoco=me.ObjectEntity.extend(
{
  init:function(x, y, flip, posiz)
   {
     var settings=new Object();
     settings.image="attacco";
     settings.spritewidth=104;
     
     
     this.maxwidth=104;
     this.parent(x, y, settings);
     this.collidable=true;
     this.name="fuoco";
     this.setVelocity(5,3);
     this.pospers=posiz;
     
     if(flip)
     this.vel.x=-5;
     else
     this.vel.x=5;
     
     
     this.flipX(flip);
     
     this.vel.y=0;
     this.renderable.addAnimation("fuoco",[0,1,2,3],100);
     this.renderable.setCurrentAnimation("fuoco",function(){me.game.remove(this)});  
     
     
     
   },
   
   onCollision: function(res, obj)
   {
     
     
   },
   
   
   update: function()
   {
         
            this.pos.x =this.pos.x + this.vel.x*me.timer.tick;
         
        
        
		var res = me.game.collide(this);
 
		this.parent();
        if(!this.inViewport) 
        {me.game.remove(this);}
        
		if(this.pos.x > this.pospers+this.maxwidth || this.pos.x < this.pospers-this.maxwidth-55)
        { 
            
			me.game.remove(this);
            
		}
         
             return true;
        
        
        
   }
});

game.nemico2=me.ObjectEntity.extend(
{
 init: function(x,y,settings)
 {
  this.parent(x,y,settings);
  this.name="nemico2";
  this.type=me.game.ENEMY_OBJECT;
 }
});

game.nemico=me.ObjectEntity.extend(
{
  init: function(x,y,settings)
   {    
     this.parent(x,y,settings);     
     this.startX=x;
     this.endX=x+settings.width-settings.spritewidth;
     this.setMaxVelocity(4,10);
     this.pos.x=x+settings.width-settings.spritewidth;
     this.walkLeft=true;
     
     this.setVelocity(3,1);
     this.collidable=true;
     this.name="nemico";
     this.type=me.game.ENEMY_OBJECT;
   },
   
   
   onCollision: function(res,obj)
   {
     
     if(this.alive)
     {
       if(obj.name=="fuoco")
      {
       this.vel.x=0;
       game.data.contacolpi=game.data.contamax;
       game.data.uccidipg=false;
       this.die();
      }
      if(game.data.contacolpi<=0)
      {
       if(obj.falling)
       {
       this.vel.x=0;
       game.data.contacolpi=game.data.contamax;
       game.data.uccidipg=false;
       this.die();
       }
       else
       game.data.uccidipg=true;
      }
        
        
     }
     else{
     game.data.uccidipg=false;
     game.data.contacolpi=game.data.contamax;}
    
    
     
    
     
   },
   
   die: function()
   {
     
     if(!this.dying)
     {
       game.data.contacolpi=game.data.contamax;
       this.alive=false;
       game.data.uccidipg=false;
       me.audio.play("mortenemico");
       me.game.remove(this);
       game.data.score+=15;
     
     }
   
   },
   update: function()
   {
     if(!this.inViewport)
       return false;
     
     
     if(this.alive)
     {
       if(this.walkLeft && this.pos.x <= this.startX)
           this.walkLeft=false;
       
       
       else if(!this.walkLeft && this.pos.x >=this.endX)
         this.walkLeft=true;
       
       
       this.flipX(this.walkLeft);
       this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
     }
     else
     {
       this.vel.x=0;
     }
     
     this.updateMovement();
     
     
     if (this.vel.x!=0 || this.vel.y!=0) 
     {

            this.parent();
            return true;
      }
        return false;
    }
});
    
     
     