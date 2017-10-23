function Zombie() {
    this.element = document.getElementById('zombie');
    this.status = 'walk';
}

Zombie.prototype.walk = function () {
    this.status = 'walk';
    this.element.className = 'zombie-walk'; 
     
    
    zombieFX.loop = true;
    zombieFX.play();
}

Zombie.prototype.die = function () {
    zombieFX.pause();
    zombieFX.load();
    this.status = 'dead';
    this.element.className = 'zombie-die';

    var that = this;

    this.element.addEventListener("animationend", function () {
        // After Finish the animation start the animation move
        that.moveDead();
    }, false);
}

Zombie.prototype.moveDead = function () {

    this.status = 'deadMoving';
    this.element.className = 'zombie-dead-moving';

    var that = this;

    this.element.addEventListener("animationend", function () {
        that.walk();
    }, false);

}


Zombie.prototype.pausePlayMoveDead = function (ninjaStatus) {
    this.element.style.animationPlayState = (ninjaStatus == 'idle') ? 'paused' : 'running';
}


