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
        this.add.text(width/2, (height/2)-40, "end scene(score, high score)").setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.menu = this.add.text(width/2, height/2+100, ">menu<").setOrigin(0.5);
        this.menu.setInteractive().on('pointerdown', ()=>{

            this.scene.start('menuScene');

        });

        this.restart = this.add.text(width/2, height/2, ">restart<").setOrigin(0.5);
        this.restart.setInteractive().on('pointerdown',()=>{

            this.scene.start('playScene');

        })
    }
    update(){

    }

}