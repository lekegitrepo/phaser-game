import "phaser";

export default class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    // load images
    this.load.image("background", "assets/background.png");
    this.load.spritesheet("ship", "assets/sprites/ship.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("ship2", "assets/sprites/ship2.png", {
      frameWidth: 32,
      frameHeight: 16
    });

    this.load.spritesheet("ship3", "assets/sprites/ship3.png", {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {
    this.add.text(150, 50, "Loading game...", {
      fontSize: "32px",
      fill: "#fff"
    });

    this.scene.start("playGame");
  }
}
