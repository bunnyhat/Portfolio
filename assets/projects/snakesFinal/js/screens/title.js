game.TitleScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        //title screen
        var backgroundImage = new me.Sprite(
            me.game.viewport.width / 2, me.game.viewport.height / 2,
            {
                image: me.loader.getImage('title_screen'),
            }
        );
        //backgroundImage.scale(me.game.viewport.width / backgroundImage.width, 1);
        backgroundImage.width = me.game.viewport.width;
        backgroundImage.height = me.game.viewport.height;
        
        me.game.world.addChild(backgroundImage, 1);
        
        me.game.world.addChild(new(me.Renderable.extend({
            //CONSTRUCTOR
            init : function() {
                this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
                this.font = new me.BitmapFont("32x32_font", 32);
                this.scrollertween = new me.Tween(this).to({scrollerpos: -1500}, 10000).onComplete(this.scrollover.bind(this)).start();
                
                this.scroller = "USE 'P' TO PAUSE AND UN-PAUSE";
                this.scrollerpos = 3500;
                
                this.startText01 = "PRESS ENTER FOR ONE PLAYER.";
                this.startText02 = "PRESS SPACE FOR TWO PLAYER.";

                this.startText03 = "PRESS H FOR HELP PAGE.";
            },
            
            //CALLBACK FOR THE TWEEN OBJECTS
            scrollover : function() {
                //reset to default value
                this.scrollerpos = 3500;
                this.scrollertween.to({scrollerpos: -1500}, 10000).onComplete(this.scrollover.bind(this)).start();
            },
            
            update : function(dt) {
                return true;
            },
            
            //DRAWS THE OBJECT
            draw : function(renderer) {
                this.font.draw(renderer, this.scroller, this.scrollerpos, 100);
                this.font.draw (renderer, this.startText01, me.game.viewport.width/2 - 440, me.game.viewport.height/2 + 150);
                this.font.draw (renderer, this.startText02, me.game.viewport.width/2 - 440, me.game.viewport.height/2 + 200);

                this.font.draw (renderer, this.startText03, me.game.viewport.width/2 - 440, me.game.viewport.height/2 + 300);

            },
            
            onDestroyEvent : function() {
                this.scrollertween.stop();
            }
        })), 2);
        
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindKey(me.input.KEY.SPACE, "space", true);
        me.input.bindKey(me.input.KEY.H, "help", true);
        // me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if(action === "enter") {
                me.state.change(me.state.PLAY);
            } else if(action === "space") {
                me.state.change(me.state.READY); // READY is the 2 player
            } else if(action === "help") {
                me.state.change(me.state.CREDITS); // how to player screen
            }
        });
    },
    
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.SPACE);
        // me.input.unbindPointer(me.input.pointer.LEFT);
        me.event.unsubscribe(this.handler);
    }
});
