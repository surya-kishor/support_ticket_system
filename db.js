const mysql = require('mysql2');


// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@1',
    database: 'tickets_system',
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});
module.exports = db;