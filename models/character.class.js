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
  IMAGES_SLEEPING = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  world;
  walking_sound = new Audio("audio/walking3.mp3");
  jump_sound = new Audio("audio/jump.wav");
  hurt_sound = new Audio("audio/hurt.wav");
  walking = false;
  coins = 0;
  bottles = 0;
  offset = {
    top: 100,
    bottom: 10,
    right: 20,
    left: 20,
  };
  idleTimeout = 0;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEPING);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
    setStoppableInterval(() => this.animateCharater(), 100);
  }

  animateCharater() {
    if (this.isDead()) {
      this.deadAnimation();
    } else if (this.isHurt()) {
      this.hurtAnimation();
    } else if (this.isAboveGround()) {
      this.jumpAnimation();
    } else if (this.isMoving()) {
      this.walkAnimation();
    } else if (this.noKeyIsPressed()) {
      this.characterIdle();
    }
  }

  deadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.idleTimeout = 0;
  }

  hurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.idleTimeout = 0;
    world.playSound(this.hurt_sound);
  }

  jumpAnimation() {
    this.playAnimation(this.IMAGES_JUMPING);
    this.idleTimeout = 0;
  }

  walkAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    this.idleTimeout = 0;
  }

  characterIdle() {
    this.playAnimation(this.IMAGES_IDLE);
    this.idleTimeout += 150;
    if (this.idleTimeout >= 5000) {
      this.playAnimation(this.IMAGES_SLEEPING);
    }
  }

  isMoving() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  moveCharacter() {
    if (this.canMoveRight()) {
      this.moveCharacterRight();
    }
    if (this.canMoveLeft()) {
      this.moveCharacterLeft();
    }
    if (this.canJump()) {
      this.jump();
      world.playSound(this.jump_sound);
    }
    this.world.camera_x = -this.x + 200; //! Position der Kamera + 200 damit Pepe weiter rechts steht */
  }

  moveCharacterRight() {
    this.otherDirection = false;
    this.moveRight();
    this.playWalkingSound();
  }

  moveCharacterLeft() {
    this.otherDirection = true;
    this.moveLeft();
    this.playWalkingSound();
  }

  canMoveLeft() {
    //! -400 sagt aus wie weit die Figur nach links laufen kann
    return this.world.keyboard.LEFT && this.x > -400;
  }

  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  noKeyIsPressed() {
    return (
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT &&
      !this.world.keyboard.UP &&
      !this.world.keyboard.DOWN &&
      !this.world.keyboard.SPACE &&
      !this.world.keyboard.D
    );
  }

  async playWalkingSound() {
    if (this.walking == false && !this.isAboveGround()) {
      this.walking = true;
      await world.playSound(this.walking_sound);
      this.walking = false;
    } else {
      this.walking_sound.pause();
    }
  }
}
