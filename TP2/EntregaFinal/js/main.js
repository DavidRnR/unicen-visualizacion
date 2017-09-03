// Hanoi Canvas
var ctx = null;

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
                case 'html/hanoi.html':
                    document.getElementById('app-loader').innerHTML = data;
                    onSetCanvas();
                    onSetTowers();
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
    ctx = document.getElementById("canvas").getContext("2d");
}

function onSetTowers() {
    // First Tower
    towerOne = new HanoiTower();
    towerOne.draw();

    // Second Tower
    towerTwo = new HanoiTower(375, 100, 20, 250, 310);
    towerTwo.draw();

    // Third Tower
    towerThree = new HanoiTower(685, 100, 20, 250, 620);
    towerThree.draw();
}