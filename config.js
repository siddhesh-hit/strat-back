const mysql = require("mysql");

// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "db_strategytool",
//   // database: "handsin_strategytool",
// });

const conn = mysql.createConnection({
  host: "81.0.246.139",
  port: 3306,
  database: "strategytool",
  user: "strategytooluser",
  password: "Ekk#hy&2e%~y",
  ssl: false,
});
module.exports = conn; // Export the connection object
