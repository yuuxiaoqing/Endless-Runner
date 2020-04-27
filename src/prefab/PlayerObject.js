class PlayerObject extends Phaser.GameObjects.Sprite{

    //Constructor
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //Adds the object to the scene
        scene.add.existing(this);

        //Creates Player Movement Variables
        this.speed = 5;
        this.movingLeft;
        this.movingRight;
        this.jumping;
        this.attacking;
        
    }

    update(){
        //Runs the functions
        this.playerInputs();
        this.playerMovement();

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
            this.x -= this.speed;
        if(this.movingRight)
            this.x += this.speed;
        
    }









}