var ctx = document.getElementById("canvas").getContext("2d");

var width = 800;
var height = 600;

// var imageData = ctx.createImageData(width, height);

// var r = 0;
// var g = 0;
// var b = 0;
// var a = 255;

// var middleWidth = width / 2;

// for (let x = 0; x < width / 2; x++) {

//     for (let y = 0; y < height; y++) {
//         setPixel(imageData, x, y, r, g, b, a);
//         r = getColorVal(x);
//         g = getColorVal(x);
//     }
//     r = 0;
//     g = 0;
// }

// /**
//  * Get Color value for the first half of the figure
//  * @param {*} x 
//  */
// function getColorVal(x) {
//     return Math.floor(x / middleWidth * 255);
// }

// // Set R and B by default
// r = 255;
// b = 0;
// g = 0;

// for (let x = width / 2; x < width; x++) {

//     for (let y = 0; y < height; y++) {
//         setPixel(imageData, x, y, r, g, b, a);
//         g = getColorValDesplazado(x);
//     }
//     g = 0;

// }

// /**
//  * Get Color value for the second half of the figure
//  * @param {*} x 
//  */
// function getColorValDesplazado(x) {
//     return Math.floor(255 - (((x - middleWidth) / middleWidth) * 255));
// }

// ctx.putImageData(imageData, 0, 0);

function setPixel(imageData, x, y, r, g, b, a) {

    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;

}

function myDrawImageMethod(image) {
    ctx.drawImage(image, 0, 0);
}

var image1 = new Image();
image1.src = "image1.jpg";

image1.onload = function () {
    // myDrawImageMethod(this);
    ctx.drawImage(this, 0, 0);

    imageData = ctx.getImageData(0, 0, this.width, this.height);
    // getFilterBlackWhite(imageData);
    // getFilterNegative(imageData);
    getFilterSepia(imageData);
    ctx.putImageData(imageData, 0, 0);
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
            setPixel(imageData,x,y, 255-getRed(imageData,x,y), 255-getBlue(imageData,x,y), 255-getGreen(imageData,x,y), 255);
        }
    }
}

function getFilterSepia(imageData) {


    for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {

            let outputRed = (getRed(imageData, x, y) * .393) + (getGreen(imageData, x, y) * .769) + (getBlue(imageData, x, y) * .189);
            let outputGreen = (getRed(imageData, x, y) * .349) + (getGreen(imageData, x, y) * .686) + (getBlue(imageData, x, y) * .168);
            let outputBlue = (getRed(imageData, x, y) * .272) + (getGreen(imageData, x, y) * .534) + (getBlue(imageData, x, y) * .131);

            setPixel(imageData, x, y,  outputRed,  outputGreen,  outputBlue, 255);
        }
    }
}
