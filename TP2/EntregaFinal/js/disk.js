// diskData Stack
var diskData =[
    {
        width: 40,
        colour: 'brown'
    },
    {
        width: 60,
        colour: 'black'
    },
    {
        width: 80,
        colour: 'grey'
    },
    {
        width: 100,
        colour: 'orange'
    },
    {
        width: 120,
        colour: 'red'
    },
    {
        width: 140,
        colour: 'green'
    },
    {
        width: 160,
        colour: 'blue'
    },
    {
        width: 180,
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
function Disk(HanoiTower, width, colour) {
    this.colour = colour;
    this.width = width;
    this.height = DISK_HEIGHT;
    this.posX = null;
    this.posY = null;
    this.draggable = false;
    this.currentTower = HanoiTower;
}

Disk.prototype.draw = function(HanoiTower = null, x = null, y = null) {
    canvasHanoiTower.ctx.beginPath();  

    let posX = (x) ? x : HanoiTower.basePosX + HANOI_TOWER_WIDTH - this.width - (HANOI_TOWER_WIDTH - this.width) / 2;
    let posY = (y) ? y : HanoiTower.top;

    canvasHanoiTower.ctx.rect(posX, posY , this.width, this.height);

    this.posX = posX;
    this.posY = posY;

    canvasHanoiTower.ctx.closePath(); 
    canvasHanoiTower.ctx.save();

    let grd = canvasHanoiTower.ctx.createLinearGradient(this.posX, this.posY, this.posX + this.width, this.posY + this.height);
    grd.addColorStop(0,this.colour);
    grd.addColorStop(0.9,this.colour);
    grd.addColorStop(1, "#f0ffea" );
    
    canvasHanoiTower.ctx.fillStyle = grd;
    // canvasHanoiTower.ctx.fillRect(20,20,150,100);

    // canvasHanoiTower.ctx.fillStyle = this.colour;
    canvasHanoiTower.ctx.fill();
    canvasHanoiTower.ctx.restore();
}

Disk.prototype.moveToTower = function (HanoiTower) {
    this.currentTower = HanoiTower;
    this.draw(HanoiTower);
}

Disk.prototype.clear = function () {
    canvasHanoiTower.ctx.clearRect(this.posX, this.posY, this.width, this.height);
}