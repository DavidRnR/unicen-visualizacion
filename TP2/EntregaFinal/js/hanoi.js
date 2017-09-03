// Hanoi's Towers
var towerOne = null;
var towerTwo = null;
var towerThree = null;

function HanoiTower(paramPosX = 80, paramPosY = 100, _width = 20, _height = 250, bPosX = 10, bPosY = 350, 
                    bWidth = 150, bHeight = 30, paramColor = "#445677") {
    this.posX = paramPosX,
    this.posY = paramPosY,
    this.width = _width,
    this.height = _height,
    this.baseWidth = bWidth,
    this.baseHeight = bHeight,
    this.basePosX = bPosX,
    this.basePosY = bPosY,
    this.color = "#445677",
    this.isDragging = false
}

HanoiTower.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
    ctx.fillRect(this.basePosX, this.basePosY, this.baseWidth, this.baseHeight);
}