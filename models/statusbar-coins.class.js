class StatusbarCoins extends Statusbar {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png', 
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png', 
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png', 
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png', 
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png', 
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    x = 10;
    y = 50;
    constructor () {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }
}