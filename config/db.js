const mysql = require ('mysql2/promise');
require ('dotenv').config();

const pool =mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function ConnecttoDatabase() {
    try {
        await pool.getConnection();
        console.log("successfully connection maintain");
    } catch (err) {
        console.log("error in connecting the database connection", err.message);
        process.exit(1);
    } 
}

module.exports= {pool, ConnecttoDatabase};
