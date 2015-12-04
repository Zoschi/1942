define(
    "Game",
    [
        "phaser",
        "Player"
    ],
    function(Phaser, Player) {

        var PlayState = function() {
            return {
                preload: function () {
                    this.load.atlas("sprites", "assets/sprites.png", "assets/sprites.json");
                },
                create: function () {
                    this.physics.startSystem(Phaser.Physics.ARCADE);
                    this.player = new Player(this.game);
                },
                update: function () {

                }
            };
        };

        var Game = function() {
            Phaser.Game.call(this,
                600,
                400,
                Phaser.AUTO, //renderer
                "", //parent(htmlelement)
                null, //state
                false, //transparent
                false, //antialias
                Phaser.Physics.ARCADE //physics
            );
            this.state.add("play", PlayState);
        };

        Game.prototype = Object.create(Phaser.Game.prototype);
        Game.prototype.constructor = Game;

        Game.prototype.start = function() {
            this.state.start("play");
        };

        return Game;

    }
)