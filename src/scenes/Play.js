class Play extends Phaser.Scene{

    constructor(){
        super('playScene');
    }
     
    //Preload
    preload(){
        this.load.image('playerSprite', './assets/playerAssets/bacon.png');
       // this.load.image('joepera', './assets/generalAssets/joe.png');
        //this.load.image('weewoo', './assets/generalAssets/table.png');
       // this.load.image('joeball', './assets/obstacleAssets/joeball.png');
        this.load.image('temp', './assets/chop.png');

        this.load.image('table', './assets/generalAssets/table.png');
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

        //Adds obstacle physics groups
        this.obstacleGroup = this.add.group({
            runChildUpdate: true
        });

        //Sets a collider between the players and obstacles
        //this.physics.add.collider(mainPlayer, this.obstacleGroup, mainPlayer.resetJump());


        //add chopsticks
        this.chopstickGroup = this.add.group({
            runChildUpdate: true
        });
        this.addChopstick();

        //Adds the table background
        this.table = this.physics.add.sprite(width / 2, 0, 'table').setScale(1.5).setOrigin(0.5);
        this.table.setCircle(300);
        this.table.body.angularVelocity = 40;
        this.table.body.allowGravity = false;

        //Adds the plates
        this.createPlates();

        //Creates the text font stuff
        let textConfig = {
            fontFamily: 'Yeon Sung',
            fill:'#696969',
            fontSize: '36px',
        } 

        //Adds a score timer variable
        ///// States
        ///// 0 - Running
        ///// 1 - Finished, adding points
        ///// 2 - Finished, reseting.
        this.pointTimerState = 0;
        this.points = 0;

        //Sets up the timer for 10 seconds
        this.clock = this.time.delayedCall(5000, () => {
            this.pointTimerState = 1;
        }, null, this);

        //Creates a score text variable
        this.scoreTEXT = this.add.text(width/2, height/2 + 160, "Score", textConfig).setOrigin(0,0);
        this.scoreDisplay = this.add.text(width/2, height/2 + 200, this.points, textConfig).setOrigin(0,0);


        //tester = this.physics.arcade.add.sprite(32, game.config.height / 2, 'playerSprite').setOrigin(0.5);
        this.add.text(width/2, (height/2)-230, "play scene\npress S to go to endscene").setOrigin(0.5);
        
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        
    }

    update(){
        //Player update
        mainPlayer.update();

        //Physics
        if(this.physics.world.collide(mainPlayer, this.obstacleGroup))
            mainPlayer.resetJump();
        
           
        if(this.physics.world.overlap(mainPlayer, this.obstacleGroup) && mainPlayer.y > height / 2)
            mainPlayer.pushUp();
        
        //end the game if the player collide with the chopstick
        this.physics.world.collide(mainPlayer, this.chopstickGroup,()=>{
            this.scene.start('endScene');
        });
        //Plate Movement
        this.physics.velocityFromRotation(this.plate1.angle, 390, this.plate1.body.velocity);
        this.physics.velocityFromRotation(this.plate2.angle, 390, this.plate2.body.velocity);
        this.physics.velocityFromRotation(this.plate3.angle, 390, this.plate3.body.velocity);
        this.physics.velocityFromRotation(this.plate4.angle, 390, this.plate4.body.velocity);

        //Player on table checks
        if(!this.physics.world.overlap(mainPlayer, this.table))
            this.scene.start('endScene');

        //Calculates points
        this.updatePoints();

        //endgame condition: 1) when the player touches a chopstick 
        //          advance  2) when the player touches a chopstick 3 times

        //1)  when the player touches a chopstick

        //temp scene change
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('endScene');
        }


    }

    //Creates the plates, separate function for easy access
    createPlates(){
        //Adds center plate
        this.plateCenter = new Obstacle(this, width / 2, 470, 'joeball');
        this.physics.add.existing(this.plateCenter);
        //this.plateCenter.setCircle(62);
        this.plateCenter.body.allowGravity = false;
        this.plateCenter.body.setImmovable(true);
        this.obstacleGroup.add(this.plateCenter);
        //Adds center plate
        this.plateCenter2 = new Obstacle(this, width / 2 + 130, 470, 'joeball');
        this.physics.add.existing(this.plateCenter2);
        //this.plateCenter.setCircle(62);
        this.plateCenter2.body.allowGravity = false;
        this.plateCenter2.body.setImmovable(true);
        this.obstacleGroup.add(this.plateCenter2);
        //Adds center plate
        this.plateCenter3 = new Obstacle(this, width / 2 - 130, 470, 'joeball');
        this.physics.add.existing(this.plateCenter3);
        //this.plateCenter.setCircle(62);
        this.plateCenter3.body.allowGravity = false;
        this.plateCenter3.body.setImmovable(true);
        this.obstacleGroup.add(this.plateCenter3);

        //Adds plate 1
        this.plate1 = new Obstacle(this, width / 2, 0 - 330, 'joeball');
        this.physics.add.existing(this.plate1);
        //this.plate1.setCircle(62);
        this.plate1.body.allowGravity = false;
        this.plate1.body.setImmovable(true);
        this.obstacleGroup.add(this.plate1);

        //Adds plate 2
        this.plate2 = new Obstacle(this, width / 2 + 330, 0, 'joeball');
        this.plate2.angle = 1.5708;
        this.physics.add.existing(this.plate2);
        //this.plate2.setCircle(62);
        this.plate2.body.allowGravity = false;
        this.plate2.body.setImmovable(true);
        this.obstacleGroup.add(this.plate2);

        //Adds plate 3
        this.plate3 = new Obstacle(this, width / 2, 0 + 330, 'joeball');
        this.plate3.angle = 3.14159;
        this.physics.add.existing(this.plate3);
        //this.plate3.setCircle(62);
        this.plate3.body.allowGravity = false;
        this.plate3.body.setImmovable(true);
        this.obstacleGroup.add(this.plate3);

        //Adds plate 4
        this.plate4 = new Obstacle(this, width / 2 - 330, 0, 'joeball');
        this.plate4.angle = 4.71239;
        this.physics.add.existing(this.plate4);
        //this.plate4.setCircle(62);
        this.plate4.body.allowGravity = false;
        this.plate4.body.setImmovable(true);
        this.obstacleGroup.add(this.plate4);
    }

    //Point timer function
    updatePoints(){
        //Updates the score text
        this.scoreDisplay.text = this.points;

        //State 0 - Now we wait.

        //State 1 - adds the points and moves to the next state
        if(this.pointTimerState == 1){
            this.points += 10;
            this.pointTimerState = 2;
        }

        //State 2 - Resets the timer after adding points
        if(this.pointTimerState == 2){
            this.clock = this.time.delayedCall(5000, () => {
                this.pointTimerState = 1;
            }, null, this);    
            this.pointTimerState = 0;
        }

    }


    //Adds the chopsticks
    addChopstick(){
        let chopstick = new Chopstick(this, -500);
        this.chopstickGroup.add(chopstick);
    }



}


