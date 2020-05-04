class PlayerObject extends Phaser.Physics.Arcade.Sprite{

    //Constructor
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

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
        this.anims.on(Phaser.Animations.Events.ADD_ANIMATION, addAnimation, this);
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
        } else {
            this.movingLeft = false;
        }

        //Checks Right
        if(playerRight.isDown){
            this.movingRight = true;
            console.log("Right Being Pressed");
        } else {
            this.movingRight = false;
        }

        //Checks Jumping
        if(Phaser.Input.Keyboard.JustDown(playerJump)){
            this.jumping = true;
            //this.anims.create({key: 'player', frames:this.anims.generateFrameNames('01', {prefix: 'SPRITE_JUMP',end: }), repeat:-1});
            //this.add.sprite(this.x, this.y, "player", 'SPRITE_JUMP02');
            console.log("Space is being Pressed");
        } else {
            this.jumping = false;
        }

        //Check Attacking
        if(Phaser.Input.Keyboard.JustDown(playerAttack)){
            this.attacking = true;
        } else {
            this.attacking = false;
        }
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
        if(this.jumpCount == 0 && this.body.velocity.y == 0  && !this.body.onCeiling()) 
            this.resetJump();
        
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