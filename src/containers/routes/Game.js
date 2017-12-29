import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import Page from '../../components/Page';
import sky from './game/assets/sky.png';
import platform from './game/assets/platform.png';
import star from './game/assets/star.png';
import dude from './game/assets/dude.png';

window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
const Phaser = (window.Phaser = require('phaser/build/custom/phaser-split'));

class Game extends Component {
  game = null;
  platforms = null;
  stars = null;
  player = null;
  score = null;
  scoreText = null;
  cursors = null;

  preload() {
    this.game.load.image('sky', sky);
    this.game.load.image('ground', platform);
    this.game.load.image('star', star);
    this.game.load.spritesheet('dude', dude, 32, 48);
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.add.sprite(0, 0, 'sky');
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    let ground = this.platforms.create(
      0,
      this.game.world.height - 64,
      'ground'
    );
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    let ledge = this.platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = this.platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;
    this.player = this.game.add.sprite(
      32,
      this.game.world.height - 150,
      'dude'
    );
    this.game.physics.arcade.enable(this.player);
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    this.stars = this.game.add.group();
    this.stars.enableBody = true;
    for (let i = 0; i < 12; i++) {
      let star = this.stars.create(i * 70, 0, 'star');
      star.body.gravity.y = 6;
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    this.score = 0;
    this.scoreText = this.game.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: '32px',
      fill: '#000'
    });
  }

  update() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    const hitPlatform = this.game.physics.arcade.collide(
      this.player,
      this.platforms
    );
    this.game.physics.arcade.collide(this.stars, this.platforms);
    this.game.physics.arcade.overlap(
      this.player,
      this.stars,
      (player, star) => {
        star.kill();
        this.score += 10;
        this.scoreText.text = `Score: ${this.score}`;
      },
      null,
      this
    );
    this.player.body.velocity.x = 0;
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150;
      this.player.animations.play('left');
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150;
      this.player.animations.play('right');
    } else {
      this.player.animations.stop();
      this.player.frame = 4;
    }
    if (
      this.cursors.up.isDown &&
      this.player.body.touching.down &&
      hitPlatform
    ) {
      this.player.body.velocity.y = -350;
    }
  }

  componentWillMount() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
      preload: this.preload,
      create: this.create,
      update: this.update
    });
  }

  componentWillUnmount() {
    this.game.destroy();
  }

  render() {
    return (
      <div className="Game">
        <Page title="Game" subtitle="Phaser game tutorial">
          <div id="game" />
        </Page>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
