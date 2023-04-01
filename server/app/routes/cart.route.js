const express = require("express");

const cart = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", cart.findAll);

router.post("/", cart.create);

router.put("/:id", cart.update);

module.exports = router;