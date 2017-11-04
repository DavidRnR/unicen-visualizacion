
function retrieveTweets(hash) {
  getTweets(hash).then((resp)=>{
    var picsArray = [];
    for (var i = 0; i < resp.statuses.length; i++) {
      var tweet = resp.statuses[i];
      if (tweet.extended_entities && tweet.extended_entities.media) {
        for (var j = 0; j < tweet.extended_entities.media.length; j++) {
          if (tweet.extended_entities.media[j].type === "photo") {
            if (!picsArray.includes(tweet.extended_entities.media[j].media_url_https)) {
              picsArray.push(tweet.extended_entities.media[j].media_url_https);
            }
          }
        }
      }
    }
    photos = picsArray;
    createCards();
  });
}

function createCards() {
  for (var index = 0; index < photos.length; index++) {
      let div = document.createElement('div');
      div.className = "cards-view col-md-3";
      div.style.backgroundImage = 'url("'+ photos[index] +'")';
      let img = new Image();
      img.src = photos[index];
      div.appendChild(img);
      $('#cards-view')[0].append(div);
  }
}
