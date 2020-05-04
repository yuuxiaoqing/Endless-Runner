//////////////////////////////////////////////
//CTTECH
//////////////////////////////////////////////
class Obstacle extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, texture, frame, angleUpdater){
        super(scene, x, y, texture, frame);

        //Adds object to the scene
        scene.add.existing(this);

        //Adds the speed of the obstacle as it spins around and stuff
        this.angle = 0;
        this.angleUpdater = angleUpdater;
        this.angleRadians = 0;
    }


    //Movement for the obstacle
    update(){
        //Adjusts the angle
        this.angle += this.angleUpdater;
        this.angleRadians = this.angle * (Math.PI / 180);
    }
    
    
}