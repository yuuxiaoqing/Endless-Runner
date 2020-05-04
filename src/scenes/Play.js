class Play extends Phaser.Scene{

    constructor(){
        super('playScene');
    }
     
    //Preload
    preload(){
        
    }

    //Create Function
    create(){
        //background
        this.add.rectangle(0,0, width, height, 0xFFFFFF).setOrigin(0,0);
        //Assigns the Keybinds
        playerLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        playerRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        playerJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        playerAttack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        //Creates the player
        mainPlayer = new PlayerObject(this, game.config.width/2, game.config.height/2).setOrigin(0.5);
        mainPlayer.setDepth(1);
        this.playerShadow = this.physics.add.sprite(mainPlayer.x, mainPlayer.y + 10, 'player');
        this.playerShadow.body.allowGravity = false;
        this.playerShadow.alpha = 0;

        //Adds physics to the player
        this.physics.add.existing(mainPlayer);
        mainPlayer.body.collideWorldBounds = true;

        //Adds obstacle physics groups
        this.obstacleGroup = this.add.group({
            runChildUpdate: true
        });

        //Sets a collider between the players and obstacles
        this.physics.add.collider(mainPlayer, this.obstacleGroup, mainPlayer.resetJump());

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
            fill:'#000000',
            fontSize: '36px',
            align: "center"
        } 

        //Adds a score timer variable
        ///// States
        ///// 0 - Running
        ///// 1 - Finished, adding points
        ///// 2 - Finished, reseting.
        this.pointTimerState = 0;
        score = 0;

        //declare chopsticks group and speed
        this.chopstickGroup = this.add.group({
            runChildUpdate: true
        });
        difficulty_speed = -300

        //Sets up the timer for 10 seconds
        this.clock = this.time.delayedCall(5000, () => {
            this.pointTimerState = 1;
            //add chopsticks
            this.addChopstick();
        }, null, this);

       
        //Creates a score text variable
        this.scoreTEXT = this.add.text(width/2, height/2 + 220, "Score", textConfig).setOrigin(0.5);
        this.scoreDisplay = this.add.text(width/2, height/2 + 200, score, textConfig).setOrigin(0.5);


       // this.jump = this.add.sprite(100,150, 'playerSpriteSheet', 0);
        let jump = {
            key: 'jumpAnimation',
            frames: this.anims.generateFrameNumbers('playerSpriteSheet', {start: 1,end: 2,first:0}),
            frameRate:3,
            repeat:-1
        }


        this.smokeEffect1 = this.physics.add.sprite(width/2, height/2, 'smoke').setOrigin(0.5);
        this.smokeEffect1.body.allowGravity = false;
        this.smokeEffect1.setVelocityY(-800);
        this.smokeEffect1.setDepth(2);

        //Plays the music
        if(!gameMusic.isPlaying)
            gameMusic.play();
        if(menuMusic.isPlaying)
            menuMusic.stop();


        this.anims.create(jump);
        this.testAnimated = this.add.sprite(200,150,'playerSprite').play('jumpAnimation');


        //debug key
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


        
    }

    update(){
        //Player update
        mainPlayer.update();
        this.playerShadow.x = mainPlayer.x;
        this.playerShadow.y = mainPlayer.y + 10;

        //Physics   
        if(this.physics.world.overlap(mainPlayer, this.obstacleGroup) && mainPlayer.y > height / 2){
            mainPlayer.pushUp();
            mainPlayer.resetJump();
        }

        if(this.physics.world.overlap(this.playerShadow, this.obstacleGroup))
            mainPlayer.resetJump();
        
        //end the game if the player collide with the chopstick 
        if(this.physics.world.overlap(mainPlayer, this.chopstickGroup)){
            //console.log("here", this.chopstickGroup.children.entries)
            this.sound.play('lose');
            this.scene.start('endScene');
        }

        //Plate Movement
        this.physics.velocityFromRotation(this.plate1.angle, 390, this.plate1.body.velocity);
        this.physics.velocityFromRotation(this.plate2.angle, 390, this.plate2.body.velocity);
        this.physics.velocityFromRotation(this.plate3.angle, 390, this.plate3.body.velocity);
        this.physics.velocityFromRotation(this.plate4.angle, 390, this.plate4.body.velocity);

        //Player on table checks
        if(!this.physics.world.overlap(mainPlayer, this.table)){
            this.sound.play('lose');
            this.scene.start('endScene');
        }

        //Calculates points
        this.updatePoints();

        
        //debug scene change
        if(Phaser.Input.Keyboard.JustDown(keyS)){
                this.scene.start('endScene');
        }

    }

    //Creates the plates, separate function for easy access
    createPlates(){
        //Adds center plate
        this.plateCenter = new Obstacle(this, width / 2, 470, 'bao');
        this.physics.add.existing(this.plateCenter);
        //this.plateCenter.setCircle(62);
        this.plateCenter.body.allowGravity = false;
        this.plateCenter.body.setImmovable(true);
        this.obstacleGroup.add(this.plateCenter);
        //Adds center plate
        this.plateCenter2 = new Obstacle(this, width / 2 + 130, 470, 'shrimp');
        this.physics.add.existing(this.plateCenter2);
        //this.plateCenter.setCircle(62);
        this.plateCenter2.body.allowGravity = false;
        this.plateCenter2.body.setImmovable(true);
        this.obstacleGroup.add(this.plateCenter2);
        //Adds center plate
        this.plateCenter3 = new Obstacle(this, width / 2 - 130, 470, 'siumai');
        this.physics.add.existing(this.plateCenter3);
        //this.plateCenter.setCircle(62);
        this.plateCenter3.body.allowGravity = false;
        this.plateCenter3.body.setImmovable(true);
        this.obstacleGroup.add(this.plateCenter3);

        //Makes above transparent
        this.plateCenter.alpha = 0;
        this.plateCenter2.alpha = 0;
        this.plateCenter3.alpha = 0;

        //Adds plate 1
        this.plate1 = new Obstacle(this, width / 2, 0 - 330, 'bao');
        this.physics.add.existing(this.plate1);
        //this.plate1.setCircle(62);
        this.plate1.body.allowGravity = false;
        this.plate1.body.setImmovable(true);
        this.obstacleGroup.add(this.plate1);

        //Adds plate 2
        this.plate2 = new Obstacle(this, width / 2 + 330, 0, 'shrimp');
        this.plate2.angle = 1.5708;
        this.physics.add.existing(this.plate2);
        //this.plate2.setCircle(62);
        this.plate2.body.allowGravity = false;
        this.plate2.body.setImmovable(true);
        this.obstacleGroup.add(this.plate2);

        //Adds plate 3
        this.plate3 = new Obstacle(this, width / 2, 0 + 330, 'siumai');
        this.plate3.angle = 3.14159;
        this.physics.add.existing(this.plate3);
        //this.plate3.setCircle(62);
        this.plate3.body.allowGravity = false;
        this.plate3.body.setImmovable(true);
        this.obstacleGroup.add(this.plate3);

        //Adds plate 4
        this.plate4 = new Obstacle(this, width / 2 - 330, 0, 'stickyrice');
        this.plate4.angle = 4.71239;
        this.physics.add.existing(this.plate4);
        //this.plate4.setCircle(62);
        this.plate4.body.allowGravity = false;
        this.plate4.body.setImmovable(true);
        this.obstacleGroup.add(this.plate4);


        //add center plate
        this.centerPlate = new Obstacle(this, width/2, 0, "plate");
        this.physics.add.existing(this.centerPlate);
        this.centerPlate.body.allowGravity = false;
        this.centerPlate.body.setImmovable(true);
        this.centerPlate.body.angularVelocity = 30;

    }

    //Point timer function
    updatePoints(){
        //Updates the score text
        this.scoreDisplay.text = score;

        //State 0 - Now we wait.

        //State 1 - adds the points and moves to the next state
        if(this.pointTimerState == 1){
            score += 10;
            difficulty_speed -= 10;
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
        //difficulty speed is initially set at -300 and decrease by 10 each time the score goes up by 10.
        let chopstick = new Chopstick(this, difficulty_speed);
        console.log("difficulty speed:", difficulty_speed);
        chopstick.setDepth(1);
        this.chopstickGroup.add(chopstick);
    }



}


