const canvasFilterWidth = 240;
const canvasFilterHeith = 320;

// Original 
var ctx = null;
var imageDataOriginal = null;
var imageOrigin = new Image();

// Filter Canvas
var ctxBW = null;
var ctxNegative = null;
var ctxSepia = null;
var ctxBinary = null;
var ctxBrightness = null;
var ctxSaturation = null;
var ctxBlur = null;
var ctxBorder = null;


/**
 * On load page, render the menu
 */
renderHtml('html/menu.html');

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

            switch (url) {
                case 'html/menu.html':
                    document.getElementById('app-loader').innerHTML = data;
                    setImageFromInput();         
                    break;
                case 'html/image-processed.html':
                    document.getElementById('app-loader').innerHTML = data;
                    onSetCanvas();
                    onLoadImage();

                    // Add Button "Descargar" to the NavBar
                    document.querySelector("nav").innerHTML += '<button class="btn btn-primary download-image-button" onclick="onDownloadImage()">Descargar</button>';

                    // Load Range Slider
                    rangeSlider();
                    break;
                case 'html/image-filters.html':
                    document.getElementById('filters').innerHTML = data;
                    onSetCanvasFilters();
                    onLoadImagesFilters();
                    // Eneable Popovers
                    popover();
                    break;
                default:
                    break;
            }
        }).catch(err => console.log(err));
}

/**
 * On Set Image from Input
 */
function setImageFromInput() {
    let imageFile = function () {
        var fileInput = document.querySelector("#uploadImage");

        // File Reader and set SRC
        var reader = new FileReader();
        reader.onload = function (e) {
            imageOrigin.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);

        // Render Image Processed
        renderHtml('html/image-processed.html');

        // Render Image Filters
        renderHtml('html/image-filters.html');
    }
    document.querySelector("#uploadImage").onchange = imageFile;

}

/**
 * Set Main Canvas
 */
function onSetCanvas() {
    // Main Canvas
    ctx = document.getElementById("canvas").getContext("2d");
}

/**
 * Set Canvas 
 */
function onSetCanvasFilters() {

    // Canvas Filters
    ctxBW = document.getElementById("canvas-black-white").getContext("2d");
    ctxNegative = document.getElementById("canvas-negative").getContext("2d");
    ctxBinary = document.getElementById("canvas-binary").getContext("2d");
    ctxSepia = document.getElementById("canvas-sepia").getContext("2d");
    ctxBrightness = document.getElementById("canvas-brightness").getContext("2d");
    ctxSaturation = document.getElementById("canvas-saturation").getContext("2d");
    ctxBlur = document.getElementById("canvas-blur").getContext("2d");
    ctxBorder = document.getElementById("canvas-border").getContext("2d");
}

/**
 * On Load Image
 */
function onLoadImage() {

    imageOrigin.onload = function () {

        // Responsive Canvas
        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;

        ctx.drawImage(this, 0, 0, this.width, this.height);

        imageData = ctx.getImageData(0, 0, this.width, this.height);

        // Save imageData to restore to original any time
        setImageDataOriginal(imageData);

        ctx.putImageData(imageData, 0, 0);
    }


}

/**
 * Save imageData to restore to original any time
 * @param {*} imageData 
 */
function setImageDataOriginal(imageData) {
    imageDataOriginal = imageData;

}
/**
 * On Set Filter
 * @param {*} filter 
 */
