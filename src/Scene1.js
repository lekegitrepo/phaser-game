import "phaser";

export default class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    // load images
    this.load.image("background", "assets/background.png");
    this.load.image("ship", "assets/ship.png");
    this.load.image("ship2", "assets/ship2.png");
    this.load.image("ship3", "assets/ship3.png");
  }

  create() {
    this.add.text(150, 50, "Loading game...", {
      fontSize: "32px",
      fill: "#fff"
    });

    this.scene.start("playGame");
  }
}
