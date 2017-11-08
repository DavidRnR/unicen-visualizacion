var heartInterval;

/**
* Get All Tweets
* @param {*} hash
*/
function retrieveTweets(hash) {
  // getTweets(hash).then((resp) => {
  //
  //     var urlArray = [];
  //     var tweetArray = [];
  //
  //     for (var i = 0; i < resp.statuses.length; i++) {
  //         // Set Tweet
  //         var tweet = resp.statuses[i];
  //
  //         if (tweet.extended_entities && tweet.extended_entities.media) {
  //             for (var j = 0; j < tweet.extended_entities.media.length; j++) {
  //                 if (tweet.extended_entities.media[j].type === "photo") {
  //                     if (!urlArray.includes(tweet.extended_entities.media[j].media_url_https)) {
  //                         var obj = {};
  //                         obj.url = tweet.extended_entities.media[j].media_url_https;
  //                         obj.likes = tweet.favorite_count;
  //                         obj.retweets = tweet.retweet_count;
  //                         urlArray.push(tweet.extended_entities.media[j].media_url_https);
  //                         tweetArray.push(obj);
  //                     }
  //                 }
  //             }
  //         }
  //     }
  //     photos = tweetArray;
  //
  //     createCards();
  //
  //     // Show Spinner
  //     showHideLoadingSpinner();
  //
  // });
  photos = [
    {
      "url": "http://images.performgroup.com/di/library/goal_es/74/85/lionel-messi-barcelona-psg-uefa-champions-league-08032016_feltmf12bt0f18v9iprtnl463.jpg",
      "retweets": 658
    },
    {
      "url": "http://images.performgroup.com/di/library/goal_es/74/85/lionel-messi-barcelona-psg-uefa-champions-league-08032016_feltmf12bt0f18v9iprtnl463.jpg",
      "retweets": 6583
    },
    {
      "url": "http://images.performgroup.com/di/library/goal_es/74/85/lionel-messi-barcelona-psg-uefa-champions-league-08032016_feltmf12bt0f18v9iprtnl463.jpg",
      "retweets": 0
    },
    {
      "url": "http://images.performgroup.com/di/library/goal_es/74/85/lionel-messi-barcelona-psg-uefa-champions-league-08032016_feltmf12bt0f18v9iprtnl463.jpg",
      "retweets": 2222
    },
    {
      "url": "http://images.performgroup.com/di/library/goal_es/74/85/lionel-messi-barcelona-psg-uefa-champions-league-08032016_feltmf12bt0f18v9iprtnl463.jpg",
      "retweets": 0
    },
  ]
  createCards();

  // Show Spinner
  showHideLoadingSpinner();
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
    let conteiner = document.createElement('div');
    let card = document.createElement('div');
    conteiner.append(card);
    conteiner.className = "cardConteiner  col-md-3";
    card.className = "cards-view";
    conteiner.retweets = photos[index].retweets;
    card.style.backgroundImage = 'url("' + photos[index].url + '")';
    let img = new Image();
    img.src = photos[index].url;
    conteiner.onmouseenter = addFavFn;
    conteiner.onmouseleave = function(){
      conteiner.removeChild(conteiner.childNodes[1]);
      clearInterval(heartInterval);
    }
    card.appendChild(img);
    let cardsConteiner = $('#cards-view')[0];
    cardsConteiner.append(conteiner);
  }
}

function addFavFn() {
  let favConteiner = document.createElement('div');
  let heart = document.createElement('div');
  let retweetCount = document.createElement('div');

  favConteiner.className = "favConteiner";
  retweetCount.className = 'retweets-count';
  this.append(favConteiner);
  this.favConteiner = favConteiner;
  retweetCount.innerHTML = this.retweets;

  if (this.retweets < 1000 && this.retweets !== 0) {
    heart.style.backgroundImage = 'url("img/heart.png")';
    heart.className = "favourite";
    this.favConteiner.appendChild(heart);
  } else if (this.retweets === 0) {
    heart.style.backgroundImage = 'url("img/heart_b.png")';
    heart.className = "favourite favourite_b";
    this.favConteiner.appendChild(heart);
  } else { // more than 1000 retweets
    heart.style.backgroundImage = 'url("img/heart.png")';
    heart.className = "favourite favourite_1000";
    var count = 0;
    heartInterval = setInterval(() => {
      var cln = heart.cloneNode(true);
      this.favConteiner.appendChild(cln);
      count++;
      if (count == 10) {
        clearInterval(heartInterval);
      }
    }, 400);
  }
  this.favConteiner.appendChild(retweetCount);
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
