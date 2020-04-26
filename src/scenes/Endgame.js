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
        this.add.text(width/2, height/2, "end scene(score, high score)\npress s to go back to menu").setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update(){

        //change this to a button
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('menuScene');
        }
    }

}