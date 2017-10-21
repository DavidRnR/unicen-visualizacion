function Game() {
    this.ninja = new Ninja();
    this.zombie = new Zombie();
    this.parallaxLayer1 = document.getElementsByClassName('cyberpunk-back-1')[0];
    this.parallaxLayer2 = document.getElementsByClassName('cyberpunk-back-2')[0];
    this.parallaxLayer3 = document.getElementsByClassName('cyberpunk-back-3')[0];
    this.gameOver = false;
    this.interval = null;
    this.zombiesScore = document.getElementById('dead-zombies');
  
}

Game.prototype.ready = function () { 

    var that = this;
    var countdown = 3;
    var elm = document.getElementsByClassName('countdown-ready')[0];
    
    var countdownInterval = setInterval(function () {
        
        elm.innerHTML = countdown;


        if(countdown == 0) {
            elm.innerHTML = "¡CORRE!";
            that.hiddenCountdown(elm);
            that.update();
            clearInterval(countdownInterval);
        }
        countdown--;
        
    },2000);

}

Game.prototype.hiddenCountdown = function (elm) { 
    elm.className += " coundown-ready-fade-out";
}

Game.prototype.update = function () {
    var gameThis = this;

    var ninja = this.ninja;
    var zombie = this.zombie;
    zombie.walk();

    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);

    gameThis.interval = setInterval(function() {

    if(!gameThis.gameOver) {
        
        let divsDistance = Math.abs(ninja.element.offsetLeft - zombie.element.offsetLeft);
        
        gameThis.updateScore(ninja.zombiesCounter);

        if(zombie.status != 'dead' && zombie.status != 'deadMoving') {
            if(ninja.status == 'attack' &&  divsDistance < 230) {
                // Zombie Die
                zombie.die();
                ninja.zombiesCounter++;
            }
            else if((ninja.status == 'idle' || ninja.status == 'run') && divsDistance < 30) {
                // Ninja Die
                ninja.die();
                
                // Game Over
                gameThis.gameOver = true;

            }
            
        }
        else if (zombie.status == 'deadMoving' && ninja.status != 'attack') {
            zombie.pausePlayMoveDead(ninja.status);
        }       
        else if (ninja.status == 'run' && zombie.status == 'dead') { 
            zombie.moveDead();   
      
}
        
    }
    else {
        // Game Over
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("keyup", onKeyUp);
        clearInterval(gameThis.interval);
    }
       
    },100);

}

Game.prototype.updateScore = function (newScore) {
    this.zombiesScore.innerHTML = newScore;
}

function onKeyDown(e) {

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

function onKeyUp(e) {

    game.ninja.idle();
    game.parallaxLayer1.style.webkitAnimationPlayState = "paused";
    game.parallaxLayer2.style.webkitAnimationPlayState = "paused";
    game.parallaxLayer3.style.webkitAnimationPlayState = "paused";

};