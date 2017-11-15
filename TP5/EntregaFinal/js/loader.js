// NavBar Buttons
var buttonAbout = document.getElementById('about');
buttonAbout.addEventListener('click', (e) => {
    e.preventDefault();
    renderHtml('html/about.html');
});

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
        renderHtml('html/cards.html').then(()=> {
             // Get Tweets
        retrieveTweets(hash);
        });

       ;

    }


});

/**
 * On Set View -  Carousel or Cards Gallery
 * @param {*} view
 */
function onSetView(view) {
    // Change View Carousel or Cards
    if(view == 'carousel') {
        renderHtml('html/carousel.html').then(() => {
            createCarousel();
            setListeners();
             // Hide Spinner
            showHideLoadingSpinner();
        });

    }
    else if(view == 'cards') {
        renderHtml('html/cards.html').then(()=> {
            createCards();
            // Hide Spinner
            showHideLoadingSpinner();
        });
    }

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

    return fetch(myRequest)
        .then(response => {
            return response.text();
        }).then(data => {

             // Render Data
             return document.getElementById('app-loader').innerHTML = data;

        }).catch(err => console.log(err));
}
