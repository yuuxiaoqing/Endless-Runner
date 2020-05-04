class Load extends Phaser.Scene{

    constructor(){
        super('loadScene');
    }
    preload(){
        //change it with our actual table design 
        this.load.image('table', './assets/generalAssets/table.png');

        //player assets
        this.load.image('playerSprite', './assets/playerAssets/SPRITE_person.png');
        this.load.atlas('player', './assets/spritesheet.png', './assets/player_sprites.json');
       
        //rotating dimsum sprites
        this.load.image('bao', './assets/obstacleAssets/SPRITE_Bao.png');
        this.load.image('shrimp', './assets/obstacleAssets/SPRITE_ShrimpDumpling.png');
        this.load.image('siumai', './assets/obstacleAssets/SPRITE_SiuMai.png');
        this.load.image('stickyrice', './assets/obstacleAssets/SPRITE_StickyRice.png');

        //general assets
        this.load.image('chopstick', './assets/generalAssets/SPRITE_chopstick.png');
        this.load.image('plate', './assets/generalAssets/SPRITE_plate.png');       
        this.load.image('smoke', './assets/generalAssets/smoke.png');
        
        //Loads audio
        this.load.audio('jump', './assets/generalAssets/Jump.wav');
        this.load.audio('lose', './assets/generalAssets/Lose.wav');
        this.load.audio('select', './assets/generalAssets/selectSound.wav');
        this.load.audio('menuSong', './assets/generalAssets/IshikariLore.mp3');
        this.load.audio('playSong', './assets/generalAssets/Shenyang.mp3');

    }
    create(){
        console.log("Hi. Hello.");

        menuMusic = this.sound.add('menuSong');
        menuMusic.setLoop(true);
        menuMusic.stop();

        gameMusic = this.sound.add('playSong');
        gameMusic.setLoop(true);
        gameMusic.stop();

        this.smokeEffect = this.physics.add.sprite(width/2, height/2, 'smoke').setOrigin(0.5);
        this.smokeEffect.body.allowGravity = false;
        //this.smokeEffect.setVelocityY(-800);
        
        this.loading = this.add.text(width/2, height, "LOADING", {fill:'#000000',fontFamily: 'Yeon Sung'}).setOrigin(0,0);

        

    }

    update(){
        this.clock = this.time.delayedCall(2500, () => {
            this.scene.start("menuScene");
        }, null, this);
        this.loading.y -= 5;
    }

}