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


        //bar at the bottom
        this.add.rectangle(0,500,width,height/2, 0xFACADE).setOrigin(0,0);

        if(score > highScore){
            highScore = score;
            localStorage.setItem('highestScore', highScore);
        }

        //Creates the text font stuff
        let textConfig = {
            fontFamily: 'Yeon Sung',
            fill:'#696969',
            fontSize: '36px',
        } 

        //Scores
        this.scoreTEXT = this.add.text(width/2, height/2 + 160, "Score", textConfig).setOrigin(0.5);
        this.scoreDisplay = this.add.text(width/2, height/2 + 200, score, textConfig).setOrigin(0.5);

        this.scoreTEXT = this.add.text(width/2, height/2 - 200, "High Score", textConfig).setOrigin(0.5);
        this.scoreDisplay = this.add.text(width/2, height/2 - 160, highScore, textConfig).setOrigin(0.5);

       
        //menu button
        //button method from https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        this.menu = this.add.text(width/2+100, height/2+270, "menu", {fill: '#fff', fontSize: '24px',fontFamily: 'Yeon Sung'}).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', ()=>{this.menu.setStyle({fill: '#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'}); this.clock = this.time.delayedCall(1300, () => {
            this.scene.start("menuScene");
        }, null, this);
        this.sound.play('select');
        this.smokeEffect2.setVelocityY(-800);})
        .on('pointerover', ()=>{this.menu.setStyle({fill:'#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'});})
        .on('pointerout', ()=>{this.menu.setStyle({fill:'#fff', fontSize: '24px',fontFamily: 'Yeon Sung'})});

        //restart button
        this.restart = this.add.text(width/2-100, height/2+270, "restart", {fill: '#fff', fontSize: '24px',fontFamily: 'Yeon Sung'}).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown',()=>{this.restart.setStyle({fill: '#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'});
        this.clock = this.time.delayedCall(1300, () => {
            this.scene.start("playScene");
        }, null, this);
        this.sound.play('select');
        this.smokeEffect2.setVelocityY(-800);})
        .on('pointerover',()=>{this.restart.setStyle({fill: '#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'});})
        .on('pointerout',()=>{this.restart.setStyle({fill: '#fff', fontSize: '24px',fontFamily: 'Yeon Sung'});});
   
        this.smokeEffect2 = this.physics.add.sprite(width/2, height/2 + 1000, 'smoke').setOrigin(0.5);
        this.smokeEffect2.body.allowGravity = false;

        //Plays the music
        if(!menuMusic.isPlaying)
            menuMusic.play();
        if(gameMusic.isPlaying)
            gameMusic.stop();

    }
    // update(){

       
       
    // }

}