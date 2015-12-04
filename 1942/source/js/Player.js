define(
    "Player",
    [
        "phaser"
    ],
    function(Phaser) {

        var Player = function(game, cursors) {
            this.cursors = cursors;
            Phaser.Sprite.call(this, game, game.world.centerX, game.world.bounds.height - 32, "fighter");

            this.frameName = "fighter_default";
            this.animations.add("left", Phaser.Animation.generateFrameNames("fighter_left", 1, 3), 15, false);
            this.animations.add("right", Phaser.Animation.generateFrameNames("fighter_right", 1, 3), 15, false);
            this.scale.setTo(2, 2);
            this.anchor.setTo(0.5, 0.5);
            this.game.physics.arcade.enable(this);
            this.body.collideWorldBounds = true;
            game.add.existing(this);
        };

        Player.prototype = Object.create(Phaser.Sprite.prototype);
        Player.prototype.constructor = Player;

        Player.prototype.update = function() {
            if (this.cursors.left.isDown) {
                this._cursorRight = false;
                if (!this._cursorLeft) {
                    this.body.velocity.x = -150;
                    this.animations.play("left");
                    this._cursorLeft = true;
                }
            }
            else if (this.cursors.right.isDown) {
                this._cursorLeft = false;
                if (!this._cursorRight) {
                    this.body.velocity.x = 150;
                    this.animations.play("right");
                    this._cursorRight = true;
                }
            }
            else {
                this._cursorLeft = false;
                this._cursorRight = false;
                this.body.velocity.x = 0;
                this.animations.stop();
                this.frameName = "fighter_default";
            }
            if (this.cursors.up.isDown) {
                this.body.velocity.y = -150;
            }
            else if (this.cursors.down.isDown) {
                this.body.velocity.y = 150;
            }
            else {
                this.body.velocity.y = 0;
            }

        };

        return Player;

    }
);