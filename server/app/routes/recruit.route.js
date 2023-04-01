const express = require("express");

const recruit = require("../controllers/recruit.controller");

const router = express.Router();

router.get("/", recruit.findAll);

router.post("/", recruit.create);

module.exports = router;