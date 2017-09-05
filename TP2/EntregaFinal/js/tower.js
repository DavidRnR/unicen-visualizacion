// Hanoi's Towers
var towerOne = null;
var towerTwo = null;
var towerThree = null;

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
    this.top = bPosY - 20,
    this.colour = paramColour,
    this.disks = [];
}

/**
 * Hanoi Tower Draw
 */
HanoiTower.prototype.draw = function () {
    canvasHanoiTower.ctx.fillStyle = this.colour;
    canvasHanoiTower.ctx.beginPath();
    canvasHanoiTower.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    canvasHanoiTower.ctx.fillRect(this.basePosX, this.basePosY, this.baseWidth, this.baseHeight);
    canvasHanoiTower.ctx.closePath();
}

HanoiTower.prototype.addDisk = function () {

    while(diskData.length != 0) {
        let diskSpec = diskData.pop();
        let disk = new Disk(this, diskSpec.width, 20, diskSpec.colour);
        this.disks.push(disk);
        disk.draw(this);
        this.top -= 20; 
    }
    
}




