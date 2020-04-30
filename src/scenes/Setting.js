class Setting extends Phaser.Scene{

    constructor(){
        super('settingScene');
    }

    create(){
        this.add.text(width/2,height/2, 'setting').setOrigin(0.5);
        this.menu = this.add.text(width/2,(height/2)+100, ">menu<").setOrigin(0.5);
        
        this.menu.setInteractive().on('pointerdown', ()=>{

            this.scene.start("menuScene");


        });
    }


}