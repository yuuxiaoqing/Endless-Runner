//initial set up, will move menu to a separate js file
class Menu extends Phaser.Scene{

    constructor(){
        super('menuScene');
    }
    // preload(){
        
    // }
    create(){
        this.add.text(game.config.width/2, game.config.height/2, "this dumpling empty, YEET").setOrigin(0.5);
    }

}





//game settings
let config = {

    type: Phaser.CANVAS,
    width:640,
    height:640,
    scene: [Menu]

};

let game = new Phaser.Game(config);
