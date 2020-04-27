class Play extends Phaser.Scene{

    constructor(){
        super('playScene');
    }
     
    //Preload
    preload(){
        this.load.image('playerSprite', './assets/playerAssets/bacon.png');
    
    }

    create(){
        //Assigns the Keybinds
        playerLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        playerRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        playerJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        playerAttack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        //Creates the player
        this.mainPlayer = new PlayerObject(this, game.config.width/2, game.config.height/2, 'bacon').setOrigin(0.5);


        this.add.text(width/2, (height/2)-230, "play scene\npress S to go to endscene").setOrigin(0.5);

        //player (temp)
        //gravity and collision
        this.add.ellipse(width/2, height/2-20, 20, 20, 0XFACADE, 0.5).setOrigin(0.5);
        // a bar for the player to simulate running on the circle (side view)
        //(x,y,width, height, fillcolor, fillalpha)
        this.add.rectangle(width/2, (height/2),300, 10, 0XFFFFFF, 0.5).setOrigin(0.5);
        
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(){
        //Player update
        this.mainPlayer.update();




        //endgame condition: 1) when the player touches a chopstick 
        //          advance  2) when the player touches a chopstick 3 times

        //1)  when the player touches a chopstick

        //temp scene change
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('endScene');
        }


    }
}

