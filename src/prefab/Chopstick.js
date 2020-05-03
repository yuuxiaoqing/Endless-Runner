class Chopstick extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);


        scene.add.existing(this);


    }
    create(){
     
       
    }

    update(){

        if(this.x <= 0){
            this.texture.setFlipX(false);
        }
        if(this.x >=960){
            this.texture.setFlipX(true);
        }
        if(this.y <=0){
            this.texture.setFlipY(false);
        }
        if(this.y >=640){
            this.texture.setFlipY(true);     
        }
    }
}