class Chopstick extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, velocity){
        super(scene,Phaser.Math.Between(width-30, 30), height+90,'temp');
        scene.add.existing(this);

        scene.physics.add.existing(this); //add physics chopstick to scene
        this.body.allowGravity = false;
        this.setVelocityY(velocity);
        this.setImmovable();

        this.newChopstick = true;
        
  

    }


    update(){

        super.update();
        if(this.newChopstick && this.y < (height/2)){
            this.newChopstick = false;
            this.scene.addChopstick(this.parent, this.velocity);
            
        }

        if(this.y < - this.height){
            this.destroy();
        }

    
       
    }
}