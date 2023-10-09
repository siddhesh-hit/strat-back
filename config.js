const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_strategytool",
  // database: "handsin_strategytool",
});

module.exports = conn; // Export the connection object
