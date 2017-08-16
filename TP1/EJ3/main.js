var ctx = document.getElementById("canvas").getContext("2d");

var width = 500;
var height = 600;

var imageData = ctx.createImageData(width, height);

var r = 0;
var g = 0;
var b = 0;
var a = 255; 

for (var x = 0; x < width; x++) {
    
    for(var y = 0; y < height; y++) {
        setPixel(imageData, x, y, r , g, b, a);
        r = getColorVal(y);
        g = getColorVal(y);
        b = getColorVal(y);
    }
    r = 0;
    g = 0;
    b = 0;
}

function getColorVal(y) {
    return Math.floor((y/height) * 255);
}

ctx.putImageData(imageData, 0, 0);

function setPixel(imageData, x, y, r, g, b, a) {

    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
     
}