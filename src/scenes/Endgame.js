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

        //background
        this.add.rectangle(0,0,width,height, 0xFFFFFF).setOrigin(0,0);
        this.add.sprite(0, 0, 'bg').setOrigin(0,0);


        //receipt
        this.add.rectangle(width/3,10,width/3,3*(height/3), 0xD1D1D1).setOrigin(0,0);


        //bar at the bottom
        this.add.rectangle(0,500,width,height/2, 0x084f23).setOrigin(0,0);

        if(score > highScore){
            highScore = score;
            localStorage.setItem('highestScore', highScore);
        }

        //Creates the text font stuff
        let textConfig = {
            fontFamily: 'Yeon Sung',
            fill:'#696969',
            fontSize: '48px',
            align: 'center'
        } 

        let receiptConfig = {
            fontFamily: 'Yeon Sung',
            fill:'#696969',
            fontSize: '24px',
            align: 'center'
        } 
        let listConfig = {
            fontFamily: 'Yeon Sung',
            fill:'#696969',
            fontSize: '16px',
            align: 'center'
        } 
        //this.receiptTitle = this.add.text(width/2, height/2 - 270, "Receipt", textConfig).setOrigin(0.5);
        this.receipt = this.add.text(width/2, height/2 - 270, "Thank you", textConfig).setOrigin(0.5);

        this.receipt = this.add.text(width/2, height/2 - 230, "for playing Dim Sum Run!", receiptConfig).setOrigin(0.5);

      
        this.add.text(width/2, height/2 - 40, "-- 1) suimai x 1xxx --", listConfig).setOrigin(0.5);
        this.add.text(width/2, height/2 - 15, "-- 2) shrimp dumpling x 2xxx --", listConfig).setOrigin(0.5);
        this.add.text(width/2, height/2 + 10, "-- 3) steam bun x 1xxxx --", listConfig).setOrigin(0.5);


        //Scores
        this.scoreTEXT = this.add.text(width/2, height/2 + 80, "Your Total:", textConfig).setOrigin(0.5);
        this.scoreDisplay = this.add.text(width/2, height/2 + 150, "$"+score, textConfig).setOrigin(0.5);

        this.scoreTEXT = this.add.text(width/2, height/2 - 150, "High Score", textConfig).setOrigin(0.5);
        this.scoreDisplay = this.add.text(width/2, height/2 - 100, "$"+highScore, textConfig).setOrigin(0.5);

       
        //menu button
        //button method from https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
        this.menu = this.add.text(width/2+100, height/2+230, "menu", {fill: '#000', fontSize: '48px',fontFamily: 'Yeon Sung'}).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', ()=>{this.menu.setStyle({fill: '#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'}); this.clock = this.time.delayedCall(1300, () => {
            this.scene.start("menuScene");
        }, null, this);
        this.sound.play('select');
        this.smokeEffect2.setVelocityY(-800);})
        .on('pointerover', ()=>{this.menu.setStyle({fill:'#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'});})
        .on('pointerout', ()=>{this.menu.setStyle({fill:'#fff', fontSize: '48px',fontFamily: 'Yeon Sung'})});

        //restart button
        this.restart = this.add.text(width/2-100, height/2+230, "restart", {fill: '#000', fontSize: '48px',fontFamily: 'Yeon Sung'}).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown',()=>{this.restart.setStyle({fill: '#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'});
        this.clock = this.time.delayedCall(1300, () => {
            this.scene.start("playScene");
        }, null, this);
        this.sound.play('select');
        this.smokeEffect2.setVelocityY(-800);})
        .on('pointerover',()=>{this.restart.setStyle({fill: '#fa0', fontSize: '36px',fontFamily: 'Yeon Sung'});})
        .on('pointerout',()=>{this.restart.setStyle({fill: '#fff', fontSize: '48px',fontFamily: 'Yeon Sung'});});
   
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