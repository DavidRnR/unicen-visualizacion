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
function HanoiTower(paramPosX = 90, paramPosY = 100, _width = 20, _height = 250, bPosX = 0, bPosY = 350, 
                    bWidth = 200, bHeight = 30, paramColour = "#445677") {
                     
    this.posX = paramPosX,
    this.posY = paramPosY,
    this.width = _width,
    this.height = _height,
    this.baseWidth = bWidth,
    this.baseHeight = bHeight,
    this.basePosX = bPosX,
    this.basePosY = bPosY,
    this.top = bPosY,
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

/**
 * Load Disks
 */
HanoiTower.prototype.loadDisks = function () {

    while(hanoiTowersGame.quantDisks > 0) {
        let diskSpec = diskData.pop();
        let disk = new Disk(this, diskSpec.width, diskSpec.colour);
        this.disks.push(disk);
        this.top -= DISK_HEIGHT; 
        disk.draw(this);
        hanoiTowersGame.quantDisks--;
    }
    
    this.disks[this.disks.length - 1].draggable = true;
}

/**
 * Add a Disk
 */
HanoiTower.prototype.pushDisk = function (disk) {
    
            this.top -= DISK_HEIGHT; 
            this.disks.push(disk);
            
}

/**
 * Remove the Disk from the tower
 */
HanoiTower.prototype.removeDisk = function () {
    
            this.disks.pop();
            this.top += DISK_HEIGHT;
        
}

/**
 * Is Disk is on the TOP
 */
HanoiTower.prototype.isDiskonTop = function (disk) { 

    let diskTop = (this.disks && this.disks.length > 0 ) ? this.disks[this.disks.length - 1] : null;
    
    if(diskTop && diskTop.width === disk.width) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * if the Disk can be pushed to the top
 */
HanoiTower.prototype.canPushDiskonTop = function (disk) { 
    
    let diskTop = (this.disks && this.disks.length > 0 ) ? this.disks[this.disks.length - 1] : null;
    
    if(!diskTop) {
        return true;
    }
    else if(diskTop && diskTop.width > disk.width) {
        return true;
    }
    else {
        // If want to push the disk to a tower different than the disk is.
        if(this != disk.currentTower) {
            // Play Drop Disk Fails SoundFX
            dropDiskFailsFX.play();
        }

        return false;
    }
}




