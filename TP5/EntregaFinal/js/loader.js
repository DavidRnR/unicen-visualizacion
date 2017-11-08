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
 * Set Picture on the Carousel and Set Animation
 * @param {*} url
 * @param {*} arrow
 */
function setPictureOnCarousel(url, arrow = null) {

    $(divCarousel).removeClass("slide-pic-back");
    $(divCarousel).removeClass("slide-pic-next");

    setTimeout(() => {
        imgCarousel.src = url;
        $(divCarousel).addClass("slide-pic-" + ((arrow) ? arrow : 'next'));
    }, 100);

}

// Button Next Image - Carousel
$(document).on("click", '#get-next-img', (e) => {
    e.preventDefault();
 
    for (let i = 0; i < photos.length; i++) {

        if (urlFullImage == photos[i].url) {
            if (i + 1 == photos.length) {
                return;
            }
            urlFullImage = photos[i + 1].url;
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
        if (urlFullImage == photos[i].url) {
            if (i - 1 == -1) {
                return;
            }
            urlFullImage = photos[i - 1].url;
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

    // Change View Carousel or Cards
    if(view == 'carousel') {
        renderHtml('html/carousel.html').then(() => {
            createCarousel();
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
