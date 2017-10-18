function Ninja () {
    this.element = document.getElementById('ninja');
}

Ninja.prototype.idle = function () {
   this.element.className = 'ninja-idle';
}

Ninja.prototype.run = function () {
    this.element.className = 'ninja-run';
}

Ninja.prototype.attack = function () {
    this.element.className = 'ninja-attack';
}


