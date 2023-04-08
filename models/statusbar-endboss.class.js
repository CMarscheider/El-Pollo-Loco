class StatusbarHealthBoss extends Statusbar {
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png', 
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png' 
    ];

    x = 500;
    y = 50;
    constructor () {
        super();
        this.loadImages(this.IMAGES);
        this.otherDirection = true;
        this.setPercentage(100);
    }
}