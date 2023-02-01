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

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    /* this.generateBackgroundObject(); Übergeben an level.class */
    this.draw();
    this.setWorld();
    this.run();
  }

  /*     generateBackgroundObject() { übergeben an level.class
            let imageNumber = 1;
            for (let i = -719; i < 2158; i += 719) {
                if (imageNumber > 2) {
                    imageNumber = 1;
                }
                this.backgroundObjects.push(
                    new BackgroundObject('img/5_background/layers/air.png', i),
                    new BackgroundObject('img/5_background/layers/3_third_layer/' + imageNumber + '.png', i),
                    new BackgroundObject('img/5_background/layers/2_second_layer/' + imageNumber + '.png', i),
                    new BackgroundObject('img/5_background/layers/1_first_layer/' + imageNumber + '.png', i),
                )
                imageNumber++;
            }
        } */

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0); /* Kamera zurückschieben */
    //?Space for fixed Objects  */
    this.addToMap(this.StatusbarHealth);
    this.addToMap(this.StatusbarCoins);
    this.addToMap(this.StatusbarBottles);

    this.ctx.translate(this.camera_x, 0); /* Kamera nach vorne schieben */

    this.addObjectsToMap(this.level.clouds);
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
    if (this.keyboard.D && this.character.bottles >= 0) {
      let bottle = new ThrowableObject(this.character.x, this.character.y);
      this.throwableObjects.push(bottle);
      this.removeBottle();
      this.StatusbarBottles.setPercentage(this.character.bottles);
    }
  }

  checkCollisionsWithEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.StatusbarHealth.setPercentage(this.character.energy);
      }
    });
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
      this.level.coins.splice(i, 1);
    }
    if (item instanceof Bottle) {
      let i = this.level.bottles.indexOf(item);
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
}
