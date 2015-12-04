define(
    "Player",
    [
        "phaser"
    ],
    function(Phaser) {

        var Player = function(game, cursors) {
            this.cursors = cursors;
            Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, "fighter");

            this.frameName = "fighter_default";
            this.animations.add("left", Phaser.Animation.generateFrameNames("fighter_left", 1, 3), 15, false);
            this.animations.add("right", Phaser.Animation.generateFrameNames("fighter_right", 1, 3), 15, false);
            this.scale.setTo(2, 2);
            this.game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            game.add.existing(this);
        };

        Player.prototype = Object.create(Phaser.Sprite.prototype);
        Player.prototype.constructor = Player;

        Player.prototype.update = function() {
            if (this.cursors.left.isDown) {
                this.body.velocity.x = -150;
                this.animations.play("left");
            }
            else if (this.cursors.right.isDown) {
                this.body.velocity.x = 150;
                this.animations.play("right");
            }
            else {
                this.body.velocity.x = 0;
                this.animations.stop();
                this.frameName = "fighter_default";
            }
        };

        return Player;

    }
);