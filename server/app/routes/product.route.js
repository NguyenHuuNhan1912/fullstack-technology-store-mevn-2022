const express = require("express");

const product = require("../controllers/product.controller");

const router = express.Router();

router.get("/", product.findAll);

router.post("/", product.create);

router.get("/filter", product.filter);

router.get("/:id", product.findOne);

router.put("/:id", product.update);

router.delete("/:id", product.delete);

router.delete("/",product.deleteAll);



module.exports = router;