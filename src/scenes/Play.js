class Play extends Phaser.Scene{

    constructor(){
        super('playScene');
    }
     
    //Preload
    preload(){
        this.load.image('playerSprite', './assets/playerAssets/bacon.png');
        this.load.image('joepera', './assets/generalAssets/joe.png');
        this.load.image('weewoo', './assets/generalAssets/table.png');
        this.load.image('joeball', './assets/obstacleAssets/joeball.png');
        this.load.image('temp', './assets/chop.png');

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
        mainPlayer.destroyed = false;

        //Adds physics to the player
        this.physics.add.existing(mainPlayer);
        mainPlayer.body.collideWorldBounds = true;

        //Adds obstacle physics groups
        this.obstacleGroup = this.add.group({
            runChildUpdate: true
        });

        //Adds a ground (temp)
        this.ground = this.physics.add.sprite(320, game.config.width / 2 + 80, 'joepera').setScale(0.2).setOrigin(0.5);
        this.ground.body.allowGravity = false;
        this.ground.body.setImmovable(true);

        this.obstacleGroup.add(this.ground);

        //Sets a collider between the players and obstacles
        this.physics.add.collider(mainPlayer, this.obstacleGroup);

        //Adds the table background
        this.weewoo = this.physics.add.sprite(width / 2, height / 2, 'weewoo').setOrigin(0.5);
        this.weewoo.body.angularVelocity = 30;
        this.weewoo.body.allowGravity = false;

        //Debug stuff
        this.obstacle = new Obstacle(this, width / 2, height / 2 - 220, 'joeball', 0)

        this.physics.add.existing(this.obstacle);
        this.obstacle.setCircle(62);
        this.obstacle.body.allowGravity = false;
        this.obstacle.body.setImmovable(true);
        this.obstacleGroup.add(this.obstacle);

        //add chopsticks
        this.chopstickGroup = this.add.group({
            runChildUpdate: true
        });
        this.addChopstick();

        //tester = this.physics.arcade.add.sprite(32, game.config.height / 2, 'playerSprite').setOrigin(0.5);
        this.add.text(width/2, (height/2)-230, "play scene\npress S to go to endscene").setOrigin(0.5);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        
    }

    addChopstick(){
        let chopstick = new Chopstick(this, -450);
        this.chopstickGroup.add(chopstick);
    }



    update(){
        //Player update
        mainPlayer.update();
        this.obstacle.update();

        //Physics
        this.physics.world.collide(mainPlayer, this.obstacleGroup);

        this.physics.velocityFromRotation(this.obstacle.angle, 250, this.obstacle.body.velocity);


        //endgame condition: when the player touches a chopstick 

    
        //temp scene change
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('endScene');
        }


    }

   

}


