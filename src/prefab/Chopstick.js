class Chopstick extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);


        scene.add.existing(this);


    }
    create(){
       // this.physics.add.image(90,60,texture);

       
    }

    update(){


        //this.physics.accelerateTo(this, player.x, player.y, 70, 300,300);

    }
}