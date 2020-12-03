const express = require("express");
const router = express.Router();
const app = express();
const port = 3000;
const path = require("path");
const pgDataAccess = require("./DataAccess/pgDataAccess.js");
const http = require("http");
const server = http.createServer(app);
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const socketio = require("socket.io");
const io = socketio(server);
require("dotenv").config();

app.use("/", express.static(path.join(__dirname, "client/build")));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false }))


const jwtMW = exjwt({
  secret: process.env.SECRET, algorithms: ['RS256']
});

app.post("/api/register", async (req, res) => {
  let pool = await pgDataAccess.dbConnection();
  console.log(pool);

  try {
  } catch(err) {
    console.log(err)
  }

});

app.post("/api/authorize", async (req, res) => {
  const { username, password } = req.body;
});

app.get("/*", async (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
