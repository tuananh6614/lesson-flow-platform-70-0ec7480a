
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // default XAMPP password is empty
  database: 'epulearn', // make sure to create this database in phpMyAdmin
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

module.exports = promisePool;
