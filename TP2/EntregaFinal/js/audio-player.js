var play = document.getElementById('btn-play');
var stop = document.getElementById('btn-stop');

play.addEventListener("click", function () {
     document.getElementById("youtube-audio").src = "https://youtube.com/embed/ZToOPy9dLKU?autoplay=1";
});

stop.addEventListener("click", function () {
    document.getElementById("youtube-audio").src = "";
});



