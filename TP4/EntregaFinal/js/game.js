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

/**
 * Show on the Screen - Get Readey- Counter - etc | Then Start the game
 */
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

/**
 * Hidden Countdown
 */
Game.prototype.hiddenCountdown = function () {
    this.gameMessages.className += " coundown-ready-fade-out";
}

/**
 * Main Update of the Game. Every 10ms check the status of the caracter, etc.
 */
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


            if (zombie.status != ZOMBIE_STATUS_DEAD && zombie.status != ZOMBIE_STATUS_DEADMOVING) {
                if (ninja.status == NINJA_STATUS_ATTACK && ninja.look == NINJA_LOOK_RIGHT && divsDistance < 230) {
                    // Zombie Die
                    zombie.die();
                    ninja.zombiesCounter++;
                }
                else if ((ninja.status == NINJA_STATUS_IDLE || ninja.status == NINJA_STATUS_RUN || ninja.look == NINJA_LOOK_LEFT) && divsDistance < 30) {
                    // Ninja Die
                    ninja.die();

                    // Clear Interval
                    clearInterval(gameThis.interval);
                    gameThis.interval = null;

                    // Game Over
                    gameThis.onGameOver();
                    
               }

            }
            else if (zombie.status == ZOMBIE_STATUS_DEADMOVING && ninja.status != NINJA_STATUS_ATTACK) {
                zombie.pausePlayMoveDead(ninja.status);
            }

            // ***********************************Zombie Female*************************************
            // Zombie Female
            let divsDistanceFem = Math.abs(ninja.element.offsetLeft - zombieFemale.element.offsetLeft);
     
            if (zombieFemale.status != ZOMBIE_STATUS_DEAD && zombieFemale.status != ZOMBIE_STATUS_DEADMOVING) {
                if (ninja.status == NINJA_STATUS_ATTACK && ninja.look == NINJA_LOOK_LEFT && divsDistanceFem < 150) {
                    // Zombie Female Die
                    zombieFemale.die();
                    ninja.zombiesCounter++;
                }
                else if ((ninja.status == NINJA_STATUS_IDLE || ninja.status == NINJA_STATUS_RUN || ninja.look == NINJA_LOOK_RIGHT) && divsDistanceFem < 210) {
                    // Ninja Die
                    ninja.die();

                    // Clear Interval
                    clearInterval(gameThis.interval);
                    gameThis.interval = null;
                    
                    // Game Over
                    gameThis.onGameOver();

                }

            }
            else if (zombieFemale.status == ZOMBIE_STATUS_DEADMOVING && ninja.status != NINJA_STATUS_ATTACK) {
                zombieFemale.pausePlayMoveDead(ninja.status);
            }
        }
        else {
            // Game Over
            clearInterval(gameThis.interval);
            gameThis.onGameOver();
        }

    }, 30);

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

    // remove Event Key Listener
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("keyup", onKeyUp);

    // Set Game Over True
    this.gameOver = true;
    
    // Show Message on the Screen
    this.gameMessages.innerHTML = "GAME OVER";
    this.gameMessages.className = "game-messages";

    var that = this;

    // Show Modal
    $('#ninjaCaosModal').modal('show');

    //Call Firebase API and get Scores
    getScores();
    
    onSubmitScore = document.getElementsByClassName('form-score')[0];

    onSubmitScore.addEventListener('submit', function (event) {
        event.preventDefault();

        // Set data
        let data = {
            name: event.target[0].value,
            zombies: that.ninja.zombiesCounter
        }

        //Call Firebase API to save new record
        postScore(data);
  
    });
}


/**
 * Get the event for Key Down
 * @param {*} e 
 */
function onKeyDown(e) {

    var keyCode = e.keyCode;

    // If the Game is Over prevent do actions
    if (!game.gameOver) {
        if (keyCode == 65) {
            game.ninja.attack();
        }
        else if (keyCode == 83) {
            if (game.ninja.look == NINJA_LOOK_RIGHT) {
                game.ninja.run();
                game.parallaxLayer1.style.webkitAnimationPlayState = "running";
                game.parallaxLayer2.style.webkitAnimationPlayState = "running";
                game.parallaxLayer3.style.webkitAnimationPlayState = "running";
            }

        }
        else if (keyCode == 37) {
            game.ninja.turnLeft();
        }
        else if (keyCode == 39) {
            game.ninja.turnRight();
        }
    }

};

/**
 * Get the event for Key Up
 * @param {*} e 
 */
function onKeyUp(e) {

    // If the Game is Over prevent do actions
    if (!game.gameOver) {

        if(game.ninja.status == NINJA_STATUS_ATTACK) {
            // Wait until finish the animation
            setTimeout(function(){
                game.ninja.idle();
            },500);
        }
        else {
            game.ninja.idle();
        }
        game.parallaxLayer1.style.webkitAnimationPlayState = "paused";
        game.parallaxLayer2.style.webkitAnimationPlayState = "paused";
        game.parallaxLayer3.style.webkitAnimationPlayState = "paused";
    }
};

/**
 * Restart the Game - Play Again
 */
function onPlayAgain() {

    // Hide Modal
    $('#ninjaCaosModal').modal('hide');

    // Reload the Page - Restarting 
    renderHtml('html/game.html');
    
}