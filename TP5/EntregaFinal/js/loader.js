/**
 * On Set View -  Carousel or Cards Gallery
 * @param {*} view
 */
function onSetView(view) {
    // Change View Carousel or Cards
    if(view == 'carousel') {
        renderHtml('html/carousel.html').then((data) => {

            // Wait for FadeIn
            setTimeout(()=> {
                createCarousel();
                setListeners();
                 // Hide Spinner
                showHideLoadingSpinner();
            }, FADEIN);
      
        });

    }
    else if(view == 'cards') {
    
        renderHtml('html/cards.html').then(()=> {
            // Wait for FadeIn
            setTimeout(()=> {
                createCards();
                // Hide Spinner
                showHideLoadingSpinner();
            }, FADEIN);
      
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

             // Render Data & Apply fadeIn          
            appLoader.className = "container-fluid";

            return setTimeout(()=> {
                    appLoader.className += " fadeIn";
                    appLoader.innerHTML = data;
            }, FADEIN);
             
        }).catch(err => console.log(err));
}

/**
* Get All Tweets
* @param {*} hash
*/
function retrieveTweets(hash) {
    getTweets(hash).then((resp) => {

        var urlArray = [];
        var tweetArray = [];

        for (var i = 0; i < resp.statuses.length; i++) {
            // Set Tweet
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

        createCards();

        // Show Spinner
        showHideLoadingSpinner();

    });
    // photos = [
    //     {
    //         url: "http://images.samash.com/sa/T41/T410-P.fpx?cvt=jpg",
    //         retweets: 0
    //     },
    //     {
    //        url: "https://www.taylorguitars.com/sites/default/files/TaylorGuitars-New-for-17-Browse.jpg",
    //        retweets: 44
    //     },
    //     {
    //         url: "https://cdn-images-1.medium.com/max/2000/1*-vVeRVJfQZb2IgpH2RBJyQ.jpeg",
    //         retweets: 1500
    //     },
    //     {
    //         url:"http://data.whicdn.com/images/57303318/large.jpg",
    //         retweets: 3
    //     },
    //     {
    //         url: "https://dncache-mauganscorp.netdna-ssl.com/thumbseg/856/856214-bigthumbnail.jpg",
    //         retweets: 39
    //     }
    // ];
    // createCards();
    //
    // // Show Spinner
    // showHideLoadingSpinner();
}

/**
* Show or Hide Loading Spinner and Display Buttons
*/
function showHideLoadingSpinner() {
    let loadingSpinner = document.getElementsByClassName('loading-spinner')[0];
    loadingSpinner.style.display = (loadingSpinner.style.display == 'none') ? 'initial' : 'none';

    let displayButtons = document.getElementsByClassName('display-buttons');
    for (let index = 0; index < displayButtons.length; index++) {
        displayButtons[index].style.display = (displayButtons[index].style.display == 'grid') ? 'none' : 'grid';        
    }

}