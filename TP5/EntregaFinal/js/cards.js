var heartInterval;

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

      card.onclick = function (e) {
            // Show Modal
            $('#fullSizeModal').modal('show');

            let modalImage = document.getElementById('carousel-modal-img');

            modalImage.style.backgroundImage = 'url(' + this.childNodes[0].src + ')';

    };

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

  // Set Button to EXIT from the Modal
  setModalExitEvent();
}

/*
* Set Button- Icon to Exit from the Modal
*/
function setModalExitEvent () {

    let buttonExit = document.getElementsByClassName("modal-exit")[0].childNodes[1];

    buttonExit.addEventListener("click", function() {

      $('#fullSizeModal').modal('hide');
    });
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



