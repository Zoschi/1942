define(
    "Bullet",
    [
        "phaser"
    ],
    function(Phaser) {

        var Bullet = function (game, x, y) {
            Phaser.Sprite.call(this, game, x, y, "sprites");

            this.frameName = "bullet1";
            this.scale.setTo(2, 2);
            this.anchor.setTo(0.5, 0.5);
            this.game.physics.arcade.enable(this);
            this.kill();
            this.checkWorldBounds = true;
            this.events.onOutOfBounds.add(this.kill, this);
            game.add.existing(this);
        };

        Bullet.prototype = Object.create(Phaser.Sprite.prototype);
        Bullet.prototype.constructor = Bullet;

        Bullet.prototype.update = function () {
            this.body.velocity.y = this._velocity;
        };

        Bullet.prototype.fire = function() {
            this._velocity = -300;
        };

        return Bullet;
    }
);