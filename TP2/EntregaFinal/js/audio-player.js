//********************SoundFX - Music Controls *********************************** */
var play = document.getElementById('btn-play');
var stop = document.getElementById('btn-stop');
var muteSoundFX = document.getElementById('btn-mute');

// Play Music
play.addEventListener("click", function () {
     document.getElementById("youtube-audio").src = "https://youtube.com/embed/ZToOPy9dLKU?autoplay=1";
});

// Stop Music
stop.addEventListener("click", function () {
    document.getElementById("youtube-audio").src = "";
});

// SoundFX ON/OFF
muteSoundFX.addEventListener("click", function () {

    // Change Icon Class
    $('#btn-mute i').toggleClass('fa-volume-up fa-volume-off');

    // Change Title SoundFX
    if ($('#btn-mute i').hasClass('fa-volume-up')) {
        $(this).attr('title', 'SoundFX Off');
    }
    else {
        $(this).attr('title', 'SoundFX ON');
    }


    // Mute true or false each soundFx
    soundsFX.forEach((a) => {
        a.muted = !a.muted;
    })
});

// Array with all the soundsFx
var soundsFX = new Array();

var pickUpDiskFX = new Audio();
var dropDiskOkFX = new Audio();
var dropDiskFailsFX = new Audio();

pickUpDiskFX.src = "./audio/pickUpDiskFX.mp3";
dropDiskOkFX.src = "./audio/dropDiskOK.mp3";
dropDiskFailsFX.src = "./audio/dropDiskFailsFX.mp3";

soundsFX.push(pickUpDiskFX);
soundsFX.push(dropDiskOkFX);
soundsFX.push(dropDiskFailsFX);