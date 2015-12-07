define(
    "EnemyGroup",
    [
        "phaser",
        "Enemy"
    ],
    function(Phaser, Enemy) {

        var EnemyGroup = function(game) {
            Phaser.Group.call(this, game);

            this.game.physics.arcade.enable(this, true);

            this._startTime = 0;

            for (var i = 0; i <= 10; i++) {
                var enemy = new Enemy(game);
                this.add(enemy);
            }

            game.add.existing(this);

        };

        EnemyGroup.prototype = Object.create(Phaser.Group.prototype);
        EnemyGroup.prototype.constructor = EnemyGroup;

        EnemyGroup.prototype.update = function() {
            this.start();
            this.children.forEach(function(enemy) {
                enemy.update();
            });
        };

        EnemyGroup.prototype.start = function() {

            if (this.game.time.now > this._startTime) {
                var enemy = this.getFirstExists(false);

                if (enemy) {
                    enemy.start();
                    this._startTime = this.game.time.now + 1500;
                }
            }

        };

        return EnemyGroup;
    }
);