

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/getAll')
        .then(response => response.json())


});



const addBtn = document.querySelector('#create_button');
addBtn.onclick = function () {
    const user_name = document.getElementById('username').value;
    const password = document.getElementById('pswd').value;

    fetch('http://localhost:3000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ send_name : user_name, send_password: password})
    })
        .then(response => response.json())
        .then(json => console.log(json))

}


