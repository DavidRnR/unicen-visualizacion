// NavBar Buttons
var buttonAbout = document.getElementById('about');
buttonAbout.addEventListener('click', (e) => {
    e.preventDefault();
    renderHtml('html/about.html');
});

var photos;
var urlFullImage = "";
var divCarousel;
var imgCarousel;

// Button Search
$(document).on("click", '#search-button', (e) => {
    e.preventDefault();

    // renderHtml('html/carousel.html');

    renderHtml('html/cards.html');

    loadMockPictures();
});

function loadMockPictures() {

    // Just to try render pictures on the carousel
    // TODO replace for TWITTER Pictures - API
    fetch('https://jsonplaceholder.typicode.com/photos').then(resp => {
        return resp.json();
    }).then((data) => {   

            photos = data;
            
            /*********Carousel*********** */
            //urlFullImage = photos[0].url;
            // // Set divCarousel & imgCarousel
            // divCarousel = $('.carousel-img-container')[0];
            // imgCarousel = $('#carousel-img')[0];
 
            // // Set Picture on the DOM
            // setPictureOnCarousel(urlFullImage);
            /*********Carousel*********** */


            /************Cards************** */
            for (var index = 0; index < 30; index++) {
                let div = document.createElement('div');
                div.className = "cards-view col-md-3";
                div.style.backgroundImage = 'url("'+ photos[index].url +'")';
                let img = new Image();
                img.src = photos[index].url;
                div.appendChild(img);
                $('#cards-view')[0].append(div);                
            }
        
    });
}

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

    for (let i = 0; i < 10; i++) {

        if (urlFullImage == photos[i].url) {
            if (i + 1 == 10) {
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

    for (let i = 0; i < 10; i++) {
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

