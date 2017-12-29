import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import Page from '../../components/Page';
import star from './game/assets/star.png';

window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
const Phaser = (window.Phaser = require('phaser/build/custom/phaser-split'));

class Game extends Component {
  game = null;

  preload() {
    this.game.load.image('star', star);
  }
  create() {
    this.game.add.sprite(0, 0, 'star');
  }
  update() {}

  componentWillMount() {
    this.game = new Phaser.Game(200, 200, Phaser.AUTO, 'game', {
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
        <Page title="Game">
          <div id="game" />
        </Page>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
