function Zombie() {
    this.element = document.getElementById('zombie');
    this.status = 'walk';
}

Zombie.prototype.walk = function () {
    this.status = 'walk';
    this.element.className = 'zombie-walk'; 
}


Zombie.prototype.die = function () {
    this.status = 'dead';
    this.element.className = 'zombie-die';
}

Zombie.prototype.moveDead = function () {

    this.status = 'deadMoving';

    this.element.style.transition = 'right 2s linear';
    this.element.style.animation = 'zombieMoveDead 2s';

    var that = this;

    this.element.addEventListener("webkitAnimationEnd", function () {
        that.element.style = null;
        that.walk();
    }, false);
}


Zombie.prototype.pausePlayMoveDead = function (ninjaStatus) {
    console.log('play pause')
    this.element.style.webkitAnimationPlayState = (ninjaStatus == 'idle') ? 'paused' : 'running';
}



