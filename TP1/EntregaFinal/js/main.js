
var ctx = null;
var ctxBW = null;
var ctxNegative = null;
var ctxSepia = null;
var ctxBinary = null;

var imageOrigin = new Image();
var imageFileDefault;

/**
 * On load page, render the menu
 */
renderHtml('./menu.html');

/**
 * Render HTML
 * @param {url} url 
 */
function renderHtml(url) {
    var headers = new Headers();
    headers.append("Content-Type", "text/html");

    fetch(url, headers)
        .then(response => {
            return response.text();
        }).then(data => {
            switch (url) {
                case './menu.html':
                    document.getElementById('app-loader').innerHTML = data;
                    setImageFromInput();
                    break;
                case './image-processed.html':
                    document.getElementById('app-loader').innerHTML = data;
                    onSetCanva();
                    onLoadImage();

                    // Add Button "Descargar" to the NavBar
                    document.querySelector("nav").innerHTML += '<button class="btn btn-primary download-image-button" onclick="onDownloadImage()">Descargar</button>';

                    break;
                case './image-filters.html':
                    document.getElementById('filters').innerHTML = data;
                    onSetCanvasFilters();
                    onLoadImagesFilters();
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

        imageFileDefault = reader.result;
        // Render Image Processed
        renderHtml('./image-processed.html');

        // Render Image Filters
        renderHtml('./image-filters.html');
    }
    document.querySelector("#uploadImage").onchange = imageFile;

}

/**
 * Set Canvas 
 */
function onSetCanva() {
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
}

/**
 * On Load Image
 */
function onLoadImage() {

    imageOrigin.onload = function () {
        ctx.drawImage(this, 0, 0);

        imageData = ctx.getImageData(0, 0, this.width, this.height);

        ctx.putImageData(imageData, 0, 0);
    }

}

function onSetFilter(filter) {
    let imageData = ctx.getImageData(0, 0, imageOrigin.width, imageOrigin.height);

    switch (filter) {
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
        default:
            break;
    }
    ctx.putImageData(imageData, 0, 0);
}

function setPixel(imageData, x, y, r, g, b, a) {

    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;

}


function scalePreserveAspectRatio(imgW, imgH, maxW, maxH) {
    return (Math.min((maxW / imgW), (maxH / imgH)));
}

//****************************************************************************** */

/**
* On Load Images Filters
*/
function onLoadImagesFilters() {

    // Black and White
    var imageBlackWhite = new Image();
    imageBlackWhite.src = imageOrigin.src;

    imageBlackWhite.onload = function () {

        var w = imageBlackWhite.width;
        var h = imageBlackWhite.height;

        var sizer = scalePreserveAspectRatio(w, h, 120, 160);

        ctxBW.drawImage(this, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

        imageData = ctxBW.getImageData(0, 0, this.width, this.height);

        getFilterBlackWhite(imageData);

        ctxBW.canvas.width = w * sizer;
        ctxBW.canvas.height = h * sizer;

        ctxBW.putImageData(imageData, 0, 0);
    }

    // Negative
    var imageNegative = new Image();
    imageNegative.src = imageOrigin.src;

    imageNegative.onload = function () {

        var w = imageNegative.width;
        var h = imageNegative.height;

        var sizer = scalePreserveAspectRatio(w, h, 120, 160);

        ctxNegative.drawImage(this, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

        imageData = ctxNegative.getImageData(0, 0, this.width, this.height);

        getFilterNegative(imageData);

        ctxNegative.canvas.width = w * sizer;
        ctxNegative.canvas.height = h * sizer;

        ctxNegative.putImageData(imageData, 0, 0);
    }

    // Sepia
    var imageSepia = new Image();
    imageSepia.src = imageOrigin.src;

    imageSepia.onload = function () {

        var w = imageSepia.width;
        var h = imageSepia.height;

        var sizer = scalePreserveAspectRatio(w, h, 120, 160);

        ctxSepia.drawImage(this, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

        imageData = ctxSepia.getImageData(0, 0, this.width, this.height);

        getFilterSepia(imageData);

        ctxSepia.canvas.width = w * sizer;
        ctxSepia.canvas.height = h * sizer;

        ctxSepia.putImageData(imageData, 0, 0);
    }


    // Binary
    var imageBinary = new Image();
    imageBinary.src = imageOrigin.src;

    imageBinary.onload = function () {

        var w = this.width;
        var h = this.height;

        var sizer = scalePreserveAspectRatio(w, h, 120, 160);

        ctxBinary.drawImage(this, 0, 0, w, h, 0, 0, w * sizer, h * sizer);

        imageData = ctxBinary.getImageData(0, 0, this.width, this.height);

        getFilterBinary(imageData);

        ctxBinary.canvas.width = w * sizer;
        ctxBinary.canvas.height = h * sizer;

        ctxBinary.putImageData(imageData, 0, 0);
    }

}

/**
 * On Download Image
 */
function onDownloadImage() {

    // Open dialog to save the image
    // window.open(ctx.canvas.toDataURL('image/png'));
    
    document.execCommand('SaveAs','1','TudaiPic.jpg');
}



