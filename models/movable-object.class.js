class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  groundPosition = 120;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.y = this.groundPosition;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < this.groundPosition;
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imagecache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 25; //! Sprunghöhe*/
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    if (this instanceof Character && !this.isHurt()) {
      this.hitCharacter();
    } else if (this instanceof Endboss && this.energy >= 0.5) {
      this.hitEndboss();
    } else if (this instanceof Chicken && this.energy > 80) {
      this.hitChicken();
    }
    this.timestampLastHit();
  }

  timestampLastHit() {
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  hitCharacter() {
    this.energy -= 20;
  }

  hitEndboss() {
    this.energy -= 6;
  }

  hitChicken() {
    this.energy -= 100;
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; /* Differenct in ms */
    timePassed = timePassed / 1000; /* Difference in seconds */
    return timePassed < 0.5; //!Dauer der Verletzungsanimation  */
  }
}
