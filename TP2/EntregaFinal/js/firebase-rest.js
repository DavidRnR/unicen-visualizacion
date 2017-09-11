var onSubmitScore = null;

var firebaseUrl = "https://towers-of-hanoi-8c023.firebaseio.com/scores.json";

/**
 * Firebase Get Scores
 */
function getScores() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let options = {
        headers: headers,
        cache: 'default'
    };
    let myRequest = new Request(firebaseUrl, options);

    fetch(myRequest)
        .then(response => {
            return response.json();
        }).then(data => {

            if (data) {
                // Render Data
                for (var key in data) {
                    let row = "<tr><td>" + data[key].name + "</td><td>" + data[key].moves + " Movs</td><td>" + data[key].time + "</td></tr>"
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
    let myRequest = new Request(firebaseUrl, options);

    fetch(myRequest)
        .then(response => {
            return response.json();
        }).then(data => {

            // If response ID
            if (data) {
                // Render Data
                let row = "<tr><td>" + dataRender.name + "</td><td>" + dataRender.moves + " Movs</td><td>" + dataRender.time + "</td></tr>"
                document.getElementsByClassName('hanoi-score-list')[0].innerHTML += row;

                // Clean Form
                document.getElementsByClassName('form-score')[0].innerHTML = null;
                
            }

        }).catch(err => console.log(err));
}



