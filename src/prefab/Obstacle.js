//////////////////////////////////////////////
//CTTECH
//////////////////////////////////////////////
class Obstacle extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, texture, frame, angleUpdater){
        super(scene, x, y, texture, frame);

        //Adds object to the scene
        scene.add.existing(this);
        //Adds the speed of the obstacle as it spins around and stuff
        this.angleInitial = 0;
        this.angleUpdater = angleUpdater;
        this.angleRadians = 0;
    }


    //Movement for the obstacle
    update(){
        //Adjusts the angle
        this.angleInitial += this.angleUpdater;
        this.angleRadians = this.angleInitial * (Math.PI / 180);
    }
    
    
}