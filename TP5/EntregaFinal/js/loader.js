// NavBar Buttons
var buttonAbout = document.getElementById('about');
buttonAbout.addEventListener('click', (e) => {
    e.preventDefault();
    renderHtml('html/about.html');
});

// Photos
var photos;
var urlFullImage = "";
var divCarousel;
var imgCarousel;

// Button Search
$(document).on("submit", '#search-button', (e) => {
    e.preventDefault();


    var input = e.target[0].value;
    if (input !== "") {

        // Load Cards Gallery
        renderHtml('html/cards.html');

        // Get Tweets 
        retrieveTweets(input);

    }
});


/**
 * Set Picture on the Carousel and Set Animation
 * @param {*} url
 * @param {*} arrow
 */
function setPictureOnCarousel(url, arrow = null) {

    $(divCarousel).removeClass("slide-pic-back");
    $(divCarousel).removeClass("slide-pic-next");

    setTimeout(() => {
        divCarousel.style.backgroundImage = 'url("' + url + '")';
        imgCarousel.src = url;
        $(divCarousel).addClass("slide-pic-" + ((arrow) ? arrow : 'next'));
    }, 100);

}

// Button Next Image - Carousel
$(document).on("click", '#get-next-img', (e) => {
    e.preventDefault();

    for (let i = 0; i < photos.length; i++) {

        if (urlFullImage == photos[i]) {
            if (i + 1 == 10) {
                return;
            }
            urlFullImage = photos[i + 1];
            // Set Picture on the DOM
            setPictureOnCarousel(urlFullImage, 'next');
            return;
        }
    }
});


// Button Back Image - Carousel
$(document).on("click", '#get-back-img', (e) => {
    e.preventDefault();

    for (let i = 0; i < photos.length; i++) {
        if (urlFullImage == photos[i]) {
            if (i - 1 == -1) {
                return;
            }
            urlFullImage = photos[i - 1];
            // Set Picture on the DOM
            setPictureOnCarousel(urlFullImage, 'back');
            return;
        }
    }

});

/**
 * On Set View -  Carousel or Cards Gallery
 * @param {*} view 
 */
function onSetView(view) {

    //TODO Change View Carousel or Cards
    // Show or Hide Loading
}

/**
 * Render HTML
 * @param {url} url
 */
function renderHtml(url) {
    let headers = new Headers();
    headers.append("Content-Type", "text/html");

    let options = {
        headers: headers,
        mode: 'no-cors',
        cache: 'default'
    };
    let myRequest = new Request(url, options);

    fetch(myRequest)
        .then(response => {
            return response.text();
        }).then(data => {

            // Render Data
            document.getElementById('app-loader').innerHTML = data;

        }).catch(err => console.log(err));
}
