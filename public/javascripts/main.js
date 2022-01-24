

const socket = io();

var div = document.getElementById("message_container");
const user_name = document.getElementById('username');
const password = document.getElementById('pswd');



socket.on('message', message=>{
    console.log(message)
})


$('form').submit(function () {
    var text = $('#message').val();
    var initials = getQueryVariable('username')
    var date = Date();
    var message = date + ";" + initials + ';' + text;
    socket.emit('message', message);
    $('#message').val('');
    return false;
});

socket.on('message', function (msg) {
    const tem = msg.split(";");
    const div = document.createElement('div');
    div.classList.add('message_content');
    const p = document.createElement('p');
    p.classList.add('name');
    p.innerText = tem[1];
    div.appendChild(p);
    const time = document.createElement('p');
    time.classList.add('time');
    time.innerText = tem[0];
    div.appendChild(time);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = tem[2];
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
});

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}




