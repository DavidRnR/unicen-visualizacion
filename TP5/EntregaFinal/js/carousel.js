var anim = 'slide';
var animBtnSlide;
var animBtnVer;
var animBtnCust;
var fullScreenBtn;
var fullScreenState = false;
var currentIndexPhoto = 0;
var autoPlayFn = function () {
    if(fullScreenState) {
        setNextPic();
    }
}
var photosInterval = setInterval(autoPlayFn, 5000);


// Button Next Image - Carousel
$(document).on("click", '#get-next-img', (e) => {
    e.preventDefault();
    clearInterval(photosInterval);
    photosInterval = setInterval(autoPlayFn, 5000);
    setNextPic();
});


// Button Back Image - Carousel
$(document).on("click", '#get-back-img', (e) => {
    e.preventDefault();
    clearInterval(photosInterval);
    photosInterval = setInterval(autoPlayFn, 5000);
    setPrevPic();
});

function setNextPic() {
    currentIndexPhoto++;
    if (currentIndexPhoto == photos.length) {
        currentIndexPhoto = 0;
    }
    urlFullImage = photos[currentIndexPhoto].url;
    setPictureOnCarousel(urlFullImage, 'next');
}

function setPrevPic() {
    currentIndexPhoto--;
    if (currentIndexPhoto == -1) {
        currentIndexPhoto = photos.length - 1;
    }
    urlFullImage = photos[currentIndexPhoto].url;
    setPictureOnCarousel(urlFullImage, 'back');
}

/**
* Create Carousel
*/
function createCarousel() {
    anim = 'slide';
    urlFullImage = photos[0].url;
    // Set divCarousel & imgCarousel
    divCarousel = $('.carousel-img-container')[0];
    imgCarousel = $('#carousel-img')[0];

    // Set Picture on the DOM
    setPictureOnCarousel(urlFullImage);
}

/**
 * Set Picture on the Carousel and Set Animation
 * @param {*} url
 * @param {*} arrow
 */
function setPictureOnCarousel(url, arrow = null) {

    removeAllCarouselAnim();

    setTimeout(() => {
        imgCarousel.src = url;
        $(divCarousel).addClass(anim + "-pic-" + ((arrow) ? arrow : 'next'));
    }, 100);

}

function setCarouselAnim(anim, button) {
    removeAnimBtnClass();
    this.anim = anim;
    $(button).addClass('active');
}

function removeAllCarouselAnim() {
    $(divCarousel).removeClass("slide-pic-back");
    $(divCarousel).removeClass("slide-pic-next");
    $(divCarousel).removeClass("vertical-pic-back");
    $(divCarousel).removeClass("vertical-pic-next");
    $(divCarousel).removeClass("custom-pic-back");
    $(divCarousel).removeClass("custom-pic-next");
}

function setListeners() {
    animBtnSlide = document.getElementById('animBtnSlide');
    animBtnVer = document.getElementById('animBtnVer');
    animBtnCust = document.getElementById('animBtnCust');
    fullScreenBtn = document.getElementById('fullScreenBtn');
}

function removeAnimBtnClass() {
    animBtnSlide.classList.remove("active");
    animBtnVer.classList.remove("active");
    animBtnCust.classList.remove("active");
}

/**
 * Toogle to Full Screen Presentation
 */
function toggleFullScreen() {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        fullScreenBtn.classList.add("active");
        console.dir(fullScreenBtn);
        fullScreenBtn.childNodes[1].classList.add('fa-pause');
        fullScreenBtn.childNodes[1].classList.remove('fa-play');
        fullScreenState = true;
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        fullScreenBtn.classList.remove("active");
        fullScreenBtn.childNodes[1].classList.add('fa-play');        
        fullScreenBtn.childNodes[1].classList.remove('fa-pause');        
        fullScreenState = false;
    }
}