//initial set up, will move menu to a separate js file
class Menu extends Phaser.Scene{

    constructor(){
        super('menuScene');
    }
    // preload(){
        
    // }
    create(){
        this.add.text(game.config.width/2, game.config.height/2, "this dumpling empty, YEET\nby nanners on cereal\npress S to start").setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start("playScene");
        }

    }

}

//game settings
let config = {

    type: Phaser.CANVAS,
    width:960,
    height:640,
    physics: Phaser.Physics.ARCADE,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Menu, Play, Endgame]

};

let game = new Phaser.Game(config);

let width = game.config.width;
let height = game.config.height;
//declare start game key, change to buttons on the screen later
let keyS;

//Player Movement / Keybinds
let playerLeft, playerRight, playerJump, playerAttack;