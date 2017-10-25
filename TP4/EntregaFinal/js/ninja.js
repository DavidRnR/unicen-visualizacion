function Ninja() {
    this.element = document.getElementById('ninja');
    this.status = NINJA_STATUS_IDLE;
    this.look = NINJA_LOOK_RIGHT;
    this.zombiesCounter = 0;
}

Ninja.prototype.idle = function () {
    ninjaRunningFX.pause();
    this.element.className = 'ninja-idle';
    this.status = NINJA_STATUS_IDLE;
}

Ninja.prototype.turnLeft = function () {
    ninjaShortMoveFX.play();
    this.look = NINJA_LOOK_LEFT;
    this.element.style.transform = 'scaleX(-0.5) scaleY(0.5)';
}

Ninja.prototype.turnRight = function () {
    ninjaShortMoveFX.play();
    this.look = NINJA_LOOK_RIGHT;
    this.element.style.transform = 'scaleX(0.5) scaleY(0.5)';
}

Ninja.prototype.run = function () {
    if (this.look == NINJA_LOOK_RIGHT) {
        //SoundFX
        ninjaRunningFX.play();

        this.element.className = 'ninja-run';
        this.status = NINJA_STATUS_RUN;
    }
}

Ninja.prototype.attack = function () {
    ninjaSwordFX.play();
    this.element.className = 'ninja-attack';
    this.status = NINJA_STATUS_ATTACK;

}

Ninja.prototype.die = function () {
    this.element.className = 'ninja-die';
    this.element.style.left = '260px';
    this.element.style.top = '210px';
    this.status = NINJA_STATUS_DEAD;
}


