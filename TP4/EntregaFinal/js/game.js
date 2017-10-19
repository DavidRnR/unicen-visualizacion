function Game() {
    this.ninja = new Ninja();
    this.zombie = new Zombie();
    this.parallaxLayer1 = document.getElementsByClassName('cyberpunk-back-1')[0];
    this.parallaxLayer2 = document.getElementsByClassName('cyberpunk-back-2')[0];
    this.parallaxLayer3 = document.getElementsByClassName('cyberpunk-back-3')[0];
    this.gameOver = false;
  
}

Game.prototype.update = function () {
    var ninja = this.ninja;
    var zombie = this.zombie;
    var gameOver = this.gameOver;

    zombie.move();
    
    setInterval(function() {

    if(!gameOver) {
        window.addEventListener("keydown", onKeyDown, false);
        window.addEventListener("keyup", onKeyUp, false);

        let divsDistance = Math.abs(ninja.element.offsetLeft - zombie.element.offsetLeft);

        if(zombie.status != 'dead') {
            if(ninja.status == 'attack' &&  divsDistance < 230) {
                // Zombie Die
                zombie.die();
            }
            else if((ninja.status == 'idle' || ninja.status == 'run') && divsDistance < 30) {
                // Ninja Die
                ninja.die();
                
                // Game Over
                gameOver = true;

            }
            
        }
        else if (zombie.status == 'deadMoving') {
            zombie.pausePlayMoveDead(ninja.status);
        }       
        else if (ninja.status == 'run' && zombie.status == 'dead') { 
            console.log('dead');
            zombie.moveDead();   
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