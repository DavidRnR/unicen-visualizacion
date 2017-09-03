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
                default:
                    break;
            }
        }).catch(err => console.log(err));
}