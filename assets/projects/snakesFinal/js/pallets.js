game.Pallet = me.Entity.extend({
  init : function() {
    var image = me.loader.getImage("pallet");
    this._super(me.Entity, "init", [1,1, {
      image : "pallet", 
      width : 16, 
      height: 16
    }]);
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;

        this.spawn();
       
  },
  
  onCollision : function(res, other) {		
    
    if(other.body.collisionType === me.collision.types.WORLD_SHAPE) {
      this.spawn();
    }
    if(other.body.collisionType === me.collision.types.NPC_OBJECT) {
      this.spawn();
    }
      return false;
    },

  update : function(time) {
    this._super(me.Entity, "update", [time]);
        
        me.collision.check(this);
        
        return true;
  },
    
    spawn : function() {
        var randWidth = Math.floor(Math.random() * (me.game.viewport.width - 50)) + 50;
        var randHeight = Math.floor(Math.random() * (me.game.viewport.height - 50)) + 50;
        
        this.pos.x = randWidth;
        this.pos.y = randHeight;
    }
   
});