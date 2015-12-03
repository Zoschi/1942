"use strict";
define(
    "Game",
    [
        "phaser"
    ],
    function(phaser) {

        return function Game() {

            var _game = new phaser.Game(800, 600, Phaser.AUTO, "");
            _game.antialias = false;

            var _cursors, _player;

            _game.state.add("play", {
                preload: function() {
                    _game.load.atlas("fighter", "assets/sprites.png", "assets/sprites.json");
                },
                create: function() {
                    _game.physics.startSystem(phaser.Physics.ARCADE);
                    _cursors = _game.input.keyboard.createCursorKeys()
                    _player = _game.add.sprite(_game.world.centerX, _game.world.centerY, "fighter");
                    _player.frameName = "fighter_default";
                    _player.animations.add("left", phaser.Animation.generateFrameNames("fighter_left", 1, 3), 15, false);
                    _player.animations.add("right", phaser.Animation.generateFrameNames("fighter_right", 1, 3), 15, false);
                    _player.scale.setTo(2, 2);
                    _game.physics.arcade.enable(_player);
                    _player.body.collideWorldBounds = true;
                },
                update: function() {
                    if (_cursors.left.isDown) {
                        _player.body.velocity.x = -150;
                        _player.animations.play("left");
                    }
                    else if (_cursors.right.isDown) {
                        _player.body.velocity.x = 150;
                        _player.animations.play("right");
                    }
                    else {
                        _player.body.velocity.x = 0;
                        _player.animations.stop();
                        _player.frameName = "fighter_default";
                    }
                },
                render: function() {
                    //_game.debug.cameraInfo(_game.camera, 32, 500);
                }
            });

            return {
                start: function() {
                    _game.state.start("play");
                }
            };
        };

    }
)