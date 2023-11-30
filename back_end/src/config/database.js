const pgp = require('pg-promise')();
var config = {
    user:process.env.USER, 
    database:process.env.DB_NAME, 
    password:process.env.PASSWORD,
    host:process.env.DBHOST,
    port:process.env.DB_PORT,
}
const db = pgp(config);

module.exports = db;
