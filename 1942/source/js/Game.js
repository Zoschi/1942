define(
    "Game",
    [
        "phaser",
        "Player"
    ],
    function(Phaser, Player) {

        var Game = function() {
            this.game = new Phaser.Game(
            //Phaser.Game.call(this,
                600,
                600,
                Phaser.AUTO, //renderer
                "", //parent(htmlelement)
                null, //state
                false, //transparent
                false, //antialias
                Phaser.Physics.ARCADE //physics
            );
            this.game.state.add("start", {
                preload: this.preload,
                create: this.create,
                update: this.update
            });
        };

        //Game.prototype = Object.create(Phaser.Game.prototype);
        Game.prototype.constructor = Game;

        Game.prototype.preload = function() {
            this.game.load.atlas("fighter", "assets/sprites.png", "assets/sprites.json");
        };

        Game.prototype.create = function() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.player = new Player(this.game, this.cursors);
        };

        Game.prototype.update = function() {
            this.player.update();
        };

        Game.prototype.start = function() {
            this.game.state.start("start");
        };

        return Game;

    }
)