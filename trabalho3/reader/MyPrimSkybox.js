function MyPrimSkybox(scene,size) {
    CGFobject.call(this,scene);
    this.scene = scene;
    this.rect = new MyPrimRect(scene,-size/2,-size/2,size/2,size/2);
    this.size = size;
};

MyPrimSkybox.prototype.constructor=MyPrimSkybox;

MyPrimSkybox.prototype.display = function(){
     this.scene.registerForPick(144, this.rect);
    //front
     this.scene.pushMatrix();
        this.scene.translate(0,0,this.size/2);
        this.scene.rotate(Math.PI,0,1,0);
        this.rect.setTexCoords(0.25,0.5,0.333,0.666);
        this.rect.display();
     this.scene.popMatrix();
     //right
     this.scene.pushMatrix();
        this.scene.translate(-this.size/2,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.rect.setTexCoords(0.5,0.75,0.3337,0.665);
        this.rect.display();
     this.scene.popMatrix();
     //left
     this.scene.pushMatrix();
        this.scene.translate(this.size/2,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.rect.setTexCoords(0,0.25,0.3337,0.666);
        this.rect.display();
     this.scene.popMatrix();
     //back
     this.scene.pushMatrix();
        this.scene.translate(0,0,-this.size/2);
        this.scene.rotate(0,0,1,0);
        this.rect.setTexCoords(0.75,1,0.3337,0.666);
        this.rect.display();
     this.scene.popMatrix();
     //top
     this.scene.pushMatrix();
        this.scene.translate(0,this.size/2,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.rect.setTexCoords(0.251,0.499,0.001,0.333);
        this.rect.display();
     this.scene.popMatrix();
     //bottom
     this.scene.pushMatrix();
        this.scene.translate(0,-this.size/2,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.rect.setTexCoords(0.251,0.499,0.666,0.999);
        this.rect.display();
     this.scene.popMatrix();
 }