class Chopstick extends Phaser.Physics.Arcade.Sprite{

    //inspired from Professor's paddle barrier code, edited to work for this game.
    constructor(scene, speed){
        //tweek to generate chopstick only on the table
        super(scene,Phaser.Math.Between(width-30, 30), height+90,'chopstick');
        scene.add.existing(this);

        scene.physics.add.existing(this); //add physics chopstick to scene
        this.body.allowGravity = false; //make it so the obstacle has no gravity
        this.setVelocityY(speed); //make the chopsticks go up
        this.setImmovable();
        this.newChopstick = true;

        
  

    }

    update(){

        super.update();
        
        if(this.newChopstick && this.y < (height/2)){
            this.newChopstick = false;
            
            this.scene.addChopstick(this.parent, this.speed);
            
        }

        if(this.y < - this.height){
            this.destroy();
        }

    
       
    }
}