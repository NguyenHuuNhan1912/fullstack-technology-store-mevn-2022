const express = require("express");

const feedback = require("../controllers/feedback.controller");

const router = express.Router();

router.get("/", feedback.findAll);

router.post("/", feedback.create);

module.exports = router;