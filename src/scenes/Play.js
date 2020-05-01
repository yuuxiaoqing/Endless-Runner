class Play extends Phaser.Scene{

    constructor(){
        super('playScene');
    }
    // preload(){
        
    
    // }

    create(){
        this.add.text(width/2, (height/2)-230, "play scene\npress S to go to endscene",{fontFamily: 'Yeon Sung'}).setOrigin(0.5);

        //player (temp)
        //gravity and collision
        this.add.ellipse(width/2, height/2-20, 20, 20, 0XFACADE, 0.5).setOrigin(0.5);
        // a bar for the player to simulate running on the circle (side view)
        //(x,y,width, height, fillcolor, fillalpha)
        this.add.rectangle(width/2, (height/2),300, 10, 0XFFFFFF, 0.5).setOrigin(0.5);
        
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(){
        //endgame condition: 1) when the player touches a chopstick 
        //          advance  2) when the player touches a chopstick 3 times

        //1)  when the player touches a chopstick

        //temp scene change
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('endScene');
        }


    }
}