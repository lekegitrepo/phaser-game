import "phaser";

export default class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    // load images
    this.load.image("ship", "assets/ship.png");
  }

  create() {
    this.add.image(400, 300, "ship");
    this.add.text(150, 50, "Loading game...", {
      fontSize: "32px",
      fill: "#fff"
    });

    this.scene.start("playGame");
  }
}
