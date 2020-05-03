//initial set up, will move menu to a separate js file
class Menu extends Phaser.Scene{

    constructor(){
        super('menuScene');
    }
    preload(){
        //change it with our actual table design
        this.load.image('table', './assets/generalAssets/table.png');
    }
    create(){
        let textConfig = {
            fontFamily: 'Yeon Sung',
            fill:'#000',
            fontSize: '36px',
        } 
        //background
        this.add.rectangle(0,0,width,height, 0xFFFFFF).setOrigin(0,0);
        //menu background
        this.add.rectangle(0,0,width/2.5,height, 0xFACADE).setOrigin(0,0);
        //title
        this.add.text(width/2-350, height/2-200, "Dim Sum Run", textConfig).setOrigin(0,0);
        this.add.text(width/2-350, height/2-170, "by nanners on cereal", {fill:'#000',fontFamily: 'Yeon Sung'}).setOrigin(0,0);
        //rotating dimsum table
        //taken from Professor Nathan's BigBodies repo
        //its a square physic body btw
        let table = this.physics.add.sprite(width/2+250, height/2, 'table');
        table.body.setAngularVelocity(-20);
        table.body.allowGravity = false;


        //start button
        this.start = this.add.text(width/2-350, height/2-100, "start game", {fill:'#000', fontSize: '24px',fontFamily: 'Yeon Sung'}).setOrigin(0,0)
        //basic text button method from https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        .setInteractive()
        .on('pointerdown', ()=>{this.start.setStyle({fill:'#fa0', fontSize: '32px',fontFamily: 'Yeon Sung'}); this.scene.start("playScene");})
        .on('pointerover', ()=>{this.start.setStyle({fill:'#fa0', fontSize: '32px',fontFamily: 'Yeon Sung'}); })
        .on('pointerout', ()=>{this.start.setStyle({fill:'#000', fontSize: '24px',fontFamily: 'Yeon Sung'}); });
        //tutorial button takes you to the tutorial image
        this.setting = this.add.text(width/2-350, height/2, "how to play", {fill:'#000', fontSize: '24px',fontFamily: 'Yeon Sung'}).setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', ()=>{this.setting.setStyle({fill:'#fa0', fontSize: '32px',fontFamily: 'Yeon Sung'}); this.scene.start("tutorialScene");})
        .on('pointerover', ()=>{this.setting.setStyle({fill:'#fa0',fontSize: '32px',fontFamily: 'Yeon Sung'}); })
        .on('pointerout', ()=>{this.setting.setStyle({fill:'#000', fontSize: '24px',fontFamily: 'Yeon Sung'}); });



    }

    // update(){
      
    // }

}

//game settings
let config = {

    type: Phaser.CANVAS,
    width:960,
    height:640,
    scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 1000
            }
        }
    },    
    scene: [Menu, Play, Endgame,Tutorial]

};

let game = new Phaser.Game(config);

let width = game.config.width;
let height = game.config.height;
//declare start game key, change to buttons on the screen later
let keyS;

//loading google text, taken from: https://phaser.io/examples/v2/text/google-webfonts
let WebFontConfig = {
    active: function() {game.time.events.add(Phaser.Timer.SECOND,createText,this);},
    google:{
        families: ['Yeon Sung']
    }
}
//Player object
let mainPlayer;

//Player Movement / Keybinds
let playerLeft, playerRight, playerJump, playerAttack;

let color = 0XFFFFFF;
