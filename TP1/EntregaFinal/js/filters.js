// BLUR
const BLUR = "blur";
const BLURVAL = 1 / 9;

const BORDER = "border";
const BORDERVAL = 5;

// Filter Selected
var filterSelected = "";

// Input value to set differents % of X Filter
var rangeFilter = function () {
    return ($('#range-slider-input').val()) ? parseInt($('#range-slider-input').val()) : 100;
};


/**
 * Filter Black & White | Gray Scale
 * @param {*} imageData 
 */
function getFilterBlackWhite(imageData, rangeDefault) {

    let rangeFilterVal = (rangeDefault) ? rangeDefault : rangeFilter() / 100;

    for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {
            var i = (y * 4) * imageData.width + x * 4;
            var avg = (imageData.data[i] * rangeFilterVal + imageData.data[i + 1] * rangeFilterVal + imageData.data[i + 2] * rangeFilterVal) / 3;
            imageData.data[i] = avg;
            imageData.data[i + 1] = avg;
            imageData.data[i + 2] = avg;
        }
    }
}

/**
 * Filter Negative
 * @param {*} imageData 
 */
function getFilterNegative(imageData, rangeDefault = null) {

    let rangeFilterVal = (rangeDefault) ? rangeDefault : Math.floor((rangeFilter() * 255) / 100);

    for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {
            setPixel(imageData, x, y, rangeFilterVal - getRed(imageData, x, y), rangeFilterVal - getBlue(imageData, x, y), rangeFilterVal - getGreen(imageData, x, y), 255);
        }
    }
}

/**
 * Filter Sepia
 * @param {*} imageData 
 */
function getFilterSepia(imageData, rangeDefault = null) {

    let rangeFilterVal = (rangeDefault) ? rangeDefault : rangeFilter() / 2;

    for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {

            let outputRed = (getRed(imageData, x, y) * .393) + (getGreen(imageData, x, y) * .769) + (getBlue(imageData, x, y) * .189) + rangeFilterVal;
            let outputGreen = (getRed(imageData, x, y) * .349) + (getGreen(imageData, x, y) * .686) + (getBlue(imageData, x, y) * .168) + rangeFilterVal;
            let outputBlue = (getRed(imageData, x, y) * .272) + (getGreen(imageData, x, y) * .534) + (getBlue(imageData, x, y) * .131) + rangeFilterVal;

            setPixel(imageData, x, y, outputRed, outputGreen, outputBlue, 255);
        }
    }
}

/**
 * Filter Binary
 * @param {*} imageData 
 */
function getFilterBinary(imageData, rangeDefault = null) {

    let rangeFilterVal = (rangeDefault) ? rangeDefault : Math.floor((rangeFilter() * 160) / 100);

    for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {
            var avg = (getRed(imageData, x, y) + getGreen(imageData, x, y) + getBlue(imageData, x, y)) / 3;
            if (avg > rangeFilterVal) {
                setPixel(imageData, x, y, 0, 0, 0, 255);
            }
            else {
                setPixel(imageData, x, y, 255, 255, 255, 255);
            }

        }
    }
}

/**
 * Filter Brightness
 * @param {*} imageData 
 */
function getFilterBrightness(imageData, rangeDefault = null) {

    let rangeFilterVal = (rangeDefault) ? rangeDefault : Math.floor((rangeFilter() * 200) / 100);

    for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {
            var r = getRed(imageData, x, y) + rangeFilterVal;
            var g = getGreen(imageData, x, y) + rangeFilterVal;
            var b = getBlue(imageData, x, y) + rangeFilterVal;
            setPixel(imageData, x, y, r, g, b, 255);
        }
    }
}

/**
 * Filter Saturation
 * @param {*} imageData 
 */
function getFilterSaturation(imageData, rangeDefault = null) {

    // Saturation value. 0 = grayscale, 5 = Super Saturation
    var rangeFilterVal = (rangeDefault) ? rangeDefault : (rangeFilter() * 5) / 100;

    var luR = 0.3086; // constant to determine luminance of red. Similarly, for green and blue
    var luG = 0.6094;
    var luB = 0.0820;

    var az = (1 - rangeFilterVal) * luR + rangeFilterVal;
    var bz = (1 - rangeFilterVal) * luG;
    var cz = (1 - rangeFilterVal) * luB;
    var dz = (1 - rangeFilterVal) * luR;
    var ez = (1 - rangeFilterVal) * luG + rangeFilterVal;
    var fz = (1 - rangeFilterVal) * luB;
    var gz = (1 - rangeFilterVal) * luR;
    var hz = (1 - rangeFilterVal) * luG;
    var iz = (1 - rangeFilterVal) * luB + rangeFilterVal;


    for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {
            var saturatedRed = (az * getRed(imageData, x, y) + bz * getGreen(imageData, x, y) + cz * getBlue(imageData, x, y));
            var saturatedGreen = (dz * getRed(imageData, x, y) + ez * getGreen(imageData, x, y) + fz * getBlue(imageData, x, y));
            var saturatedBlue = (gz * getRed(imageData, x, y) + hz * getGreen(imageData, x, y) + iz * getBlue(imageData, x, y));

            setPixel(imageData, x, y, saturatedRed, saturatedGreen, saturatedBlue, 255);
        }
    }

}

