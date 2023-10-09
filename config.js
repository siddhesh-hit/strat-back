const mysql = require("mysql");

// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "db_strategytool",
//   // database: "handsin_strategytool",
// });

const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "strategytool",
  user: "strategytooluser",
  password: "Ekk#hy&2e%~y",
  ssl: false,
});
module.exports = conn; // Export the connection object
