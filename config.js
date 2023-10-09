const mysql = require("mysql");

// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "db_strategytool",
//   // database: "handsin_strategytool",
// });

const conn = mysql.createConnection({
  host: env("DATABASE_HOST", "localhost"),
  port: env.int("DATABASE_PORT", 3306),
  database: env("DATABASE_NAME", "strategytool"),
  user: env("DATABASE_USERNAME", "strategytooluser"),
  password: env("DATABASE_PASSWORD", "Ekk#hy&2e%~y"),
  ssl: env.bool("DATABASE_SSL", false),
});
module.exports = conn; // Export the connection object
