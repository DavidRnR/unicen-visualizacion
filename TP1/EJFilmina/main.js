var ctx = document.getElementById("canvas").getContext("2d");

ctx.fillStyle = "#000000";
ctx.fillRect(250, 25, 150 ,100);
ctx.beginPath();
ctx.arc(450, 110, 100, Math.PI * 1/2, Math.PI * 3/2);
ctx.lineWidth = 15;
ctx.lineCap = 'round';
ctx.strokeStyle = 'rgba(255, 127 ,0 ,0.5)';
ctx.stroke();

var imageData = ctx.createImageData(width, height);

for (var x = 0; x < width; x++) {
    
    for(var y = 0; y < height; y++) {
        setPixel(imageData, x, y, r, g, b, a);
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