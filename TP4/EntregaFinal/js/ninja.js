function Ninja () {
   
}

Ninja.prototype.idle = function () {
    document.getElementById('ninja').className = 'ninja-idle';
}

Ninja.prototype.run = function () {
    document.getElementById('ninja').className = 'ninja-run';
}

Ninja.prototype.attack = function () {
    document.getElementById('ninja').className = 'ninja-attack';
}

$(document).ready(function(){
    window.addEventListener("keydown", onKeyDown, false);
    window.addEventListener("keyup", onKeyUp, false);
});

function onKeyDown(e){
    console.log(e.keyCode);
    var keyCode = e.keyCode;
    if(keyCode == 65){
        ninja.attack();
    }
    else if(keyCode == 83){
        ninja.run();
        document.getElementsByClassName('cyberpunk-back-1')[0].style.webkitAnimationPlayState = "running";
        document.getElementsByClassName('cyberpunk-back-2')[0].style.webkitAnimationPlayState = "running";
        document.getElementsByClassName('cyberpunk-back-3')[0].style.webkitAnimationPlayState = "running";


    }
};

function onKeyUp(e){
    ninja.idle();
        document.getElementsByClassName('cyberpunk-back-1')[0].style.webkitAnimationPlayState = "paused";
          document.getElementsByClassName('cyberpunk-back-2')[0].style.webkitAnimationPlayState = "paused";
          document.getElementsByClassName('cyberpunk-back-3')[0].style.webkitAnimationPlayState = "paused";
};
