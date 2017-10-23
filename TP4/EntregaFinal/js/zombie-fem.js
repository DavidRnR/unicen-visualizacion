function ZombieFemale() {
    this.element = document.getElementById('zombie-fem');
    this.status = 'walk';
}

ZombieFemale.prototype.walk = function () {
    this.status = 'walk';
    this.element.className = 'zombie-fem-walk'; 
     
    
    zombieFX.loop = true;
    zombieFX.play();
}

ZombieFemale.prototype.die = function () {
    zombieFX.pause();
    zombieFX.load();
    this.status = 'dead';
    this.element.className = 'zombie-fem-die';

    var that = this;

    this.element.addEventListener("animationend", function () {
        // After Finish the animation start the animation move
        that.moveDead();
    }, false);
}

ZombieFemale.prototype.moveDead = function () {

    this.status = 'deadMoving';
    this.element.className = 'zombie-fem-dead-moving';

    var that = this;

    this.element.addEventListener("animationend", function () {
        that.walk();
    }, false);

}


ZombieFemale.prototype.pausePlayMoveDead = function (ninjaStatus) {
    this.element.style.animationPlayState = (ninjaStatus == 'idle') ? 'paused' : 'running';
}


