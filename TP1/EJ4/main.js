var ctx = document.getElementById("canvas").getContext("2d");

var width = 500;
var height = 600;

var imageData = ctx.createImageData(width, height);

var r = 0;
var g = 0;
var b = 0;
var a = 255;

var MAX = width / 2;

for (let x = 0; x < width / 2; x++) {

    for (let y = 0; y < height; y++) {
        setPixel(imageData, x, y, r, g, b, a);
        r = getColorVal(x);
        g = getColorVal(x);
    }
    r = 0;
    g = 0;
}

// Set R and B by default
r = 255;
b = 0;
g = 0;
for (let x = width / 2; x < width; x++) {

    for (let y = 0; y < height; y++) {
        setPixel(imageData, x, y, r, g, b, a);
        g = getColorValDesplazado(x);
    }
    g = 0;

}

function getColorVal(x) {
    return Math.floor((x / width) * 255);
}

function getColorValDesplazado(x) {
    return Math.floor(255 - (((x - MAX) / MAX) * 255));
}

ctx.putImageData(imageData, 0, 0);

function setPixel(imageData, x, y, r, g, b, a) {

    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;

}