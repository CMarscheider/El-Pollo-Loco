class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2300; 

    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.generateBackgroundObject();
    }


    generateBackgroundObject() {
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
    }
}