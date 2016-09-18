game.TwoPlayerPlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // me.game.world.addChild(new me.ColorLayer("background", "#B54B24"), 0);
        var backgroundImage = new me.Sprite(
            me.game.viewport.width / 2, me.game.viewport.height / 2,
            {
                image: me.loader.getImage('groundBG'),
            }
        );
        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, 0)
        me.game.world.addChild(backgroundImage, 0);

        game.data.isMultiplayer = true;

        this.playerOne = new game.Player(1, me.game.viewport.width / 4 - 32 / 2, me.game.viewport.height / 4 - 32 / 2, "DOWN");
        me.game.world.addChild(this.playerOne, 1);

        this.playerTwo = new game.Player(2, ((me.game.viewport.width / 4) * 3) - 32 / 2, ((me.game.viewport.height / 4) * 3) - 32 / 2, "UP");
        me.game.world.addChild(this.playerTwo, 1);

        me.game.world.addChild(me.pool.pull("pallet"), 1);

        for(var i = 0; i < 2; i ++){
            me.game.world.addChild(me.pool.pull("obstacle"), 1);
        }

        this.playerOneBodyManager = new game.PlayerBodyManager(this.playerOne);
        me.game.world.addChild(this.playerOneBodyManager, 2);

        this.playerTwoBodyManager = new game.PlayerBodyManager(this.playerTwo);
        me.game.world.addChild(this.playerTwoBodyManager, 2);

        me.input.bindKey(me.input.KEY.LEFT, "leftTwo");
        me.input.bindKey(me.input.KEY.RIGHT, "rightTwo");
        me.input.bindKey(me.input.KEY.UP, "upTwo");
        me.input.bindKey(me.input.KEY.DOWN, "downTwo");

        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.W, "up");
        me.input.bindKey(me.input.KEY.S, "down");

        //me.input.bindKey(me.input.KEY.SPACE, "shoot", true);

        // // reset the score
        game.data.score = 0;

        // // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        game.data.isPaused = false;

        me.input.bindKey(me.input.KEY.P, "pause", true);
        // me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if(action === "pause") {
                game.data.isPaused = !game.data.isPaused;
            }
        });
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.DOWN);

        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.D);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.S);

        //me.input.unbindKey(me.input.KEY.SPACE);
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});