require("dotenv").config({ path: "../.env" });
module.exports = {
   development: {
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DBHOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_TYPE,
   },
   test: {
      username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "postgres",
   },
   production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "postgres",
   },
};
