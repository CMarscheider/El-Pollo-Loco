class Bottle extends MovableObject {
  height = 150;
  width = 150;
  y = 330;

  IMAGE = "img/6_salsa_bottle/salsa_bottle.png";
  offset = {
    top: 20,
    bottom: 20,
    right: 60,
    left: 60,
  };

  constructor() {
    super().loadImage(this.IMAGE);
    this.x = 200 + Math.random() * 2000; //! Zahl zwischen 200 und 2200 */
    this.y = 280 - Math.random() * 200;
  }
}
