/**
* Get All Tweets
* @param {*} hash
*/
function retrieveTweets(hash) {
    getTweets(hash).then((resp) => {
        var urlArray = [];
        var tweetArray = [];
        for (var i = 0; i < resp.statuses.length; i++) {
            var tweet = resp.statuses[i];
            if (tweet.extended_entities && tweet.extended_entities.media) {
                for (var j = 0; j < tweet.extended_entities.media.length; j++) {
                    if (tweet.extended_entities.media[j].type === "photo") {
                        if (!urlArray.includes(tweet.extended_entities.media[j].media_url_https)) {
                            var obj = {};
                            obj.url = tweet.extended_entities.media[j].media_url_https;
                            obj.likes = tweet.favorite_count;
                            obj.retweets = tweet.retweet_count;
                            urlArray.push(tweet.extended_entities.media[j].media_url_https);
                            tweetArray.push(obj);
                        }
                    }
                }
            }
        }
        photos = tweetArray;

        // createCarousel();

        createCards();
        // Show Spinner
        showHideLoadingSpinner();

    });
}

/**
* Show or Hide Loadibg Spinner
*/
function showHideLoadingSpinner() {
    let loadingSpinner = document.getElementsByClassName('loading-spinner')[0];

    loadingSpinner.style.display = (loadingSpinner.style.display == 'none') ? 'initial' : 'none';
}

/**
* Create Gallery Cards
*/
function createCards() {
    for (var index = 0; index < photos.length; index++) {
        let conteiner = document.createElement('span');
        let card = document.createElement('div');
        let favConteiner = document.createElement('div');
        conteiner.append(card);
        conteiner.append(favConteiner);
        favConteiner.className = "favConteiner";
        conteiner.className = "cardConteiner";
        conteiner.favConteiner = favConteiner;
        card.className = "cards-view col-md-3";
        conteiner.retweets = photos[index].retweets;
        card.style.backgroundImage = 'url("' + photos[index].url + '")';
        let img = new Image();
        img.src = photos[index].url;
        conteiner.onmouseenter = addFavFn;
        card.appendChild(img);
        let cardsConteiner = $('#cards-view')[0];
        cardsConteiner.append(conteiner);
    }
}

function addFavFn() {
    this.favConteiner.appendChild(createFavElement());
    console.log(this.retweets);
}

function createFavElement() {
    let div = document.createElement('div');
    div.className = "favourite";
    div.style.backgroundImage = 'url("img/heart.png")';
    div.addEventListener("animationend", function(){
        div.remove();
    });
    return div;
}

/**
* Create Carousel
*/
function createCarousel() {

    urlFullImage = photos[0].url;
    // Set divCarousel & imgCarousel
    divCarousel = $('.carousel-img-container')[0];
    imgCarousel = $('#carousel-img')[0];

    // Set Picture on the DOM
    setPictureOnCarousel(urlFullImage);
}
