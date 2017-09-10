// Hanoi Canvas
var canvasHanoiTower = null;

 // Create GamePlay
var hanoiTowersGame = new HanoiTowersGame();

//Current Mouse Positions
var startX;
var startY;

// Dragging
var dragok = false;

// Disk & Tower Selected
var diskSelected;
var towerSelected;


/**
 * On load page, render the menu
 */
renderHtml('html/home.html');

/**
 * Render HTML
 * @param {url} url 
 */
function renderHtml(url) {
    let headers = new Headers();
    headers.append("Content-Type", "text/html");

    let options = {
        headers: headers,
        mode: 'no-cors',
        cache: 'default'
    };
    let myRequest = new Request(url, options);

    fetch(myRequest)
        .then(response => {
            return response.text();
        }).then(data => {

            switch (url) {
                case 'html/home.html':
                    document.getElementById('app-loader').innerHTML = data;
                    break;
                case 'html/rules.html':
                    document.getElementById('app-loader').innerHTML = data;
                    break;
                case 'html/hanoi.html':
                    document.getElementById('app-loader').innerHTML = data;
                    onSetCanvas();
                    break;
                default:
                    break;
            }
        }).catch(err => console.log(err));
}

/**
 * Set Main Canvas
 */
function onSetCanvas() {
    // Main Canvas
    canvasHanoiTower = new CanvasHanoiTower();

    // Set canvas for the Game
    hanoiTowersGame.canvas = canvasHanoiTower;   

    // Set Towers
    onSetTowers();

}

function onSetTowers() {
    // First Tower
    towerOne = new HanoiTower();
    towerOne.draw();
    towerOne.loadDisks();

    // Add Tower
    canvasHanoiTower.addTower(towerOne);

    // Second Tower
    towerTwo = new HanoiTower(390, 100, 20, 250, 300);
    towerTwo.draw();
    // Add Tower
    canvasHanoiTower.addTower(towerTwo);

    // Third Tower
    towerThree = new HanoiTower(690, 100, 20, 250, 600);
    towerThree.draw();
    // Add Tower
    canvasHanoiTower.addTower(towerThree);
    console.log(canvasHanoiTower);

    // Start Timer!
    hanoiTowersGame.timer();
}


/**
 * Hanoi Tower Game
 */
function HanoiTowersGame() {
    this.canvas = null;
    this.time = 0;
    this.win = false;
    this.quantDisks = 4;
}

/**
 * Check if the last Tower has got all the Disks
 */
HanoiTowersGame.prototype.checkGame = function () {
    if (this.canvas.towers[2].disks.length == 4) {
        alert("You Win!");
        this.win = true;
    }
}

/**
 * Hanoi Towers Timer
 */
HanoiTowersGame.prototype.timer = function () {
    let h = 0;
    let s = 0;
    let m = 0;
    let H = 0;
    let M = 0;
    let S = 0;

    setInterval(() => {
        if (!this.win) {
            s += 1;
            if (s == 60) {
                m += 1;
                s = 0;
            }
            if (m == 60) {
                h += 1;
                m = 0;
            }
            if (s < 10) {
                S = "0" + s;
            } else {
                S = s;
            }
            if (m < 10) {
                M = "0" + m;
            } else {
                M = m;
            }
            if (h < 10) {
                H = "0" + h;
            } else {
                H = h;
            }
            $(".timer").text(H + " : " + M + " : " + S);

        }
    }, 1000);


}

/**
 * On Set Quantity of Disks
 * @param {*} event 
 */
function onSetDisksQuant(event) {
    hanoiTowersGame.quantDisks = event.value;
}
