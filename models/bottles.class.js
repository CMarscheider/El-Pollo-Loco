class Bottle extends MovableObject {
  y = 360;

  IMAGE = "img/6_salsa_bottle/2_salsa_bottle_on_ground.png";
  offset = {
    top: 20,
    bottom: 10,
    right: 20,
    left: 20,
  };

  constructor() {
    super().loadImage(this.IMAGE);
    /* this.loadImages */
    this.height = 80;
    this.width = 60;
    this.x = 200 + Math.random() * 2000; //! Zahl zwischen 200 und 2200 */
  }
}
