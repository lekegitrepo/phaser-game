import "phaser";

export default class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    console.log("this Scene2 file");
    this.add.text(20, 20, "Playing game", {
      font: "32px Arial",
      fill: "yellow"
    });
  }
}
