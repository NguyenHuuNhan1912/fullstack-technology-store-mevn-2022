const express = require("express");

const introduce = require("../controllers/introduce.controller");

const router = express.Router();

router.get("/", introduce.findAll);

router.post("/", introduce.create);

module.exports = router;