function onSetFilter(filter) {

    // Set Filter Selected
    filterSelected = filter;

    // Set original image data before apply the filter
    document.getElementsByClassName("btn-undo")[0].disabled = false;
    ctx.putImageData(imageDataOriginal, 0, 0);
    let imageData = ctx.getImageData(0, 0, imageOrigin.width, imageOrigin.height);

    switch (filterSelected) {
        case 'bwFilter':
            getFilterBlackWhite(imageData);
            break;
        case 'negativeFilter':
            getFilterNegative(imageData);
            break;
        case 'sepiaFilter':
            getFilterSepia(imageData);
            break;
        case 'binaryFilter':
            getFilterBinary(imageData);
            break;
        case 'brightnessFilter':
            getFilterBrightness(imageData);
            break;
        case 'saturationFilter':
            getFilterSaturation(imageData);
            break;
        case 'blurFilter':
            getFilterBlurBorder(imageData, null, BLUR);
            break;
        case 'borderFilter':
            getFilterBlurBorder(imageData, null, BORDER);
            break;
        default: // Do nothing - restore original on the begin's function
            document.getElementsByClassName("btn-undo")[0].disabled = true;
            break;
    }
    ctx.putImageData(imageData, 0, 0);
}


//****************************************************************************** */

/**
 * Get value to Resize Image
 * @param {*} imgW 
 * @param {*} imgH 
 * @param {*} maxW 
 * @param {*} maxH 
 */
function scalePreserveAspectRatio(imgW, imgH, maxW, maxH) {
    return (Math.min((maxW / imgW), (maxH / imgH)));
}

