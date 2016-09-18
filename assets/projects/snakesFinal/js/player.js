game.Player = me.Entity.extend({
	init : function(playerNum, x, y, currDir) {
		if(playerNum == 1){
			this.image = me.loader.getImage("snakeHead");
		} else {
			this.image = me.loader.getImage("snake02Head");
		}
		this._super(me.Entity, "init", [x, y, {
			image : this.image, 
			width : 32, 
			height: 32
		}]);

        this.body.addShape(new me.Rect(0, 0, 32, 32));
        this.body.updateBounds();
        this.body.setVelocity(0, 0);
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
		this.vel = 150;
		this.currentDir = currDir;

		this.oriTurnTime = 0.3;
		this.turnTime = this.oriTurnTime;
        
        this.collidable = true;
        this.alwaysUpdate = true;

        this.immuneTime = 1;
        this.bodyLength = 2;
        this.teleported = false;

        this.playerNum = playerNum;
	},

     onCollision : function(res, other) {     
        if(other.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            game.data.score += 1;
            other.spawn();
            this.bodyLength++;
        }

        if(other.body.collisionType === me.collision.types.NPC_OBJECT) {
        	if(this.immuneTime <= 0) {
            	me.state.change(me.state.GAMEOVER);

                if(this.playerNum == 1) {
                	game.data.wonPlayer = 2;
                } else {
                	game.data.wonPlayer = 1;
                }
        	}
        }
		
		if(other.body.collisionType === me.collision.types.WORLD_SHAPE) {
			me.state.change(me.state.GAMEOVER);
			game.data.wonPlayer = 1;
			game.data.isMultiplayer = true;
        }

        return false;
    },

	update : function(time) {
		if(!game.data.isPaused) {
			this._super(me.Entity, "update", [time]);

			if(this.immuneTime > 0){
				this.immuneTime -= (time / 1000);
			}

			this.handleTurn(time);
			this.handleMovement(time);

			if(this.pos.y < this.image.height / 2) {
				this.pos.y = me.game.viewport.height - this.image.height / 2;
				this.teleported = true;
			} else if(this.pos.y > me.game.viewport.height - this.image.height / 2) {
				this.pos.y = this.image.height / 2;
				this.teleported = true;
			}

			if(this.pos.x < this.image.width / 2) {
				this.pos.x = me.game.viewport.width - this.image.width / 2;
				this.teleported = true;
			} else if(this.pos.x > me.game.viewport.width - this.image.width / 2) {
				this.pos.x = this.image.width / 2;
				this.teleported = true;
			}
		}

		return true;
	},

	handleTurn : function(time) {
		this.turnTime -= (time / 1000);

		if(this.playerNum == 1) {
			if(this.turnTime <= 0){
				if(this.currentDir == "UP" || this.currentDir == "DOWN") {
					if(me.input.isKeyPressed("left")) {
						this.currentDir = "LEFT";
						this.turnTime = this.oriTurnTime;
					} else if(me.input.isKeyPressed("right")) {
						this.currentDir = "RIGHT";
						this.turnTime = this.oriTurnTime;
					}
				} else if(this.currentDir == "LEFT" || this.currentDir == "RIGHT") {
					if(me.input.isKeyPressed("up")) {
						this.currentDir = "UP";
						this.turnTime = this.oriTurnTime;
					} else if(me.input.isKeyPressed("down")) {
						this.currentDir = "DOWN";
						this.turnTime = this.oriTurnTime;
					}
				}
			}
		} else if(this.playerNum == 2) {
			if(this.turnTime <= 0){
				if(this.currentDir == "UP" || this.currentDir == "DOWN") {
					if(me.input.isKeyPressed("leftTwo")) {
						this.currentDir = "LEFT";
						this.turnTime = this.oriTurnTime;
					} else if(me.input.isKeyPressed("rightTwo")) {
						this.currentDir = "RIGHT";
						this.turnTime = this.oriTurnTime;
					}
				} else if(this.currentDir == "LEFT" || this.currentDir == "RIGHT") {
					if(me.input.isKeyPressed("upTwo")) {
						this.currentDir = "UP";
						this.turnTime = this.oriTurnTime;
					} else if(me.input.isKeyPressed("downTwo")) {
						this.currentDir = "DOWN";
						this.turnTime = this.oriTurnTime;
					}
				}
			}
		}
	},

	handleMovement : function(time) {
		if(this.currentDir == "UP") {
			this.pos.y -= this.vel * time / 1000;
		} else if(this.currentDir == "DOWN") {
			this.pos.y += this.vel * time / 1000;
		} else if(this.currentDir == "LEFT") {
			this.pos.x -= this.vel * time / 1000;
		} else if(this.currentDir == "RIGHT") {
			this.pos.x += this.vel * time / 1000;
		}
	}
});