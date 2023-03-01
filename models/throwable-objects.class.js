class ThrowableObject extends MovableObject {
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  IMAGES_THROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  groundPosition = 370;
  hitEnemy = false;
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_SPLASH);
    this.loadImages(this.IMAGES_THROW);
    this.x = x;
    this.y = y;
    this.height = 80;
    this.throw();
    this.animate();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 8;
    }, 25);
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_THROW);
      if (this.hitEnemy || !this.isAboveGround()) {
        /* this.speedY = -50; */
        this.playAnimation(this.IMAGES_SPLASH);
      }
    }, 100);
  }
}
