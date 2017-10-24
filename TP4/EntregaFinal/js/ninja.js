function Ninja () {
    this.element = document.getElementById('ninja');
    this.status = 'idle';
    this.look = 'right';
    this.zombiesCounter = 0;
}

Ninja.prototype.idle = function () {
   this.element.className = 'ninja-idle';
   this.status = 'idle';
}

Ninja.prototype.turnLeft = function () {
    this.look = 'left';
    this.element.style.transform = 'scaleX(-0.5) scaleY(0.5)';
}

Ninja.prototype.turnRight = function () {
    this.look = 'right';
    this.element.style.transform = 'scaleX(0.5) scaleY(0.5)';
}

Ninja.prototype.run = function () {
    if(this.look == 'right') {
        this.element.className = 'ninja-run';
        this.status = 'run';
    }
}

Ninja.prototype.attack = function () {
    this.element.className = 'ninja-attack';
    
    ninjaSwordFX.play();
    this.status = 'attack';

}

Ninja.prototype.die = function () {
    this.element.className = 'ninja-die';
    this.element.style.left = '260px';
    this.element.style.top = '210px';
    this.status = 'dead';
}


