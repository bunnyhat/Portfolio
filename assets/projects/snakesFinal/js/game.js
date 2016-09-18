
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(1024, 768, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.pool.register("player", game.Player);
        me.pool.register("playerBody", game.PlayerBody);
        me.pool.register("pallet", game.Pallet);
        me.pool.register("obstacle", game.Obstacle);

        this.playScreen = new game.PlayScreen();
        me.state.set(me.state.PLAY, this.playScreen);

        this.twoPlayerPlayScreen = new game.TwoPlayerPlayScreen();
        me.state.set(me.state.READY, this.twoPlayerPlayScreen);
        
        this.titleScreen = new game.TitleScreen();
        me.state.set(me.state.TITLE, this.titleScreen);

        this.GameOverScreen = new game.GameOverScreen();
        me.state.set(me.state.GAMEOVER, this.GameOverScreen);

        this.howToScreen = new game.HowToPlayScreen();
        me.state.set(me.state.CREDITS, this.howToScreen);
        
        // Start the game.
        me.state.change(me.state.TITLE);
    }
};
