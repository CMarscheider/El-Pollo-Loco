class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 40;
  IMAGES_ALERT = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ATTACK = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  offset = {
    top: 65,
    bottom: 10,
    right: 20,
    left: 20,
  };
  hadFirstContact = false;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ALERT);

    this.x = 2500; //*Position vom Endboss

    this.animate();
  }

  animate() {
    setStoppableInterval(() => {
      
      if (
        world.character &&
        this.distanceCharacterEndboss() >= 400 &&
        !this.isHurt()
      ) {
        this.playAnimation(this.IMAGES_ALERT);
      }
      if (
        world.character &&
        this.distanceCharacterEndboss() < 100 &&
        !this.isHurt()
      ) {
        this.playAnimation(this.IMAGES_ATTACK);
      }
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 150);

    setStoppableInterval(() => {
      this.checkFirstContact();
      if (world.character && this.distanceCharacterEndboss() < 400 && this.hadFirstContact) {
        this.playAnimation(this.IMAGES_WALKING);
        this.endbossMove();
      }
    }, 250);
  }

  distanceCharacterEndboss() {
    return this.x - world.character.x;
  }

  endbossMove() {
    setStoppableInterval(() => {
      if (
        this.distanceCharacterEndboss() < 400 &&
        this.distanceCharacterEndboss() > 100 &&
        !this.isDead()
      ) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  checkFirstContact() {
    if (world.character.x > 2000 && !this.hadFirstContact) {
      this.hadFirstContact = true;
    }
  }
}
