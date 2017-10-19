function Zombie() {
    this.element = document.getElementById('zombie');
    this.status = 'attack';
    this.movesInterval = null;
    this.pos = 0;
}

Zombie.prototype.walk = function () {

    if (this.pos > 750) {
        this.element.style.right = '-350px';
        this.pos = 0;
    }

    this.pos += 250;
    this.element.style.right = this.pos + 'px';
    this.element.className = 'zombie-walk';


}

Zombie.prototype.attack = function () {

    if (this.pos > 750) {
        this.element.style.right = '-350px';
        this.pos = 0;
    }
    this.element.className = 'zombie-attack';
   
}

Zombie.prototype.die = function () {
    this.element.className = 'zombie-die';
    this.status = 'dead';
}

Zombie.prototype.moveDead = function () {

    this.status = 'deadMoving';

    this.element.style.transition = 'right 2s linear';
    this.element.style.animation = 'zombieMoveDead 2s';

    var that = this;

    this.element.addEventListener("animationend", function () {
        that.status = 'attack';
        that.element.className = 'zombie-attack';
        that.element.style = null;
        that.element.style.right = '-350px';
        that.pos = 0;
        that.move();
    }, false);
}


Zombie.prototype.pausePlayMoveDead = function (ninjaStatus) {
    this.element.style.webkitAnimationPlayState = (ninjaStatus == 'idle') ? 'paused' : 'running';
}

Zombie.prototype.move = function () {

    this.movesInterval = setInterval(() => {
        switch (this.status) {
            case 'walk':
                this.attack();
                this.status = 'attack';
                break;
            case 'attack':
                this.walk();
                this.status = 'walk';
                break;
            case 'dead':
                clearInterval(this.movesInterval);
                break;
            default:
                break;
        }
    }, 3000);
}

