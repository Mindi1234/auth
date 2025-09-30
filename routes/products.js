const express = require("express");

const router = express.Router();

let products = [
    { id: 1, title: "products One" },
    { id: 2, title: "products Two" }
  ];

  router.get('/', (req, res) => {
    res.status(200).json(products);
  });

module.exports =  router;