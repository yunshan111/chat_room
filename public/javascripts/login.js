
async function fetch_response() {
    let response = await fetch('http://localhost:3000/login');
    return response.statusCode;
}




const loginBtn = document.querySelector('#login_button');
loginBtn.onclick = function (e) {



    const user_name = document.getElementById('username').value;
    const password = document.getElementById('pswd').value;

    fetch('http://localhost:3000/login', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ login_name : user_name, login_pswd: password})
    })
        .then(response => response.json())
        .then(json => console.log(json))
    const status = fetch_response();

    if(status === 2){
        e.preventDefault();
    }


}

