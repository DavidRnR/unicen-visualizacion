function Zombie() {
    this.element = document.getElementById('zombie');
    this.status = 'attack';
    this.movesInterval = null;
    this.element.style.visibility = 'hidden';
    this.pos = 0;
}

Zombie.prototype.walk = function () {

    if(this.pos > 500) {
        this.element.style.visibility = 'hidden';
        this.element.style.right = '0px';
        this.pos = -250;
    }
    else if(this.pos == 0) {
        this.element.style.visibility = 'inherit';
        this.pos += 250;
        this.element.style.right = this.pos + 'px';
        this.element.className = 'zombie-walk';
    }
     
}

Zombie.prototype.attack = function () {

    if(this.pos > 500) {
        this.element.style.visibility = 'hidden';
        this.element.style.right = '0px';
        this.pos = -250;
    }
    else {
        this.element.style.visibility = 'inherit';
        this.element.className = 'zombie-attack';
    }
   
}

Zombie.prototype.die = function () {
    this.element.className = 'zombie-die';
    this.status = 'dead';
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