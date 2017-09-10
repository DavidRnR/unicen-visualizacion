//********************SoundFX - Music Controls *********************************** */
var play = document.getElementById('btn-play');
var stop = document.getElementById('btn-stop');

play.addEventListener("click", function () {
     document.getElementById("youtube-audio").src = "https://youtube.com/embed/ZToOPy9dLKU?autoplay=1";
});

stop.addEventListener("click", function () {
    document.getElementById("youtube-audio").src = "";
});


var pickUpDiskFX = new Audio();
var dropDiskOkFX = new Audio();
var dropDiskFailsFX = new Audio();

pickUpDiskFX.src = "./audio/pickUpDiskFX.mp3";
dropDiskOkFX.src = "./audio/dropDiskOK.mp3";
dropDiskFailsFX.src = "./audio/dropDiskFailsFX.mp3";