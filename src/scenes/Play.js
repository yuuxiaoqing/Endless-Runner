class Play extends Phaser.Scene{

    constructor(){
        super('playScene');
    }
     
    //Preload
    preload(){
        this.load.image('playerSprite', './assets/playerAssets/bacon.png');
        this.load.image('joepera', './assets/generalAssets/joe.png');
        this.load.image('joeball', './assets/obstacleAssets/joeball.png')
    }

    //Create Function
    create(){
        //Assigns the Keybinds
        playerLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        playerRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        playerJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        playerAttack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        //Creates the player
        mainPlayer = new PlayerObject(this, game.config.width/2, game.config.height/2, 'playerSprite').setOrigin(0.5);
        mainPlayer.setDepth(1);

        //Adds physics to the player
        this.physics.add.existing(mainPlayer);
        mainPlayer.body.collideWorldBounds = true;
        //mainPlayer.body.setImmovable(true);



        //Adds a ground (temp)
        this.ground = this.physics.add.sprite(320, game.config.width / 2 + 80, 'joepera').setScale(0.2).setOrigin(0.5);
        this.ground.body.allowGravity = false;
        this.ground.body.setImmovable(true);

        //Adds obstacle physics groups
        this.obstacleGroup = this.add.group({
            runChildUpdate: true
        });
        this.obstacleGroup.add(this.ground);

        //Sets a collider between the players and obstacles
        this.physics.add.collider(mainPlayer, this.obstacleGroup);


        //Debug stuff
        this.obstacle = new Obstacle(this, game.config.width / 2, game.config.height / 2 - 200, 'joeball', 0, 30, 30)

        this.physics.add.existing(this.obstacle);
        this.obstacle.setCircle(100);
        this.obstacle.body.allowGravity = false;
        this.obstacle.body.setImmovable(true);
        this.obstacleGroup.add(this.obstacle);



        //tester = this.physics.arcade.add.sprite(32, game.config.height / 2, 'playerSprite').setOrigin(0.5);
        this.add.text(width/2, (height/2)-230, "play scene\npress S to go to endscene").setOrigin(0.5);

        //player (temp)
        //gravity and collision
        this.add.ellipse(width/2, height/2-20, 20, 20, 0XFACADE, 0.5).setOrigin(0.5);
        // a bar for the player to simulate running on the circle (side view)
        //(x,y,width, height, fillcolor, fillalpha)
        
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(){
        //Player update
        mainPlayer.update();
        this.obstacle.update();

        //test
        this.physics.world.collide(mainPlayer, this.obstacleGroup);

        this.physics.velocityFromRotation(this.obstacle.angle, 300, this.obstacle.body.velocity);





        //endgame condition: 1) when the player touches a chopstick 
        //          advance  2) when the player touches a chopstick 3 times

        //1)  when the player touches a chopstick

        //temp scene change
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('endScene');
        }


    }

    //Create Obstacle
    createObstacle(speed){

    }




}


