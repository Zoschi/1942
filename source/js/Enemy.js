define(
    "Enemy",
    [
        "phaser"
    ],
    function(Phaser) {

        var Enemy = function (game) {
            Phaser.Sprite.call(this, game, game.world.bounds.right, 50, "sprites");

            this.frameName = "enemy1_5";
            var aniExplode = this.animations.add("explode", Phaser.Animation.generateFrameNames("enemy1_explode", 1, 6), 15, false);
            aniExplode.onComplete.add(function() {
                this.frameName = "enemy1_5";
            }, this);
            this.scale.setTo(2, 2);
            this.anchor.setTo(0.5, 0.5);
            this.game.physics.arcade.enable(this);
            this.kill();

            game.add.existing(this);
        };

        Enemy.prototype = Object.create(Phaser.Sprite.prototype);
        Enemy.prototype.constructor = Enemy;

        Enemy.prototype.update = function () {
            this.body.velocity.x = this._velocityX;
        };

        Enemy.prototype.start = function() {
            this.reset(this.game.world.bounds.right, 50);
            this._velocityX = -50;
        };

        Enemy.prototype.explode = function() {
            this.animations.play("explode", null, false, true);
        };

        return Enemy;
    }
);