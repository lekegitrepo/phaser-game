import "phaser";
import config from "./config";
import Scene1 from "./Scene1";
import Scene2 from "./Scene2";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("bootGame", Scene1);
    this.scene.add("playGame", Scene2);
    this.scene.start("bootGame");
  }
}

window.game = new Game();
