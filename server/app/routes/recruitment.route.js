const express = require("express");

const recruitment = require("../controllers/recruitment.controller");

const router = express.Router();

router.post("/", recruitment.create);

router.get("/", recruitment.findAll);


module.exports = router;