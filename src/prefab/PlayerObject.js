class PlayerObject extends Phaser.Physics.Arcade.Sprite{

    //Constructor
    constructor(scene, x, y){
        super(scene, x, y, 'player');

        //Adds the object to the scene
        scene.add.existing(this);

        //Creates Player Movement Variables
        this.speed = 300;
        this.movingLeft;
        this.movingRight;

        //Creates the jump variables
        this.jumping;
        this.jumpCount = 1;        
        this.attacking;

    }

    preload(){
    }

    create(){
        let jump = {
            key: 'jumpAnimation',
            frames: this.anims.generateFrameNumbers('playerSpriteSheet', {start: 1,end: 2,first:1}),
            frameRate:3,
            repeat:0
        }
        this.anims.create(jump);
        this.jumpAnimated = this.scene.add.sprite(this.body.x,this.body.y,'playerSprite').play('jumpAnimation');

        let run = {
            key: 'runAnimation',
            frames:  this.anims.generateFrameNumbers('playerSpriteSheet', {start: 3,end: 6,first:3}),
            frameRate:3,
            repeat:0

        }
        this.anims.create(run);
        this.runAnimated = this.scene.add.sprite(this.body.x,this.body.y,'playerSprite').play('runAnimation');
    }

    update(){
        //Runs the functions
        this.playerInputs();
        this.playerMovement();

        if(this.body.velocity.y == 0)
            console.log("Velocity y = 0");

    }

    //Player Inputs
    //Gets the player inputs and checks them, passes them to
    //playerMovement variables
    playerInputs(){
        //Checks Left
        if(playerLeft.isDown){
            this.movingLeft = true;
            console.log("Left Being Pressed");
            this.anims.play('runAnimation', true);
            this.flipSpriteX = true;
        } else {
            this.movingLeft = false;
        }

        //Checks Right
        if(playerRight.isDown){
            this.movingRight = true;
            console.log("Right Being Pressed");
            this.anims.play('runAnimation', true);
            this.flipSpriteX = false;
        } else {
            this.movingRight = false;
        }

        //Checks Jumping
        if(Phaser.Input.Keyboard.JustDown(playerJump)){
            this.jumping = true;
            console.log("Space is being Pressed");
        } else {
            this.jumping = false;
        }

        //Resets generic animation
        if(!playerJump.isDown && !playerRight.isDown && !playerLeft.isDown)
            this.setTexture('player');

    }

    //Novement functions
    //Focuses on the player movement, moving left and right and jumping
    playerMovement(){
        //Left and Right Movement
        if(this.movingLeft)
            this.setVelocityX(-1 * this.speed);
        if(this.movingRight)
            this.setVelocityX(this.speed);

        if(!this.movingLeft && !this.movingRight)
            this.setVelocityX(0);
            
        //The Actual Jump
        if(this.jumpCount > 0 && this.jumping){
            this.anims.play('jumpAnimation', false);
            this.scene.sound.play('jump');
            this.setVelocityY(-500);
            this.jumpCount -= 1;
        }

        //Jump collision stuff
        //Resets the jump
        if(this.body.onFloor() && this.jumpCount == 0 && this.body.velocity.y == 0){
            this.resetJump();
        }

        //Handles jumping on objects (all objects)
        if(this.jumpCount == 0 && this.body.velocity.y == 0  && !this.body.onCeiling()) {
            this.resetJump();
        }
            
        
    }

    //Resets the jump for use outside of this player object.
    resetJump(){
        this.jumpCount = 1;
    }

    //If the thing gets stuck push the player back up
    pushUp(){
        this.setVelocityY(-500);
    }



}