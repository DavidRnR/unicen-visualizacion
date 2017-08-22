// Filter Selected
var filterSelected = "";

// Input value to set differents % of X Filter
var rangeFilter = function () { 
    return ($('#range-slider-input').val()) ? parseInt($('#range-slider-input').val()) : 50;
};

/**
 * Filter Black & White
 * @param {*} imageData 
 */
function getFilterBlackWhite(imageData) {

    let rangeFilterVal = rangeFilter() / 100;
  
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
function getFilterNegative(imageData) {

    let rangeFilterVal = Math.floor((rangeFilter() * 255) / 100);

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

/**
 * Filter Binary
 * @param {*} imageData 
 */
function getFilterBinary(imageData) {

    let rangeFilterVal = Math.floor((rangeFilter() * 255) / 100);

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
function getFilterBrightness (imageData) {

    let rangeFilterVal = Math.floor((rangeFilter() * 255) / 100);   
   
    for (var y = 0; y < imageData.height; y++) {
        for (var x = 0; x < imageData.width; x++) {
          var r = getRed(imageData,x,y) + rangeFilterVal;
          var g = getGreen(imageData,x,y)+ rangeFilterVal;
          var b = getBlue(imageData,x,y)+ rangeFilterVal;
          setPixel(imageData,x,y,r,g,b,255);
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