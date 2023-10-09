const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
const logger = require("logger");
const { application, request, response, json } = require("express");
const { resourceLimits } = require("worker_threads");
const { callbackPromise } = require("nodemailer/lib/shared");
const EmailService = require("./middleware/Emailservice");
const dateTime = require("node-datetime");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const routerStrategy = require("./routes/route");
const conn = require("./config");
const app = express();

// cors;
app.options("*", cors());
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);

// directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api", routerStrategy);

conn.connect((err) => {
  if (err) {
    console.log(err, "error");
  }
  console.log("mysql Connected...");
});

app.listen("5000", () => {
  console.log("sever started successfully on", 5000);
});
