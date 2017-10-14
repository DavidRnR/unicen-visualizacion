function Zombie() {
    this.status = 'walk';
    this.movesInterval = null;
}

Zombie.prototype.walk = function () {
    document.getElementById('zombie').className = 'zombie-walk';
}

Zombie.prototype.attack = function () {
    document.getElementById('zombie').className = 'zombie-attack';
}

Zombie.prototype.dead = function () {
    document.getElementById('zombie').className = 'zombie-dead';
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