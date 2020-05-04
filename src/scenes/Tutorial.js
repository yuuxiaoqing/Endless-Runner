class Tutorial extends Phaser.Scene{

    constructor(){
        super('tutorialScene');
    }
    preload(){

        this.load.image('siumai', './assets/obstacleAssets/SPRITE_SiuMai.png');
        this.load.image('stickyrice', './assets/obstacleAssets/SPRITE_StickyRice.png');
        this.load.image('chopstick', './assets/generalAssets/SPRITE_chopstick.png');
        this.load.image('player', './assets/playerAssets/SPRITE_JUMP01.png');
        
       
    }

    create(){

        //background 
        this.add.rectangle(0,0, width, height, 0xFFFFFF).setOrigin(0,0);
        
        //bar at the bottom
        this.add.rectangle(0,500,width,height/2, 0xFACADE).setOrigin(0,0);
        //scene title
        //this.add.text(width/2,height/2-280, 'How To Play',{fontSize:'48px',fontFamily: 'Yeon Sung', fill: '#000'}).setOrigin(0.5);

        //instructions
        this.add.text(width/2,height/2-235, 'You are a delicious dimsum bun on the run from being EATEN!',{fontSize:'30px',fontFamily: 'Yeon Sung', fill: '#000'}).setOrigin(0.5);
        this.add.text(width/2,height/2-165, 'To avoid being eaten:',{fontSize:'48px',fontFamily: 'Yeon Sung', fill: '#000'}).setOrigin(0.5);
        this.add.text(width/2,height/2-100, 'Press ← and → keys to move left and right to dodge the grabby chopsticks',{fontSize:'30px',fontFamily: 'Yeon Sung', fill: '#000'}).setOrigin(0.5);
        this.add.text(width/2,height/2-55, '&',{fontSize:'48px',fontFamily: 'Yeon Sung', fill: '#000'}).setOrigin(0.5);
        this.add.text(width/2,height/2-10, 'Press SPACE to jump over the rotating dimsums.',{fontSize:'30px',fontFamily: 'Yeon Sung', fill: '#000'}).setOrigin(0.5);
        //this.add.text(width/2,height/2-10, `Avoid being eaten by dodging the incoming chopsticks!`,{fontSize:'24px',fontFamily: 'Yeon Sung', fill: '#000'}).setOrigin(0.5);
        this.add.text(width/2,height/2+100, `Stay on the dimsum table or\nYou will be eaten if you fall off!`,{fontSize:'24px',fontFamily: 'Yeon Sung', fill: '#000', align: "center"}).setOrigin(0.5);


        //add images here
        this.add.image(width/2-240,height/2+220,'siumai');
        this.add.image(width/2+240,height/2+220,'stickyrice');
        this.add.image(width/2-330,height/2+130,'player');
        this.add.image(width/2+330,height/2+130,'chopstick');


        //menu button
        //button method from https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        this.menu = this.add.text(width/2, height/2+270, "home screen", {fill: '#000', fontSize: '24px',fontFamily: 'Yeon Sung'}).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', ()=>{this.menu.setStyle({fill: '#fff', fontSize: '36px',fontFamily: 'Yeon Sung'}); this.scene.start('menuScene'); })
        .on('pointerover', ()=>{this.menu.setStyle({fill:'#fff', fontSize: '36px',fontFamily: 'Yeon Sung'});})
        .on('pointerout', ()=>{this.menu.setStyle({fill:'#000', fontSize: '24px',fontFamily: 'Yeon Sung'})});

        //play button
        //button method from https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        this.start = this.add.text(width/2, height/2+230, "start game", {fill: '#000', fontSize: '24px',fontFamily: 'Yeon Sung'}).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', ()=>{this.start.setStyle({fill: '#fff', fontSize: '36px',fontFamily: 'Yeon Sung'}); this.scene.start('playScene'); })
        .on('pointerover', ()=>{this.start.setStyle({fill:'#fff', fontSize: '36px',fontFamily: 'Yeon Sung'});})
        .on('pointerout', ()=>{this.start.setStyle({fill:'#000', fontSize: '24px',fontFamily: 'Yeon Sung'})});

    }


}