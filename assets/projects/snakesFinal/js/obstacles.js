game.Obstacle = me.Entity.extend({
  init : function() {
    var image = me.loader.getImage("obstacle");
    this._super(me.Entity, "init", [1,1, {
      image : "obstacle", 
      width : 128, 
      height: 128
    }]);
        
        this.body.collisionType = me.collision.types.WORLD_SHAPE;

        this.spawn();     
  },

  update : function(time) {
    this._super(me.Entity, "update", [time]);
        
        me.collision.check(this);
        
        return true;
  },
  
  onCollision : function(res, other) {     		
		  if(other.body.collisionType === me.collision.types.WORLD_SHAPE) {
			this.spawn();
        }
        return false;
  },
    
    spawn : function() { 
        var tmpX;

        if(game.data.isMultiplayer) {
           tmpX = Math.floor((me.game.viewport.width / 2) - 50).random((me.game.viewport.width / 2) + 50);
        } else {
            do{
              tmpX = Math.floor((128).random((me.game.viewport.width - 128)));
            } while(tmpX < ((me.game.viewport.width / 2) + 200) && tmpX > ((me.game.viewport.width / 2) - 200));
        }

        this.pos.x = tmpX;
        this.pos.y = Math.floor((128).random((me.game.viewport.height) - 128));
    }
});