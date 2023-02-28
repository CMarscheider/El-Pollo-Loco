class Character extends MovableObject {
  groundPosition = 170;
  height = 280;
  y = 80;
  speed = 10;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGE_ENDSCREEN = ["img/9_intro_outro_screens/game_over/game over.png"];
  world;
  walking_sound = new Audio("audio/walking3.mp3");
  jump_sound = new Audio("audio/jump.wav");
  hurt_sound = new Audio("audio/hurt.wav");
  walking = false;
  coins = 0;
  bottles = 0;
  lastHeight = this.y;
  offset = {
    top: 100,
    bottom: 10,
    right: 20,
    left: 20,
  };

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.otherDirection = false;
        this.moveRight();
        this.playWalkingSound();
      }

      if (this.world.keyboard.LEFT && this.x > -400) {
        //! -400 sagt aus wie weit die Figur nach links laufen kann
        this.otherDirection = true;
        this.moveLeft();
        this.playWalkingSound();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        world.playSound(this.jump_sound);
      }

      this.world.camera_x = -this.x + 200; //! Position der Kamera + 100 damit Pepe weiter rechts steht */
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        //! Sterben animation */
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        world.playSound(this.hurt_sound)
      } else if (this.isAboveGround()) {
        //! Jump animation */
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          //! Walk animation */
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 100);
  }

  async playWalkingSound() {
    if (this.walking == false && !this.isAboveGround()) {
      this.walking = true;
      await world.playSound(this.walking_sound);

      /* await this.walking_sound.play(); */
      this.walking = false;
    } else {
      this.walking_sound.pause();
    }
  }
}
