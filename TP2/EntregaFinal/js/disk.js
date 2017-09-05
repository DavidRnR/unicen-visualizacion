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
    this.currentTower = HanoiTower;
}

Disk.prototype.draw = function(HanoiTower) {
    ctx.beginPath();   
    ctx.rect(HanoiTower.posX - 68, HanoiTower.top, this.width, this.height);
    ctx.closePath(); 
    ctx.save();
    ctx.fillStyle = this.colour;
    ctx.fill();
    ctx.restore();
}

Disk.prototype.moveToTower = function (HanoiTower) {
    this.draw(HanoiTower);
}

