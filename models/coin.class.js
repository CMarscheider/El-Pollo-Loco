class Coin extends MovableObject {
    height = 150;
    width = 150;
    y = 330;
    
    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    offset = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50,
      };

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 2000; //! Zahl zwischen 200 und 2200 */
        this.y = 280 - Math.random() * 200;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150 + Math.random() * 150);
    }
}