define(
    "Game",
    [
        "phaser",
        "Player",
        "EnemyGroup",
        "Enemy"
    ],
    function(Phaser, Player, EnemyGroup, Enemy) {

        var PlayState = function() {
            return {
                preload: function () {
                    this.load.atlas("sprites", "assets/sprites.png", "assets/sprites.json");
                    this.load.image("background", "assets/background.png");
                },
                create: function () {
                    this.physics.startSystem(Phaser.Physics.ARCADE);
                    this._background = this.game.add.tileSprite(0, 0, 800, 600, "background");
                    this._player = new Player(this.game);
                    this._enemies = new EnemyGroup(this.game);
                    this._enemies.start();
                },
                update: function () {
                    this._background.tilePosition.y += 1;
                    this.game.physics.arcade.overlap(this._player, this._enemies, function(player, enemy) {
                        enemy.explode();
                    });
                    this.game.physics.arcade.overlap(this._player._bullets, this._enemies, function(bullet, enemy) {
                        bullet.kill();
                        enemy.explode();
                    });
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