// The Player Sprite
define(
    "Player",
    [
        "phaser",
        "Bullet"
    ],
    function(Phaser, Bullet) {

        var Player = function(game) {
            Phaser.Sprite.call(this, game, game.world.centerX, game.world.bounds.height - 50, "sprites");

            this.frameName = "fighter_default";
            this.animations.add("left", Phaser.Animation.generateFrameNames("fighter_left", 1, 3), 15, false);
            this.animations.add("right", Phaser.Animation.generateFrameNames("fighter_right", 1, 3), 15, false);
            this.scale.setTo(2, 2);
            this.anchor.setTo(0.5, 0.5);
            this.game.physics.arcade.enable(this);
            this.enableBody = true;
            this.body.collideWorldBounds = true;
            this._bulletTime = 0;

            //create bullets
            this._bullets = game.add.group();
            for (var i = 0; i < 20; i++) {
                this._bullets.add(new Bullet(this.game, 0, 0));
            }

            game.add.existing(this);
        };

        Player.prototype = Object.create(Phaser.Sprite.prototype);
        Player.prototype.constructor = Player;

        Player.prototype.update = function() {

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.fireBullet();
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this._cursorRight = false;
                if (!this._cursorLeft) {
                    this.body.velocity.x = -150;
                    this.animations.play("left");
                    this._cursorLeft = true;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
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
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -150;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.body.velocity.y = 150;
            }
            else {
                this.body.velocity.y = 0;
            }

        };

        Player.prototype.fireBullet = function() {
            if (this.game.time.now > this._bulletTime) {
                var bullet = this._bullets.getFirstExists(false);

                if (bullet) {
                    bullet.reset(this.x, this.y - this.body.height / 2);
                    bullet.fire();
                    this._bulletTime = this.game.time.now + 150;
                }
            }
        };

        return Player;

    }
);