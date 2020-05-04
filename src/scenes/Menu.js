//initial set up, will move menu to a separate js file
class Menu extends Phaser.Scene{

    constructor(){
        super('menuScene');
    }
    preload(){
    }
    create(){
        let textConfig = {
            fontFamily: 'Yeon Sung',
            fill:'#000',
            fontSize: '36px',
        } 
        //background
        this.add.rectangle(0,0,width,height, 0xFFFFFF).setOrigin(0,0);
        this.add.sprite(0, 0, 'bg').setOrigin(0,0);

        //menu background
        this.add.sprite(0, height/2, 'menu').setScale(2).setOrigin(0.5);
        //this.add.rectangle(0,0,width/2.5,height, 0xFACADE).setOrigin(0,0);
        this.add.sprite(10, height / 2 + 200, 'credits').setScale(.8).setOrigin(0,0);


        //title
        this.add.text(width/2-450, height/2-200, "Dim Sum Run", textConfig).setOrigin(0,0);
        this.add.text(width/2-450, height/2-150, "by Angela Jiang, Xiao Qing Yu, Nikolas Sanchez", {fill:'#000',fontFamily: 'Yeon Sung'}).setOrigin(0,0);
        //rotating dimsum table
        //taken from Professor Nathan's BigBodies repo
        //its a square physic body btw
        let table = this.physics.add.sprite(width/2+250, height/2, 'table');
        table.body.setAngularVelocity(-20);
        table.body.allowGravity = false;

        //start button
        this.start = this.add.text(width/2-450, height/2-100, "start game", {fill:'#000', fontSize: '24px',fontFamily: 'Yeon Sung'}).setOrigin(0,0)
        //basic text button method from https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        .setInteractive()
        .on('pointerdown', ()=>{this.start.setStyle({fill:'#fa0', fontSize: '32px',fontFamily: 'Yeon Sung'}); 
        this.clock = this.time.delayedCall(1300, () => {
            this.scene.start("playScene");
        }, null, this);
        this.smokeEffect2.setVelocityY(-800);
        this.sound.play('select');
        })
        .on('pointerover', ()=>{this.start.setStyle({fill:'#fa0', fontSize: '32px',fontFamily: 'Yeon Sung'}); })
        .on('pointerout', ()=>{this.start.setStyle({fill:'#000', fontSize: '24px',fontFamily: 'Yeon Sung'}); });
        //tutorial button takes you to the tutorial image
        this.setting = this.add.text(width/2-450, height/2, "how to play", {fill:'#000', fontSize: '24px',fontFamily: 'Yeon Sung'}).setOrigin(0,0)
        .setInteractive()
        .on('pointerdown', ()=>{this.setting.setStyle({fill:'#fa0', fontSize: '32px',fontFamily: 'Yeon Sung'}); 
        this.clock = this.time.delayedCall(1300, () => {
            this.scene.start("tutorialScene");
        }, null, this);
        this.smokeEffect2.setVelocityY(-800);
        this.sound.play('select');})
        .on('pointerover', ()=>{this.setting.setStyle({fill:'#fa0',fontSize: '32px',fontFamily: 'Yeon Sung'}); })
        .on('pointerout', ()=>{this.setting.setStyle({fill:'#000', fontSize: '24px',fontFamily: 'Yeon Sung'}); });


        //Checks Local Storage
        if(window.localStorage){
            console.log('can locally store');
        } else {
            console.log('cannot locally store');
        }

        this.smokeEffect1 = this.physics.add.sprite(width/2, height/2, 'smoke').setOrigin(0.5);
        this.smokeEffect1.body.allowGravity = false;
        this.smokeEffect1.setVelocityY(-800);

        this.smokeEffect2 = this.physics.add.sprite(width/2, height/2 + 1000, 'smoke').setOrigin(0.5);
        this.smokeEffect2.body.allowGravity = false;
        //this.smokeEffect2.setVelocityY(-800);

        //Plays the music
        if(!menuMusic.isPlaying)
            menuMusic.play();
        if(gameMusic.isPlaying)
            gameMusic.stop();



    }

    // update(){
      
    // }

}