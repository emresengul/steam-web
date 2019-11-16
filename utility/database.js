const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: process.env.HOST_DATABASE,
    user: process.env.USER_DATABASE,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DATABASE
});
module.exports = connection.promise();