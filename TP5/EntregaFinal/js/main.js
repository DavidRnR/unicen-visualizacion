// Time for animation FadeIn
const FADEIN = 200;

// For Full Screen 
var elem = document.documentElement;

// App Loader
var appLoader = document.getElementById('app-loader');

// NavBar Buttons - ABOUT
var buttonAbout = document.getElementById('about');
buttonAbout.addEventListener('click', (e) => {
    e.preventDefault();
    renderHtml('html/about.html');
});

// NavBar Buttons - HOME
var buttonHome = document.getElementById('home');
buttonHome.addEventListener('click', (e) => {
    e.preventDefault();
    renderHtml('html/home.html');
});

// Photos
var photos;
var urlFullImage = "";
var divCarousel;
var imgCarousel;

// Button Search
$(document).on("submit", '#search-button', (e) => {
    e.preventDefault();
    event.stopPropagation();

    var hash = e.target[0].value;
    if (hash !== "") {
        // Load Cards Gallery
        renderHtml('html/cards.html').then(() => {
            // Get Tweets
            retrieveTweets(hash);
        });

        ;

    }
});
