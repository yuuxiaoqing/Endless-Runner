class Tutorial extends Phaser.Scene{

    constructor(){
        super('tutorialScene');
    }

    create(){
        
        //bar at the bottom
        this.add.rectangle(0,500,width,height/2, 0xFACADE).setOrigin(0,0);
        //scene title
        this.add.text(width/2,height/2-270, 'tutorial',{fontSize:'36px',fontFamily: 'Yeon Sung'}).setOrigin(0.5);
        //menu button
        //button method from https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        this.menu = this.add.text(width/2, height/2+270, "home screen", {fill: '#fff', fontSize: '24px',fontFamily: 'Yeon Sung'}).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', ()=>{this.menu.setStyle({fill: '#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'}); this.scene.start('menuScene'); })
        .on('pointerover', ()=>{this.menu.setStyle({fill:'#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'});})
        .on('pointerout', ()=>{this.menu.setStyle({fill:'#fff', fontSize: '24px',fontFamily: 'Yeon Sung'})});

        //play button
        //button method from https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        this.start = this.add.text(width/2, height/2+230, "start game", {fill: '#fff', fontSize: '24px',fontFamily: 'Yeon Sung'}).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', ()=>{this.start.setStyle({fill: '#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'}); this.scene.start('playScene'); })
        .on('pointerover', ()=>{this.start.setStyle({fill:'#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'});})
        .on('pointerout', ()=>{this.start.setStyle({fill:'#fff', fontSize: '24px',fontFamily: 'Yeon Sung'})});

    }


}