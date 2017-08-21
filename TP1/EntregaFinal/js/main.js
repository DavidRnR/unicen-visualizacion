var ctx = document.getElementById("canvas").getContext("2d");

// Canvas Filters
var ctxBW = document.getElementById("canvas-black-white").getContext("2d");
var ctxNegative = document.getElementById("canvas-negative").getContext("2d");
var ctxBinary = document.getElementById("canvas-binary").getContext("2d");
var ctxSepia = document.getElementById("canvas-sepia").getContext("2d");

function setPixel(imageData, x, y, r, g, b, a) {

    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;

}

var imageOrigin = new Image();
imageOrigin.src = "image1.jpg";

imageOrigin.onload = function () { 
    ctx.drawImage(this, 0, 0);

    imageData = ctx.getImageData(0, 0, this.width, this.height);
    // getFilterBlackWhite(imageData);
    // getFilterNegative(imageData);
    // getFilterSepia(imageData);
    // getFilterBinary(imageData);
    ctx.putImageData(imageData, 0, 0);
}

function onSetFilter(filter) {

        imageData = ctx.getImageData(0, 0, imageOrigin.width, imageOrigin.height);

        switch (filter) {
            case 'bw':
                getFilterBlackWhite(imageData);
                break;
            default:
                break;
        }     
        ctx.putImageData(imageData, 0, 0);
}


var imageBlackWhite = new Image();
imageBlackWhite.src = "image1.jpg";

imageBlackWhite.onload = function () {

    var w = imageBlackWhite.width;
    var h = imageBlackWhite.height;

    var sizer = scalePreserveAspectRatio(w,h,120,160);

    ctxBW.drawImage(this,0,0,w,h,0,0,w*sizer,h*sizer);

    imageData = ctxBW.getImageData(0, 0, this.width, this.height);
  
    getFilterBlackWhite(imageData);
 
    ctxBW.canvas.width = w*sizer;
    ctxBW.canvas.height = h*sizer;

    ctxBW.putImageData(imageData, 0, 0);
}

function scalePreserveAspectRatio(imgW,imgH,maxW,maxH){
    return(Math.min((maxW/imgW),(maxH/imgH)));
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

