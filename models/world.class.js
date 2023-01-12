class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        /*  this.generateBackgroundObject(); */ /* Übergeben an level.class */
        this.draw();
        this.setWorld();
    }


    /*     generateBackgroundObject() { übergeben ab level.class
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
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);


        /* Draw() wird immer iweder aufgerufen */
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
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
}

