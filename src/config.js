import "phaser";

console.log("this config file");

export default {
  type: Phaser.AUTO,
  width: 256,
  height: 272,
  backgroundColor: 0x000000,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
};
