game.PlayerBody = me.Entity.extend({
	init : function(playerNum) {
		if(playerNum == 1){
			this.image = me.loader.getImage("snakeBody");
		} else {
			this.image = me.loader.getImage("snake02Body");
		}
		this._super(me.Entity, "init", [me.game.viewport.width / 2 - this.image.width / 2, me.game.viewport.height / 2 - this.image.height / 2, {
			image : this.image, 
			width : 32, 
			height: 32
		}]);
		this.vel = 100;
		this.targetX;
		this.targetY;
		this.currentDir = null;
		this.targetpos = this.pos;
        this.body.collisionType = me.collision.types.NPC_OBJECT;

        this.teleported = false;
        this.tragetTeleported = false;
	},

	update : function(time) {
		if(!game.data.isPaused) {
			this._super(me.Entity, "update", [time]);

			if(this.targetX && this.targetY) {
				this.movePos(time);
			}

			if(this.pos.y < this.image.height / 2) {
				this.pos.y = me.game.viewport.height - this.image.height / 2;
				this.teleported = true;
				this.tragetTeleported = false;
			} else if(this.pos.y > me.game.viewport.height - this.image.height / 2) {
				this.pos.y = this.image.height / 2;
				this.teleported = true;
				this.tragetTeleported = false;
			}

			if(this.pos.x < this.image.width / 2) {
				this.pos.x = me.game.viewport.width - this.image.width / 2;
				this.teleported = true;
				this.tragetTeleported = false;
			} else if(this.pos.x > me.game.viewport.width - this.image.width / 2) {
				this.pos.x = this.image.width / 2;
				this.teleported = true;
				this.tragetTeleported = false;
			}

			me.collision.check(this);
		}

		return true;
	},

	movePos : function(time) {
		if(!this.tragetTeleported) {
			if(this.currentDir == "UP") {
				if(this.pos.y > this.targetY) {
					this.pos.y -= this.vel * time / 1000;
				}	
			} else if(this.currentDir == "DOWN") {
				if(this.pos.y < this.targetY) {
					this.pos.y += this.vel * time / 1000;
				}	
			} else if(this.currentDir == "LEFT") {
				if(this.pos.x > this.targetX) {
					this.pos.x -= this.vel * time / 1000;
				}
			} else if(this.currentDir == "RIGHT") {
				if(this.pos.x < this.targetX) {
					this.pos.x += this.vel * time / 1000;
				}	
			}
		} else {
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
	},

	setTargetPos : function(pos, currDir, teleported) {
		var tmpTargX = pos.x;
		var tmpTargY = pos.y;

		if(currDir == "UP"){
			tmpTargY += this.image.height;
		} else if(currDir == "DOWN"){
			tmpTargY -= this.image.height;
		} else if(currDir == "LEFT"){
			tmpTargX += this.image.width;
		} else if(currDir == "RIGHT"){
			tmpTargX -= this.image.width;
		}

		this.targetX = tmpTargX;
		this.targetY = tmpTargY;

		this.setCurrentDir(tmpTargX, tmpTargY, currDir);

		if(teleported == true) {
			this.tragetTeleported = true;
		}
	},

	setCurrentDir : function(targPosX, targPosY, currDir) {
		if(this.pos.x == targPosX || this.pos.y == targPosY) {
			this.currentDir = currDir;
		}
	}
});