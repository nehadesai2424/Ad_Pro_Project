const mysql2 = require('mysql2'); // Use mysql2 for better support

class DBClass {
    constructor() {
        this.connection = mysql2.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'ad_pro_db'
        });

        this.connection.connect((err) => {
            if (err) {
                console.error('Database connection failed:', err.message);
                return;
            }
            console.log('Database connected successfully');
        });
    }

    execute(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) {
                    console.error('SQL Execution Error:', err.message);
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err.message);
                    return reject(err);
                }
                console.log('Database connection closed');
                resolve();
            });
        });
    }
}

new DBClass(); //for checking the connection
module.exports = DBClass;
