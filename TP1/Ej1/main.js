var ctx = document.getElementById("canvas").getContext("2d");

var width = 200;
var height = 400;

var imageData = ctx.createImageData(width, height);

var r = Math.random() * (0 - 255) + 255;
var g = Math.random() * (0 - 255) + 255;
var b = Math.random() * (0 - 255) + 255;

for (var x = 0; x < width/2; x++) {
    
    for(var y = 0; y < height; y++) {
        setPixel(imageData, x, y, r , g, b, 255);
    }
    
}

r = Math.random() * (0 - 255) + 255;
g = Math.random() * (0 - 255) + 255;
b = Math.random() * (0 - 255) + 255;

for (var x = width/2; x < width; x++) {
    
    for(var y = 0; y < height; y++) {
        setPixel(imageData, x, y, r , g, b, 255);
    }
    
}

ctx.putImageData(imageData, 0, 0);

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}