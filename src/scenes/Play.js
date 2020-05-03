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
        //960 x 640

        //create chopstick
        this.chopstick = new Chopstick(this, 0, 500, 'temp').setOrigin(0.5);
        this.chopstick.setDepth(1);
        this.physics.add.existing(this.chopstick);
        this.chopstick.body.allowGravity = false;
        //heads toward the player
        var rotation = this.physics.accelerateToObject(this.chopstick, mainPlayer, 70, 300,300);
        this.physics.velocityFromAngle(rotation,200,this.chopstick.body.velocity);


        //game over condition
        var hit = this.physics.add.overlap(this.chopstick, mainPlayer, ()=>{
            console.log("hit");
            this.chopstick.alpha = 0;
            this.physics.world.removeCollider(hit);
        }, null, this);





        //create chopstick2
        this.chopstick2 = new Chopstick(this, 0, 0, 'temp').setOrigin(0.5);
        this.chopstick2.setDepth(1);
        this.physics.add.existing(this.chopstick2);
        this.chopstick2.body.allowGravity = false;
        //heads toward the player
        var rotation = this.physics.accelerateToObject(this.chopstick2, mainPlayer, 70, 300,300);
        this.physics.velocityFromAngle(rotation,200,this.chopstick2.body.velocity);
  
  
        //game over condition
        var hit2 = this.physics.add.overlap(this.chopstick2, mainPlayer, ()=>{
            console.log("hit");
            this.chopstick2.alpha = 0;
            this.physics.world.removeCollider(hit2);
        }, null, this);
  


        




















        //Debug stuff
        this.obstacle = new Obstacle(this, width / 2, height / 2 - 220, 'joeball', 0)

        this.physics.add.existing(this.obstacle);
        this.obstacle.setCircle(62);
        this.obstacle.body.allowGravity = false;
        this.obstacle.body.setImmovable(true);
        this.obstacleGroup.add(this.obstacle);



        //tester = this.physics.arcade.add.sprite(32, game.config.height / 2, 'playerSprite').setOrigin(0.5);
        this.add.text(width/2, (height/2)-230, "play scene\npress S to go to endscene").setOrigin(0.5);
        
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(){
        //Player update
        mainPlayer.update();
        this.obstacle.update();

        //Physics
        this.physics.world.collide(mainPlayer, this.obstacleGroup);

        this.physics.velocityFromRotation(this.obstacle.angle, 250, this.obstacle.body.velocity);




        //endgame condition: 1) when the player touches a chopstick 
        //          advance  2) when the player touches a chopstick 3 times

        //1)  when the player touches a chopstick

        //temp scene change
        if(Phaser.Input.Keyboard.JustDown(keyS)){
            this.scene.start('endScene');
        }


    }

    //Create Obstacle
    createObstacle(){

    }





}


