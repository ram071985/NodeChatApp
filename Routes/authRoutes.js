const express = require("express");
const router = express.Router();
const authDataAccess = require("../DataAccess/authDataAccess");
const socketService = require("../Services/socketService");
const io = socketService.getIo();

router.post("/login", async (req, res) => {
 
  const username = req.body.username;
  const password = req.body.password;

  let userMatch = await authDataAccess.logInUser(username, password);

  if (!userMatch.isSuccesful) {
    res.status(401).json({
      message: userMatch.errorMessage,
    });
  } else {
    res.status(201).send({ userMatch });
  }

  io.emit("user_online", JSON.stringify(userMatch));
});

router.post("/logout", async (req, res) => {
  const username = req.body.username;

  const id = (logOutUser = await authDataAccess.logOutUser(username));

  res.status(201).send({ logOutUser });

  io.emit("user_offline", JSON.stringify(logOutUser));
});

module.exports = router;