/**
 * Filter Blur - Border
 * @param {*} imageData 
 */
function getFilterBlurBorder(imageData, rangeDefault = null, filter) {

    var rangeFilterVal = (rangeDefault) ? rangeDefault : Math.floor((rangeFilter() * 50) / 100);
    
    if(rangeFilterVal%2 != 0) {
        rangeFilterVal++;
    }

    if (filter == BLUR) {
        
        // Blur range 

        var sobelOne = [[BLURVAL,  BLURVAL,  BLURVAL],
        [ BLURVAL,  BLURVAL,  BLURVAL],
        [ BLURVAL, BLURVAL, BLURVAL]];
    }
    else if (filter == BORDER) {
        
        // Filter Border
  
        var sobelOne = [[rangeFilterVal * -1, 0, rangeFilterVal ],
        [rangeFilterVal * -2, 0, rangeFilterVal * 2],
        [rangeFilterVal * -1, 0 , rangeFilterVal]];

     
    }

    var imageDataCopy = ctx.createImageData(imageData.width, imageData.height);
    imageDataCopy.data.set(imageData.data);

    for (let index = 0; y < imageData.data.length; index++) {
        imageDataCopy.data.push(imageData.data[index]);
    }

    for (var y = 1; y < imageData.height - 2; y++) {
        for (var x = 1; x < imageData.width - 2; x++) {

            let pixelSelected = (getRed(imageDataCopy, x, y) + getGreen(imageDataCopy, x, y) + getBlue(imageDataCopy, x, y)) / 3;
            let pixelAround1 = (getRed(imageDataCopy, x + rangeFilterVal, y) + getGreen(imageDataCopy, x + rangeFilterVal, y) + getBlue(imageDataCopy, x + rangeFilterVal, y)) / 3;
            let pixelAround2 = (getRed(imageDataCopy, x - rangeFilterVal, y) + getGreen(imageDataCopy, x - rangeFilterVal, y) + getBlue(imageDataCopy, x - rangeFilterVal, y)) / 3;
            let pixelAround3 = (getRed(imageDataCopy, x - rangeFilterVal, y - rangeFilterVal) + getGreen(imageDataCopy, x - rangeFilterVal, y - rangeFilterVal) + getBlue(imageDataCopy, x - rangeFilterVal, y - rangeFilterVal)) / 3;
            let pixelAround4 = (getRed(imageDataCopy, x +rangeFilterVal, y - rangeFilterVal) + getGreen(imageDataCopy, x + rangeFilterVal, y - rangeFilterVal) + getBlue(imageDataCopy, x + rangeFilterVal, y - rangeFilterVal)) / 3;
            let pixelAround5 = (getRed(imageDataCopy, x, y - rangeFilterVal) + getGreen(imageDataCopy, x, y - rangeFilterVal) + getBlue(imageDataCopy, x, y - rangeFilterVal)) / 3;
            let pixelAround6 = (getRed(imageDataCopy, x, y + rangeFilterVal) + getGreen(imageDataCopy, x, y + rangeFilterVal) + getBlue(imageDataCopy, x, y + rangeFilterVal)) / 3;
            let pixelAround7 = (getRed(imageDataCopy, x - rangeFilterVal, y + rangeFilterVal) + getGreen(imageDataCopy, x - rangeFilterVal, y + rangeFilterVal) + getBlue(imageDataCopy, x - rangeFilterVal, y + rangeFilterVal)) / 3;
            let pixelAround8 = (getRed(imageDataCopy, x + rangeFilterVal, y + rangeFilterVal) + getGreen(imageDataCopy, x + rangeFilterVal, y + rangeFilterVal) + getBlue(imageDataCopy, x + rangeFilterVal, y + rangeFilterVal)) / 3;

            let pixelMatrix = [[pixelAround3, pixelAround5, pixelAround4],
            [pixelAround2, pixelSelected, pixelAround1],
            [pixelAround7, pixelAround6, pixelAround8]];

            var result = 0;

            for (var i = 0; i < pixelMatrix.length; i++) {
                result += pixelMatrix[i][0] * sobelOne[0][i] + pixelMatrix[i][1] * sobelOne[1][i] + pixelMatrix[i][2] * sobelOne[2][i];
            }

            setPixel(imageData, x, y, result, result, result, 255);
        }
    }

}



//*************************************************************************** */

/**
 * On set Pixel
 * @param {*} imageData 
 * @param {*} x 
 * @param {*} y 
 * @param {*} r Color
 * @param {*} g Color
 * @param {*} b Color
 * @param {*} a Transparency
 */
function setPixel(imageData, x, y, r, g, b, a) {

    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;

}

//********Get Red - Green - Blue *********** */
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
//********Get Red - Green - Blue *********** */


/**
 * On Slider Bar Change, Update Filter Value
 */
function onUpdateFilterValue() {
    onSetFilter(filterSelected);
}