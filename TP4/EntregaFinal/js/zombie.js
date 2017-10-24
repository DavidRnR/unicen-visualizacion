function Zombie() {
    this.element = document.getElementById('zombie');
    this.status = 'walk';
    this.blood = this.element.childNodes[1];
}

/**
 * Zombie Walk
 */
Zombie.prototype.walk = function () {
    this.blood.style.display = 'none';
    this.status = 'walk';
    this.element.className = 'zombie-walk'; 
     
    
    zombieFX.loop = true;
    zombieFX.play();
}

/**
 * Zombie die
 */
Zombie.prototype.die = function () {
    zombieFX.pause();
    zombieFX.load();
    this.status = 'dead';
    this.element.className = 'zombie-die';
    this.blood.style.display = 'initial';

    var that = this;

    this.element.addEventListener("animationend", function () {
        // After Finish the animation start the animation move
        that.moveDead();
    }, false);
}

/**
 * Zombie Moving after die
 */
Zombie.prototype.moveDead = function () {

    this.blood.style.display = 'none';
    this.status = 'deadMoving';
    this.element.className = 'zombie-dead-moving';

    var that = this;

    this.element.addEventListener("animationend", function () {
        that.walk();
    }, false);

}

/**
 * Play or Pause the animation when the Zombie is dead.
 */
Zombie.prototype.pausePlayMoveDead = function (ninjaStatus) {
    this.element.style.animationPlayState = (ninjaStatus == 'idle') ? 'paused' : 'running';
}


