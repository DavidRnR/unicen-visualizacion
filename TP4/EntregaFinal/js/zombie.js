function Zombie() {
    this.element = document.getElementById('zombie');
    this.status = 'walk';
    this.movesInterval = null;
    this.pos = 0;
}

Zombie.prototype.walk = function () {

    this.pos += 250;
    this.element.style.right = this.pos + 'px';
    this.element.className = 'zombie-walk';
     
}

Zombie.prototype.attack = function () {
    this.element.className = 'zombie-attack';
}

Zombie.prototype.die = function () {
    this.element.className = 'zombie-die';
}

Zombie.prototype.move = function () {

   this.movesInterval = setInterval( () => {
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
                this.dead();
                clearInterval(this.movesInterval);
                break;
            default:
                break;
        }
    }, 3000);
}