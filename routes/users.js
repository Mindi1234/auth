const express = require("express");
const crypto = require("crypto");
const { addToken, removeToken } = require('../Services/token');
const router = express.Router();

let users = [
    { name: "mimi", password: "123@" },
    { name: "ayala", password: "134@" }
  ];


function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}



router.post("/login", (req, res) => {
  const { name, password } = req.body;

  const user = users.find(u => u.name === name && u.password === password);

  if (!user) {
    return res.status(404).json({ messege: 'User no found' });
}
if (user.password !== password) {
    return res.status(401).json({ messege: 'Incorrect password' });
}
  const token = generateToken();
  addToken(token);
  res.json({ token });

});

router.post("/register", (req, res) => {
  const { name, password } = req.body;
  const newUser = { name, password };

  const existingUser = users.find(u => u.name === newUser.name);
  if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
  }

  users.push(newUser);
  const token = generateToken();
  addToken(token); 
  res.status(201).json({ token });
});


router.post("/logout", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: " Authorization header missing" });
  }

  const parts = authHeader.split(" ");
  if (parts[0] !== "Bearer" || !parts[1]) {
    return res.status(401).json({ message: "wrong Authorization" });
  }

  const token = parts[1];

  removeToken(token);

  res.json({ message: "succses" });
});


module.exports =  router;