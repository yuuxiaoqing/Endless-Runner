class Endgame extends Phaser.Scene{

    constructor(){
        super('endScene');

    }
    preload(){

    }
    create(){
        //play animation of player dumpling getting eaten
        //display score on top
        //display high score on browser

        //bar at the bottom
        this.add.rectangle(0,500,width,height/2, 0xFACADE).setOrigin(0,0);

        //scene title: remove later and replace with score
        this.add.text(width/2, (height/2)-40, "end scene(score, high score)").setOrigin(0.5);

        //menu button
        //button method from https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        this.menu = this.add.text(width/2+100, height/2+270, "menu", {fill: '#fff', fontSize: '24px',fontFamily: 'Yeon Sung'}).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', ()=>{this.menu.setStyle({fill: '#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'}); this.scene.start('menuScene'); })
        .on('pointerover', ()=>{this.menu.setStyle({fill:'#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'});})
        .on('pointerout', ()=>{this.menu.setStyle({fill:'#fff', fontSize: '24px',fontFamily: 'Yeon Sung'})});

        //restart button
        this.restart = this.add.text(width/2-100, height/2+270, "restart", {fill: '#fff', fontSize: '24px',fontFamily: 'Yeon Sung'}).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown',()=>{this.restart.setStyle({fill: '#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'});this.scene.start('playScene');})
        .on('pointerover',()=>{this.restart.setStyle({fill: '#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'});})
        .on('pointerout',()=>{this.restart.setStyle({fill: '#fff', fontSize: '24px',fontFamily: 'Yeon Sung'});});
    }
    update(){

       
       
    }

}