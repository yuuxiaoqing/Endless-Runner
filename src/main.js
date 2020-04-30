//initial set up, will move menu to a separate js file
class Menu extends Phaser.Scene{

    constructor(){
        super('menuScene');
    }
    // preload(){
        
    // }
    create(){
        this.color = 0XFFFFFF
        this.add.text(game.config.width/2, game.config.height/2, "this dumpling empty, YEET\nby nanners on cereal").setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //basic start button, wanna change it to image
        this.start = this.add.text(width/2-300, height/2-100, ">start game<", color).setOrigin(0,0);
        this.start.setInteractive().on('pointerdown', ()=>{
        
            this.scene.start("playScene");


        });

        //basic setting button
        this.setting = this.add.text(width/2-300, height/2, ">setting<", color).setOrigin(0,0);
        this.setting.setInteractive().on('pointerdown', ()=>{
            this.scene.start("settingScene");
        });

    }

    update(){
      
    }

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
    scene: [Menu, Play, Endgame,Setting]

};

let game = new Phaser.Game(config);

let width = game.config.width;
let height = game.config.height;
//declare start game key, change to buttons on the screen later
let keyS;

//Player object
let mainPlayer;

//Player Movement / Keybinds
let playerLeft, playerRight, playerJump, playerAttack;

let color = 0XFFFFFF;
