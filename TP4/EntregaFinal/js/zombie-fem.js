function ZombieFemale() {
    this.element = document.getElementById('zombie-fem');
    this.status = ZOMBIE_STATUS_WALK;
    this.blood = this.element.childNodes[1];
}

/**
 * Zombie Walk
 */
ZombieFemale.prototype.walk = function () {
    this.blood.style.display = 'none';
    this.status = ZOMBIE_STATUS_WALK;
    this.element.className = 'zombie-fem-walk'; 
     
    //SoundFX
    zombieFX.loop = true;
    zombieFX.play();
}

/**
 * Zombie Die
 */
ZombieFemale.prototype.die = function () {
    //SoundFX
    zombieFX.pause();
    zombieFX.load();

    this.status = ZOMBIE_STATUS_DEAD;
    this.element.className = 'zombie-fem-die';
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
ZombieFemale.prototype.moveDead = function () {

    this.blood.style.display = 'none';
    this.status = ZOMBIE_STATUS_DEADMOVING;
    this.element.className = 'zombie-fem-dead-moving';

    var that = this;

    this.element.addEventListener("animationend", function () {
        
        // Wait 3s and show the Zombie walking again
        setTimeout(function(){
            that.walk();
        },3000);
    }, false);

}

/**
 * Play or Pause the animation when the Zombie is dead.
 */
ZombieFemale.prototype.pausePlayMoveDead = function (ninjaStatus) {
    this.element.style.animationPlayState = (ninjaStatus == NINJA_STATUS_IDLE) ? 'paused' : 'running';
}


