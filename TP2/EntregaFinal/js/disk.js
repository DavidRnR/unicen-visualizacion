// diskData Stack
var diskData =[
    {
        width: 134,
        colour: 'red'
    },
    {
        width: 138,
        colour: 'green'
    },
    {
        width: 142,
        colour: 'blue'
    },
    {
        width: 145,
        colour: 'yellow'
    }
]

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
    this.posX = null;
    this.posY = null;
    this.draggable = false;
    this.currentTower = HanoiTower;
}

Disk.prototype.draw = function(HanoiTower = null, x = null, y = null) {
    canvasHanoiTower.ctx.beginPath();   

    let posX = (x) ? x : HanoiTower.posX - 68;
    let posY = (y) ? y : HanoiTower.top;

    canvasHanoiTower.ctx.rect(posX, posY , this.width, this.height);

    this.posX = posX;
    this.posY = posY;

    canvasHanoiTower.ctx.closePath(); 
    canvasHanoiTower.ctx.save();
    canvasHanoiTower.ctx.fillStyle = this.colour;
    canvasHanoiTower.ctx.fill();
    canvasHanoiTower.ctx.restore();
}

Disk.prototype.moveToTower = function (HanoiTower) {
    this.draw(HanoiTower);
}

Disk.prototype.clear = function () {
    canvasHanoiTower.ctx.clearRect(this.posX, this.posY, this.width, this.height);
}