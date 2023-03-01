class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  StatusbarHealth = new StatusbarHealth();
  StatusbarCoins = new StatusbarCoins();
  StatusbarBottles = new StatusbarBottles();
  throwableObjects = [];
  collectCoinSound = new Audio("audio/collectcoin.wav");
  collectBottleSound = new Audio("audio/collectbottle.wav");
  timeout = true;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0); /* Kamera zurückschieben */
    //?Space for fixed Objects  */
    this.addToMap(this.StatusbarHealth);
    this.addToMap(this.StatusbarCoins);
    this.addToMap(this.StatusbarBottles);

    this.ctx.translate(this.camera_x, 0); /* Kamera nach vorne schieben */

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    /* Draw() wird immer iweder aufgerufen */
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  setWorld() {
    this.character.world = this;
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  run() {
    setInterval(() => {
      this.checkCollisionsWithEnemy();
      this.checkCollisionsWithCoin();
      this.checkCollisionsWithBottle();
      this.checkThrowBottle();
    }, 100);
  }

  checkThrowBottle() {
    if (
      this.keyboard.D &&
      this.character.bottles >= 0 &&
      this.timeout == true
    ) {
      this.timeout = false;
      this.throwBottle();
    }
  }

  throwBottle() {
    setTimeout(() => {
      let bottle = new ThrowableObject(this.character.x, this.character.y);
      this.throwableObjects.push(bottle);
      this.removeBottle();
      this.StatusbarBottles.setPercentage(this.character.bottles);
      this.timeout = true;
/*       setTimeout(() => {
        this.throwableObjects.splice(0, 1);
      }, 3000); */ //TODO:Flasche Entfernen bei Aufprall!!
    }, 400);
  }

  checkCollisionsWithEnemy() {
    this.level.enemies.forEach((enemy) => {
      this.enemieHurtCharacter(enemy);
      this.hitByBottle(enemy);
    });
  }

  enemieHurtCharacter(enemy) {
    if (this.enemyAlive(enemy) && this.enemyCollidesWithChar(enemy)) {
      if (this.enemyIsChicken(enemy) && !this.isJumping()) {
        this.character.hit();
        this.StatusbarHealth.setPercentage(this.character.energy);
      } else {
        this.jumpOnHead(enemy);
      }
    }
  }

  enemyAlive(enemy) {
    return enemy.energy > 0;
  }

  enemyCollidesWithChar(enemy) {
    return this.character.isColliding(enemy);
  }

  enemyIsChicken(enemy) {
    return enemy instanceof Chicken;
  }

  isJumping() {
    return this.character.isAboveGround();
  }

  jumpOnHead(enemy) {
    enemy.hit();
    this.character.speedY = 20;
    console.log(enemy, " wurde totgehüpft!");
    this.removeChicken(enemy);
  }

  hitByBottle(enemy) {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.isColliding(enemy)) {
        enemy.hit();
        bottle.hitEnemy = true;
        console.log(enemy, " wurde von Flasche getroffen!");
        this.removeChicken(enemy);
      }
    });
  }

  removeChicken(enemy) {
    if (this.enemyIsChicken(enemy)) {
      this.playSound(enemy.soundDied);
      setTimeout(() => {
        let i = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(i, 1);
      }, 1000);
    }
  }

  checkCollisionsWithCoin() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.collectedItem(coin);
        this.addCoin();
        this.StatusbarCoins.setPercentage(this.character.coins);
      }
    });
  }

  checkCollisionsWithBottle() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.collectedItem(bottle);
        this.addBottle();
        this.StatusbarBottles.setPercentage(this.character.bottles);
      }
    });
  }

  collectedItem(item) {
    if (item instanceof Coin) {
      let i = this.level.coins.indexOf(item);
      this.playSound(this.collectCoinSound);
      this.level.coins.splice(i, 1);
    }
    if (item instanceof Bottle) {
      let i = this.level.bottles.indexOf(item);
      this.playSound(this.collectBottleSound);
      this.level.bottles.splice(i, 1);
    }
  }

  addCoin() {
    this.character.coins += 10;
  }

  addBottle() {
    this.character.bottles += 10;
  }

  removeBottle() {
    this.character.bottles -= 10;
  }

  playSound(sound) {
    if (soundActivated) {
      sound.play();
    }
  }
}
