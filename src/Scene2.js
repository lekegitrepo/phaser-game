import "phaser";
import Beam from "./beam";

import config from "./config";

let gameSettings = {
  playerSpeed: 200
};

export default class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.background = this.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      "background"
    );
    this.background.setOrigin(0, 0);

    this.ship1 = this.add.sprite(
      config.width / 2 - 50,
      config.height / 2,
      "ship"
    );
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "ship2");
    this.ship3 = this.add.sprite(
      config.width / 2 + 50,
      config.height / 2,
      "ship3"
    );

    this.score = 0;

    this.scoreLabel = this.add.bitmapText(10, 5, 'pixelFont', 'Score', 16)

    this.powerUps = this.physics.add.group();

    let maxObjects = 4;

    for (let i = 0; i <= maxObjects; i++) {
      let powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      powerUp.setVelocity(100, 100);

      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.input.on("gameobjectdown", this.destroyShip, this);

    this.player = this.physics.add.sprite(
      config.width / 2 - 8,
      config.height - 64,
      "player"
    );

    this.player.play("thrust");
    this.player.setCollideWorldBounds(true);
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.projectiles = this.add.group();

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    this.physics.add.collider(this.projectiles, this.powerUps, function(
      projectile,
      powerUp
    ) {
      projectile.destroy();
    });

    this.physics.add.overlap(
      this.player,
      this.powerUps,
      this.pickPowerUp,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.hurtPlayer,
      null,
      this
    );

    this.physics.add.overlap(
      this.projectiles,
      this.enemies,
      this.hitEnemy,
      null,
      this
    );
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    this.background.tilePositionY -= 0.5;
    this.movePlayerManager();

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.shootBeam();
    }

    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }

  movePlayerManager() {
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    }

    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed);
    }
  }

  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > config.height) {
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship) {
    ship.y = 0;
    let randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  }

  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

  shootBeam() {
    let beam = new Beam(this);
  }

  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);
  }

  hurtPlayer(player, enemy) {
    this.resetShipPos(enemy);
    player.x = config.width / 2 - 8;
    player.y = config.height - 64;
  }

  hitEnemy(projectile, enemy) {
    projectile.destroy();
    this.resetShipPos(enemy);
  }
}
