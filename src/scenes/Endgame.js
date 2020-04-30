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

        //from https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        this.menu = this.add.text(width/2, height/2+100, ">menu<", {fill: '#fff'}).setOrigin(0.5)

        .setInteractive()
        .on('pointerdown', ()=>{this.menu.setStyle({fill: '#fa0'}); this.scene.start('menuScene'); })
        .on('pointerover', ()=>{this.menu.setStyle({fill:'#fa0'});})
        .on('pointerout', ()=>{this.menu.setStyle({fill:'#fff'})});
       
        this.restart = this.add.text(width/2, height/2, ">restart<").setOrigin(0.5);
    
        this.restart.setInteractive().on('pointerdown',()=>{

            this.scene.start('playScene');

        });
    }
    update(){

       
       
    }

}