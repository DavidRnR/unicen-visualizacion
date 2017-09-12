var onSubmitScore = null;

var firebaseUrl = "https://towers-of-hanoi-8c023.firebaseio.com/scores";

/**
 * Firebase Get Scores
 */
function getScores() {

    // Loading Icon
    document.getElementsByClassName('hanoi-score-list')[0].innerHTML = '<i class="fa fa-spinner fa-spin"></i>';

    // Headers
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let options = {
        headers: headers,
        cache: 'default'
    };

    // Build endpoint
    let endpoint = firebaseUrl + "/" + hanoiTowersGame.quantDisks +".json";

    let myRequest = new Request(endpoint, options);

    fetch(myRequest)
        .then(response => {
            return response.json();
        }).then(data => {

            if (data) {

                 // Hide Loading Icon
                document.getElementsByClassName('hanoi-score-list')[0].innerHTML = '';

                // Render Data              
                for (var key in data) {
                    let row = "<div class='row'><div class='col-md-3'>" + data[key].name + "</div><div class='col-md-3'>" + data[key].disks + " Disc</div><div class='col-md-3'>" + data[key].moves + " Movs</div><div class='col-md-3'>" + data[key].time + "</div></div><hr>"
                    document.getElementsByClassName('hanoi-score-list')[0].innerHTML += row;                 
                }
            }

        }).catch(err => console.log(err));
}

/**
 * Firebase POST Score
 * @param {*} data 
 */
function postScore(data = null) {
    
    // Keep Original data
    var dataRender = data;

    data = JSON.stringify(data);   

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let options = {
        headers: headers,
        method: "POST",
        body: data,
        cache: 'default'
    };

    // Build endpoint
    let endpoint = firebaseUrl + "/" + hanoiTowersGame.quantDisks +".json";

    let myRequest = new Request(endpoint, options);

    fetch(myRequest)
        .then(response => {
            return response.json();
        }).then(data => {

            // If response ID
            if (data) {
                // Render Data
                let row = "<div class='row'><div class='col-md-3'>" + dataRender.name + "</div><div class='col-md-3'>" + dataRender.disks + " Disc</div><div class='col-md-3'>" + dataRender.moves + " Movs</div><div class='col-md-3'>" + dataRender.time + "</div></div><hr>"
 
                document.getElementsByClassName('hanoi-score-new-record')[0].innerHTML += row;
        
                // Clean Form
                document.getElementsByClassName('form-score')[0].innerHTML = null;
                
            }

        }).catch(err => console.log(err));
}



