game.GameOverScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        //title screen
        var backgroundImage = new me.Sprite(
            me.game.viewport.width / 2, me.game.viewport.height / 2,
            {
                image: me.loader.getImage('gameOver_screen'),
            }
        );
        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, 1);
        
        me.game.world.addChild(backgroundImage, 1);
        
        me.game.world.addChild(new(me.Renderable.extend({
            //CONSTRUCTOR
            init : function() {
                this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
                this.font = new me.BitmapFont("32x32_font", 32);
                this.scrollertween = new me.Tween(this).to({scrollerpos: -1500}, 10000).onComplete(this.scrollover.bind(this)).start();
                
                this.scroller = "PRESS ENTER TO RETURN TO MAIN MENU";
                this.scrollerpos = 2000;
                
                this.scoreText = "YOU MANAGED TO GET A SCORE OF";
                
                if(game.data.isMultiplayer) {
                    this.scoreText01 = "PLAYER ";
                    this.scoreText02 = game.data.wonPlayer;
                    this.scoreText03 = " WON WITH A SCORE OF";
                }
                
            },
            
            //CALLBACK FOR THE TWEEN OBJECTS
            scrollover : function() {
                //reset to default value
                this.scrollerpos = 2000;
                this.scrollertween.to({scrollerpos: -1500}, 10000).onComplete(this.scrollover.bind(this)).start();
            },
            
            update : function(dt, renderer) {
                return true;
            },
            
            //DRAWS THE OBJECT
            draw : function(renderer) {
                // this.font.draw (renderer, this.scoreText, me.game.viewport.width/2 - 224, me.game.viewport.height/2 - 20);
                // this.font.draw (renderer, game.data.score, me.game.viewport.width/2 - 48, me.game.viewport.height/2 + 20);
                
                if(game.data.isMultiplayer) {
                    this.font.draw (renderer, this.scoreText01, me.game.viewport.width/2 - 440, me.game.viewport.height/2 - 20);
                    this.font.draw (renderer, this.scoreText02, me.game.viewport.width/2 - 220, me.game.viewport.height/2 - 20);
                    this.font.draw (renderer, this.scoreText03, me.game.viewport.width/2 - 200, me.game.viewport.height/2 - 20);
                    
                } else {
                    this.font.draw (renderer, this.scoreText, me.game.viewport.width/2 - 480, me.game.viewport.height/2 - 20);
                }
                this.font.draw (renderer, game.data.score, me.game.viewport.width/2 - 48, me.game.viewport.height/2 + 20);
                
                this.font.draw(renderer, this.scroller, this.scrollerpos, 650);
            },
            
            onDestroyEvent : function() {
                this.scrollertween.stop();
            }
        })), 2);
        
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        // me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if(action === "enter") {
                me.state.change(me.state.TITLE);
            }
        });
    },
    
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        // me.input.unbindPointer(me.input.pointer.LEFT);
        me.event.unsubscribe(this.handler);
    }
});
