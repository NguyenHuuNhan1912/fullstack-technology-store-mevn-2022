const express = require("express");

const signin = require("../controllers/signin.controller");

const router = express.Router();

router.get("/", signin.findAll);

router.post("/", signin.create);

module.exports = router;