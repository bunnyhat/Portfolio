game.PlayerBodyManager = me.Container.extend({
	init : function(player) {
		this._super(me.Container, "init", [0, 0]);
		this.autoSort = false;
		this.size = player.bodyLength;
		this.currentSize = 0;
		this.playerRef = player;
		this.firstBodySpawn = true;
	},

	update : function(time) {
		if(!game.data.isPaused) {
			this._super(me.Container, "update", [time]);

			if(this.size != this.playerRef.bodyLength) {
				this.size = this.playerRef.bodyLength;
			}

			if(this.currentSize < this.size) {
				this.increaseBodyLength(this.playerRef);
				this.currentSize = this.size;
			}

			this.setTargetPos(this.playerRef);
		}
		return true;
	},

	increaseBodyLength : function(player) {
		for(var i = this.currentSize; i < this.size; i++) {
			this.addChild(me.pool.pull("playerBody", [player.playerNum]), this.size);

			if(!this.firstBodySpawn) {
				this.getChildAt(i).pos.x = this.getChildAt(i - 1).pos.x;
				this.getChildAt(i).pos.y = this.getChildAt(i - 1).pos.y;
			} else {
				this.getChildAt(i).pos.x = player.pos.x;
				this.getChildAt(i).pos.y = player.pos.y;
			}

			console.log(this.getChildAt(i).tragetTeleported);
		}
		this.updateChildBounds();

		if(this.firstBodySpawn) {
			this.firstBodySpawn = false;
		}
	},

	setTargetPos : function(player) {
		for(var i = this.currentSize - 1; i >= 0; i--) {
			this.getChildAt(i).vel = player.vel;
			
			if(i != 0) {
				this.getChildAt(i).setTargetPos(this.getChildAt(i - 1).pos, this.getChildAt(i - 1).currentDir, this.getChildAt(i - 1).teleported);
			} else {
				this.getChildAt(i).setTargetPos(player.pos, player.currentDir, player.teleported);
				if(this.getChildAt(i).body.collisionType == me.collision.types.NPC_OBJECT){
					this.getChildAt(i).body.collisionType = me.collision.types.NO_OBJECT
				}

				if(player.teleported) {
					player.teleported = false;
				}
			}

			if(this.getChildAt(i).teleported) {
				this.getChildAt(i).teleported = false;
			}
		}
	}
});