/**
* On Load Images Filters
*/
function onLoadImagesFilters() {

    // Black and White
    var imageBlackWhite = new Image();
    imageBlackWhite.src = imageOrigin.src;

    imageBlackWhite.onload = function () {

        let w = imageBlackWhite.width;
        let h = imageBlackWhite.height;

        let sizer = scalePreserveAspectRatio(w, h, canvasFilterWidth, canvasFilterHeith);

        // Responsive canvas
        ctxBW.canvas.width = w * sizer;
        ctxBW.canvas.heith = h * sizer;

        ctxBW.drawImage(this, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

        imageData = ctxBW.getImageData(0, 0, this.width, this.height);

        getFilterBlackWhite(imageData, 1);

        ctxBW.canvas.width = w * sizer;
        ctxBW.canvas.height = h * sizer;

        ctxBW.putImageData(imageData, 0, 0);
    }

    // Negative
    var imageNegative = new Image();
    imageNegative.src = imageOrigin.src;

    imageNegative.onload = function () {

        let w = imageNegative.width;
        let h = imageNegative.height;

        let sizer = scalePreserveAspectRatio(w, h, canvasFilterWidth, canvasFilterHeith);

        // Responsive canvas
        ctxNegative.canvas.width = w * sizer;
        ctxNegative.canvas.heith = h * sizer;

        ctxNegative.drawImage(this, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

        imageData = ctxNegative.getImageData(0, 0, this.width, this.height);

        // Get filter by default 255 of level
        getFilterNegative(imageData, 255);

        ctxNegative.canvas.width = w * sizer;
        ctxNegative.canvas.height = h * sizer;

        ctxNegative.putImageData(imageData, 0, 0);
    }

    // Sepia
    var imageSepia = new Image();
    imageSepia.src = imageOrigin.src;

    imageSepia.onload = function () {

        let w = imageSepia.width;
        let h = imageSepia.height;

        let sizer = scalePreserveAspectRatio(w, h, canvasFilterWidth, canvasFilterHeith);

        // Responsive canvas
        ctxSepia.canvas.width = w * sizer;
        ctxSepia.canvas.heith = h * sizer;

        ctxSepia.drawImage(this, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

        imageData = ctxSepia.getImageData(0, 0, this.width, this.height);

        // Get filter by default 0 of level
        getFilterSepia(imageData, 0);

        ctxSepia.canvas.width = w * sizer;
        ctxSepia.canvas.height = h * sizer;

        ctxSepia.putImageData(imageData, 0, 0);
    }


    // Binary
    var imageBinary = new Image();
    imageBinary.src = imageOrigin.src;

    imageBinary.onload = function () {

        let w = imageBinary.width;
        let h = imageBinary.height;

        let sizer = scalePreserveAspectRatio(w, h, canvasFilterWidth, canvasFilterHeith);

        ctxBinary.drawImage(this, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

        imageData = ctxBinary.getImageData(0, 0, this.width, this.height);

        // Get filter by default 70 of level
        getFilterBinary(imageData, 70);

        ctxBinary.canvas.width = w * sizer;
        ctxBinary.canvas.height = h * sizer;

        ctxBinary.putImageData(imageData, 0, 0);
    }


    // Brightness
    var imageBrightness = new Image();
    imageBrightness.src = imageOrigin.src;

    imageBrightness.onload = function () {

        let w = imageBrightness.width;
        let h = imageBrightness.height;

        let sizer = scalePreserveAspectRatio(w, h, canvasFilterWidth, canvasFilterHeith);

        ctxBrightness.drawImage(this, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

        imageData = ctxBrightness.getImageData(0, 0, this.width, this.height);

        // Get filter by default 100 of level
        getFilterBrightness(imageData, 100);

        ctxBrightness.canvas.width = w * sizer;
        ctxBrightness.canvas.height = h * sizer;

        ctxBrightness.putImageData(imageData, 0, 0);
    }

    // Saturation
    var imageSaturation = new Image();
    imageSaturation.src = imageOrigin.src;

    imageSaturation.onload = function () {

        let w = imageSaturation.width;
        let h = imageSaturation.height;

        let sizer = scalePreserveAspectRatio(w, h, canvasFilterWidth, canvasFilterHeith);

        ctxSaturation.drawImage(this, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

        imageData = ctxSaturation.getImageData(0, 0, this.width, this.height);

        // Get filter by default 2 of level
        getFilterSaturation(imageData, 2);

        ctxSaturation.canvas.width = w * sizer;
        ctxSaturation.canvas.height = h * sizer;

        ctxSaturation.putImageData(imageData, 0, 0);
    }

    // Blur
    var imageBlur = new Image();
    imageBlur.src = imageOrigin.src;

    imageBlur.onload = function () {

        let w = imageBlur.width;
        let h = imageBlur.height;

        let sizer = scalePreserveAspectRatio(w, h, canvasFilterWidth, canvasFilterHeith);

        ctxBlur.drawImage(this, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

        imageData = ctxBlur.getImageData(0, 0, this.width, this.height);

        // Get filter by default 1.5
        getFilterBlurBorder(imageData, 1.5, BLUR);

        ctxBlur.canvas.width = w * sizer;
        ctxBlur.canvas.height = h * sizer;

        ctxBlur.putImageData(imageData, 0, 0);
    }

    // Border
    var imageBorder = new Image();
    imageBorder.src = imageOrigin.src;

    imageBorder.onload = function () {

        let w = imageBorder.width;
        let h = imageBorder.height;

        let sizer = scalePreserveAspectRatio(w, h, canvasFilterWidth, canvasFilterHeith);

        ctxBorder.drawImage(this, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

        imageData = ctxBorder.getImageData(0, 0, this.width, this.height);

        // Get filter by default 
        getFilterBlurBorder(imageData, 2, BORDER);

        ctxBorder.canvas.width = w * sizer;
        ctxBorder.canvas.height = h * sizer;

        ctxBorder.putImageData(imageData, 0, 0);
    }

}

/**
 * On Download Image
 */
function onDownloadImage() {

    // Save the image as a file
    let urlImg = ctx.canvas.toDataURL('image/png');

    let download = document.createElement('a');
    download.href = urlImg;
    download.download = 'tudai.jpg';

    // Firefox 1.0+
    let isFirefox = typeof InstallTrigger !== 'undefined';

    if (isFirefox) {
        let fireOnThis = download;
        if (document.createEvent) {
            let evObj = document.createEvent('MouseEvents');
            evObj.initEvent('click', true, false);
            fireOnThis.dispatchEvent(evObj);
        } else if (document.createEventObject) {
            let evObj = document.createEventObject();
            fireOnThis.fireEvent('on' + 'click', evObj);
        }
    }
    // Chrome - Opera
    else {
        download.click();
    }

}

/**
 * Popover Enable
 */
function popover () {
        $('[data-toggle="popover"]').popover(); 
  };