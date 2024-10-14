const mysql = require('mysql2/promise');


// MySQL connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Password@1',
    database: 'tickets_system',
});

// db.connect((err) => {
//     if (err) throw err;
//     console.log('MySQL connected...');
// });
module.exports = pool;