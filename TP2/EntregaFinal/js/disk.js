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