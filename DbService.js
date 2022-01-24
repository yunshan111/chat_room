
const mysql = require('mysql');
let instance = null;



const database = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'nodemysql'
});


database.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL created');
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM posts;";

                database.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewName(name, password) {
        try {

            const query = "INSERT INTO posts (username, password) VALUES (?,?);";
            database.query(query, [name, password],
                (err,result) => {
                    console.log(err);
                })

            return {
                name : name,
                password : password
            };
        } catch (error) {
            console.log(error);
        }
    }


    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT password FROM names WHERE name = ?;";

                database.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = DbService;