const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const pgDataAccess = require("./DataAccess/pgDataAccess");
const http = require("http");
const server = http.createServer(http);
const socketio = require("socket.io");
const io = socketio(server);

const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");

require("dotenv").config();

app.use("/", express.static(path.join(__dirname, "client/build")));

const jwtMW = exjwt({
  secret: process.env.SECRET,
});

pgDataAccess.dbConnection();

app.post("/api/register", async (req, res) => {
  let pool = await pgDataAccess.dbConnection();
  const { username, password } = req.body;

  const hash = await bcrypt.hashSync(password, saltRounds);

  await pool.query("BEGIN");
  const result = await pool.query(
    `SELECT * FROM users WHERE username = "${username}";`
  );
  if (!result) {
    res.status(401).json({ message: "Username already exists" });
  }

  try {
  const insertResult = await pool.query(
    "INSERT INTO users(username, password) VALUES($1, $2)",
    [username, hash]
  );

  await pool.query("COMMIT");
  } catch(err) {
    
  }

});


app.post("/api/authorize", async (req, res) => {
  const { username, password } = req.body;
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));