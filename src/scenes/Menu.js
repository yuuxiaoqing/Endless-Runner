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
        table.body.setAngularVelocity(20);
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

        //Plays the music
        if(!menuMusic.isPlaying)
            menuMusic.play();
        if(gameMusic.isPlaying)
            gameMusic.stop();

        //Creates the plates
        this.createPlates();

        //Smoke Effects
        this.smokeEffect1 = this.physics.add.sprite(width/2, height/2, 'smoke').setOrigin(0.5);
        this.smokeEffect1.body.allowGravity = false;
        this.smokeEffect1.setVelocityY(-800);

        this.smokeEffect2 = this.physics.add.sprite(width/2, height/2 + 1000, 'smoke').setOrigin(0.5);
        this.smokeEffect2.body.allowGravity = false;


    }

    update(){
        //////////////////////////////////////////////
        //CTTECH
        //////////////////////////////////////////////
        //Plate Movement
        
        this.physics.velocityFromRotation(this.plate1.angle, 180, this.plate1.body.velocity);
        this.physics.velocityFromRotation(this.plate2.angle, 180, this.plate2.body.velocity);
        this.physics.velocityFromRotation(this.plate3.angle, 180, this.plate3.body.velocity);
        this.physics.velocityFromRotation(this.plate4.angle, 180, this.plate4.body.velocity);
        
        this.plate1.update();
        this.plate2.update();
        this.plate3.update();
        this.plate4.update();
    }




    //////////////////////////////////////////////
    //CTTECH
    //////////////////////////////////////////////
    //Creates the plates, separate function for easy access
    createPlates(){
        //Adds plate 1
        this.plate1 = new Obstacle(this, width/2+250, height / 2 - 200, 'bao',0, 0.015);
        this.physics.add.existing(this.plate1);
        //this.plate1.setCircle(62);
        this.plate1.body.allowGravity = false;
        this.plate1.body.setImmovable(true);

        //Adds plate 2
        this.plate2 = new Obstacle(this, width/2+250 + 200, height / 2, 'shrimp',0, 0.015);
        this.plate2.angle = 1.5708;
        this.physics.add.existing(this.plate2);
        //this.plate2.setCircle(62);
        this.plate2.body.allowGravity = false;
        this.plate2.body.setImmovable(true);

        //Adds plate 3
        this.plate3 = new Obstacle(this, width/2+250, height / 2 + 200, 'siumai',0, 0.015);
        this.plate3.angle = 3.14159;
        this.physics.add.existing(this.plate3);
        //this.plate3.setCircle(62);
        this.plate3.body.allowGravity = false;
        this.plate3.body.setImmovable(true);

        //Adds plate 4
        this.plate4 = new Obstacle(this, width/2+250 - 200, height / 2, 'stickyrice', 0, 0.015);
        this.plate4.angle = 4.71239;
        this.physics.add.existing(this.plate4);
        //this.plate4.setCircle(62);
        this.plate4.body.allowGravity = false;
        this.plate4.body.setImmovable(true);


        //add center plate
        this.centerPlate = new Obstacle(this, width/2+250, height/2, "plate", 0, 0.015);
        this.physics.add.existing(this.centerPlate);
        this.centerPlate.body.allowGravity = false;
        this.centerPlate.body.setImmovable(true);
        this.centerPlate.body.angularVelocity = 30;

    }

}