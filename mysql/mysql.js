const mysql = require("mysql2")


const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'shopping'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Daatabase connetcion Successful");
});

module.exports = db;