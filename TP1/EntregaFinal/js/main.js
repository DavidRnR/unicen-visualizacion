var ctx = null;
var ctxBW = null;
var ctxNegative = null;
var ctxBinary = null;
var ctxSepia = null;

var imageOrigin = new Image();

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
    var imageFile = function () {
        var fileInput = document.querySelector("#uploadImage");

        // File Reader and set SRC
        var reader = new FileReader();
        reader.onload = function (e) {
            imageOrigin.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);

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

/**
* On Load Images Filters
*/
function onLoadImagesFilters() {

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

}

function onSetFilter(filter) {

    imageData = ctx.getImageData(0, 0, imageOrigin.width, imageOrigin.height);

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

function getRed(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];
}

function getGreen(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    return imageData.data[index + 1];
}
function getBlue(imageData, x, y) {
    index = (x + y * imageData.width) * 4;
    return imageData.data[index + 2];
}

function getFilterBlackWhite(imageData) {

    for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {
            var i = (y * 4) * imageData.width + x * 4;
            var avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
            imageData.data[i] = avg;
            imageData.data[i + 1] = avg;
            imageData.data[i + 2] = avg;
        }
    }
}

function getFilterNegative(imageData) {

    for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {
            setPixel(imageData, x, y, 255 - getRed(imageData, x, y), 255 - getBlue(imageData, x, y), 255 - getGreen(imageData, x, y), 255);
        }
    }
}

function getFilterSepia(imageData) {


    for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {

            let outputRed = (getRed(imageData, x, y) * .393) + (getGreen(imageData, x, y) * .769) + (getBlue(imageData, x, y) * .189);
            let outputGreen = (getRed(imageData, x, y) * .349) + (getGreen(imageData, x, y) * .686) + (getBlue(imageData, x, y) * .168);
            let outputBlue = (getRed(imageData, x, y) * .272) + (getGreen(imageData, x, y) * .534) + (getBlue(imageData, x, y) * .131);

            setPixel(imageData, x, y, outputRed, outputGreen, outputBlue, 255);
        }
    }
}

function getFilterBinary(imageData) {

    for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {
            var avg = (getRed(imageData, x, y) + getGreen(imageData, x, y) + getBlue(imageData, x, y)) / 3;
            if (avg > 130) {
                setPixel(imageData, x, y, 0, 0, 0, 255);
            }
            else {
                setPixel(imageData, x, y, 255, 255, 255, 255);
            }

        }
    }
}

//****************************************************************************** */

