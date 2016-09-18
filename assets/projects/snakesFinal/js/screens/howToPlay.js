game.HowToPlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        //title screen
        var backgroundImage = new me.Sprite(
            me.game.viewport.width / 2, me.game.viewport.height / 2,
            {
                image: me.loader.getImage('howToPlay_screen'),
            }
        );
        backgroundImage.scale(me.game.viewport.width / backgroundImage.width, 1);
        
        me.game.world.addChild(backgroundImage, 1);
        
        me.game.world.addChild(new(me.Renderable.extend({
            //CONSTRUCTOR
            init : function() {
                this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
                this.font = new me.BitmapFont("16x16_font", 16);
                this.scrollertween = new me.Tween(this).to({scrollerpos: -1500}, 15000).onComplete(this.scrollover.bind(this)).start();
                
                this.scroller = "PRESS ENTER TO RETURN TO MAIN MENU";
                this.scrollerpos = 2000;
                
                this.howToText00 = "> SAME RULES AS A REGULAR SNAKES GAME APPLY";

                this.howToText01 = "CONTROLS-";
                this.howToText02 = "    SINGLEPLAYER:";
                this.howToText03 = "        W-A-S-D OR ARROW KEYS TO MOVE THE SNAKE.";
                this.howToText04 = "    MULTIPLAYER:";
                this.howToText05 = "        W-A-S-D TO MOVE PLAYER ONE,";
                this.howToText06 = "        ARROW KEYS TO MOVE PLAYER TWO.";

                this.howToText07 = "EXTRAS-";
                this.howToText08 = "> AVOIDE OBSTICALS.";
                this.howToText09 = "> EAT EGGS TO GROW AND GAIN POINTS.";
                
            },
            
            //CALLBACK FOR THE TWEEN OBJECTS
            scrollover : function() {
                //reset to default value
                this.scrollerpos = 2000;
                this.scrollertween.to({scrollerpos: -1500}, 15000).onComplete(this.scrollover.bind(this)).start();
            },
            
            update : function(dt, renderer) {
                return true;
            },
            
            //DRAWS THE OBJECT
            draw : function(renderer) {
                this.font.draw(renderer, this.howToText00, 100, 225);

                this.font.draw(renderer, this.howToText01, 100, 260);
                this.font.draw(renderer, this.howToText02, 100, 285);
                this.font.draw(renderer, this.howToText03, 100, 310);
                this.font.draw(renderer, this.howToText04, 100, 335);
                this.font.draw(renderer, this.howToText05, 100, 360);
                this.font.draw(renderer, this.howToText06, 100, 385);

                this.font.draw(renderer, this.howToText07, 100, 430);

                this.font.draw(renderer, this.howToText08, 250, 480);
                this.font.draw(renderer, this.howToText09, 250, 600);
                    
                this.font.draw(renderer, this.scroller, this.scrollerpos, 680);
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
