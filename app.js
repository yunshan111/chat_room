const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbService = require('./DbService');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cors = require("cors");

const app = express();

/***
database.query("INSERT INTO posts (username, password) VALUES ('123', '123')");

function register (username, pswd){
    database.query("INSERT INTO posts (username, password) VALUES (?,?)" ,[username, pswd],
        (err,result) => {
            console.log(err);
        }
    );
}



app.post("/register", (req,res) => {

    const username = req.body.usernames;
    const pswd = req.body.passwords;
    database.query("INSERT INTO posts (username, password) VALUES (?,?)" ,[username, pswd],
        (err,result) => {
            console.log(err);
        }
    );
});


app.get('/createdb', (req, res) =>{
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send('DB created')

    });
})

app.get('/createtable',(req, res) =>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('table created')
    })
})

***/



app.use(logger('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
})



// create
app.post('/insert', (request, response) => {
    const username1 = request.body.send_name;
    const password1 = request.body.send_password;
    const database = dbService.getDbServiceInstance();

    const result = database.insertNewName(username1, password1);

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});

// login
app.post('/login', (request, response) => {
    const username2 = request.body.login_name;
    const password2 = request.body.login_pswd;
    const database = dbService.getDbServiceInstance();
    const result = database.searchByName(username2);
    if(result !== password2){
        response.statusCode = 2;
        response.send('false');
    }

    result
        .then(data => response.json({ data: data}))
        .catch(err => console.log(err));
});






module.exports = app;


