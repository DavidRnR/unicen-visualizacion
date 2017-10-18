function Game() {
    this.ninja = new Ninja();
    this.zombie = new Zombie();
    this.parallaxLayer1 = document.getElementsByClassName('cyberpunk-back-1')[0];
    this.parallaxLayer2 = document.getElementsByClassName('cyberpunk-back-2')[0];
    this.parallaxLayer3 = document.getElementsByClassName('cyberpunk-back-3')[0];
  
}

Game.prototype.update = function () {
    var ninja = this.ninja;
    var zombie = this.zombie;
    zombie.move();
    
    setInterval(function() {
        if(Math.abs(ninja.element.offsetLeft - zombie.element.offsetLeft) < 120) {
            console.log('crash!');
            if(ninja.status == 'attack') {
                zombie.die();
                clearInterval(zombie.movesInterval);
            }
            else {
                ninja.die();
            }
        }
    },100);
}

function onKeyDown (e) {
    var keyCode = e.keyCode;

    if (keyCode == 65) {
        game.ninja.attack();
    }
    else if (keyCode == 83) {
        game.ninja.run();
        game.parallaxLayer1.style.webkitAnimationPlayState = "running";
        game.parallaxLayer2.style.webkitAnimationPlayState = "running";
        game.parallaxLayer3.style.webkitAnimationPlayState = "running";
    }
};

function onKeyUp (e) {
    game.ninja.idle();
    game.parallaxLayer1.style.webkitAnimationPlayState = "paused";
    game.parallaxLayer2.style.webkitAnimationPlayState = "paused";
    game.parallaxLayer3.style.webkitAnimationPlayState = "paused";
};