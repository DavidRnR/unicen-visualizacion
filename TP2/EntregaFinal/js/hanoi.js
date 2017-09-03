// Hanoi's Towers
var towerOne = null;
var towerTwo = null;
var towerThree = null;

// Disks
var diskOne = null;

/**
 * Hanoi Tower Object
 * @param {*} paramPosX 
 * @param {*} paramPosY 
 * @param {*} _width 
 * @param {*} _height 
 * @param {*} bPosX 
 * @param {*} bPosY 
 * @param {*} bWidth 
 * @param {*} bHeight 
 * @param {*} paramColour 
 */
function HanoiTower(paramPosX = 80, paramPosY = 100, _width = 20, _height = 250, bPosX = 10, bPosY = 350, 
                    bWidth = 150, bHeight = 30, paramColour = "#445677") {
    this.posX = paramPosX,
    this.posY = paramPosY,
    this.width = _width,
    this.height = _height,
    this.baseWidth = bWidth,
    this.baseHeight = bHeight,
    this.basePosX = bPosX,
    this.basePosY = bPosY,
    this.colour = paramColour,
    this.isDragging = false
    this.disks = [];
}

/**
 * Hanoi Tower Draw
 */
HanoiTower.prototype.draw = function () {
    ctx.fillStyle = this.colour;
    ctx.beginPath();
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
    ctx.fillRect(this.basePosX, this.basePosY, this.baseWidth, this.baseHeight);
    ctx.closePath();
}

HanoiTower.prototype.addDisk = function () {
    let disk = new Disk(this, 145, 20, 'red');
    this.disks.push();
    disk.draw(this);
}

//************************** Disk ******************************/

/**
 * Disk Object
 * @param {*} HanoiTower 
 * @param {*} width 
 * @param {*} height 
 * @param {*} colour 
 */
function Disk(HanoiTower, width, height, colour) {
    this.colour = colour;
    this.width = width;
    this.height = height;
    this.moveToTower(HanoiTower);
}

Disk.prototype.draw = function(HanoiTower) {
    ctx.beginPath();   
    ctx.rect(HanoiTower.posX - 68, HanoiTower.basePosY - this.height, this.width, this.height);
    ctx.closePath(); 
    ctx.save();
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.restore();
}

Disk.prototype.moveToTower = function (HanoiTower) {

}

