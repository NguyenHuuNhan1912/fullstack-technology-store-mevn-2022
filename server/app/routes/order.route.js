const express = require("express");

const order = require("../controllers/order.controller");

const router = express.Router();

router.get("/", order.findAll);

router.post("/", order.create);

module.exports = router;