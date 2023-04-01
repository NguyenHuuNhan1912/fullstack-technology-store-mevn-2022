const express = require("express");

const quiz = require("../controllers/quiz.controller");

const router = express.Router();

router.get("/", quiz.findAll);

router.post("/", quiz.create);

router.put("/:id", quiz.update);

module.exports = router;