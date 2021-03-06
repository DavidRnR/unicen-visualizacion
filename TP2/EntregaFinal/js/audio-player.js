//********************SoundFX - Music Controls *********************************** */
var play = document.getElementById('btn-play');
var stop = document.getElementById('btn-stop');
var muteSoundFX = document.getElementById('btn-mute');

// Play Music
play.addEventListener("click", function () {
    player.playVideo();
});

// Stop Music
stop.addEventListener("click", function () {
    player.stopVideo();
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


// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-audio', {
        height: '360',
        width: '640',
        videoId: 'ZToOPy9dLKU',
        events: {
            'onReady': onPlayerReady
        }
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    player.setVolume(15);
}

//    The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function stopVideo() {
    player.stopVideo();
}