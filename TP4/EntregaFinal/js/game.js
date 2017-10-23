function Game() {
    this.ninja = new Ninja();
    this.zombie = new Zombie();
    this.zombieFemale = new ZombieFemale();
    this.parallaxLayer1 = document.getElementsByClassName('cyberpunk-back-1')[0];
    this.parallaxLayer2 = document.getElementsByClassName('cyberpunk-back-2')[0];
    this.parallaxLayer3 = document.getElementsByClassName('cyberpunk-back-3')[0];
    this.gameOver = false;
    this.interval = null;
    this.zombiesScore = document.getElementById('dead-zombies');
    this.gameMessages = document.getElementsByClassName('game-messages')[0];

}

Game.prototype.ready = function () {

    var that = this;
    var countdown = 3;

    var countdownInterval = setInterval(function () {

        that.gameMessages.innerHTML = countdown;


        if (countdown == 0) {
            that.gameMessages.innerHTML = "¡CORRE!";
            that.hiddenCountdown();
            that.update();
            clearInterval(countdownInterval);
        }
        countdown--;

    }, 1000);

}

Game.prototype.hiddenCountdown = function () {
     this.gameMessages.className += " coundown-ready-fade-out";
}

Game.prototype.update = function () {
    var gameThis = this;

    var ninja = this.ninja;
    var zombie = this.zombie;
    var zombieFemale = this.zombieFemale;
    zombie.walk();

    // After 8seg shows up Zombie Female
    setTimeout(function () {
        zombieFemale.walk();
    }, 8000);

    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);

    gameThis.interval = setInterval(function () {

        if (!gameThis.gameOver) {
            
            // Update Score
            gameThis.updateScore(ninja.zombiesCounter);
            
            // **************************** Zombie Male **************************************
            let divsDistance = Math.abs(ninja.element.offsetLeft - zombie.element.offsetLeft);


            if (zombie.status != 'dead' && zombie.status != 'deadMoving') {
                if (ninja.status == 'attack' && divsDistance < 230) {
                    // Zombie Die
                    zombie.die();
                    ninja.zombiesCounter++;
                }
                else if ((ninja.status == 'idle' || ninja.status == 'run') && divsDistance < 30) {
                    // Ninja Die
                    ninja.die();
                    
                    // Game Over
                    gameThis.onGameOver();

                }

            }
            else if (zombie.status == 'deadMoving' && ninja.status != 'attack') {
                zombie.pausePlayMoveDead(ninja.status);
            }
            
            // ***********************************Zombie Female*************************************
            // Zombie Female
            let divsDistanceFem = Math.abs(ninja.element.offsetLeft - zombieFemale.element.offsetLeft);

            if (zombieFemale.status != 'dead' && zombieFemale.status != 'deadMoving') {
                if (ninja.status == 'attack' && divsDistanceFem < 230) {
                    // Zombie Female Die
                    zombieFemale.die();
                    ninja.zombiesCounter++;
                }
                else if ((ninja.status == 'idle' || ninja.status == 'run') && divsDistanceFem < 30) {
                    // Ninja Die
                    ninja.die();

                    // Game Over
                    gameThis.onGameOver();

                }

            }
            else if (zombieFemale.status == 'deadMoving' && ninja.status != 'attack') {
                zombieFemale.pausePlayMoveDead(ninja.status);
            }
        }
        else {
            // Game Over
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);
            clearInterval(gameThis.interval);
        }

    }, 100);

}

/**
 * Update Score
 */
Game.prototype.updateScore = function (newScore) {
    this.zombiesScore.innerHTML = newScore;
}

/**
 * Game Over
 */
Game.prototype.onGameOver = function () {
    this.gameOver = true;
    // Show Message on the Screen
    this.gameMessages.innerHTML = "GAME OVER";
    this.gameMessages.className = "game-messages";
}


/**
 * Get the event for Key Down
 * @param {*} e 
 */
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
    else if (keyCode == 37) {
        game.ninja.turnLeft();
    }
    else if (keyCode == 39) {
        game.ninja.turnRight();
    }


};

/**
 * Get the event for Key Up
 * @param {*} e 
 */
function onKeyUp(e) {

    game.ninja.idle();
    game.parallaxLayer1.style.webkitAnimationPlayState = "paused";
    game.parallaxLayer2.style.webkitAnimationPlayState = "paused";
    game.parallaxLayer3.style.webkitAnimationPlayState = "paused";

};