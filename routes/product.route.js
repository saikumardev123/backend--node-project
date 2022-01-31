var express = require('express');
var router = express.Router();

var productController = require("../controllers/product.controller");

router.post("/product",productController.add);
router.get("/products",productController.getProducts);
router.get("/product/:pid",productController.getProduct);
router.put("/product", productController.updateProduct);
router.delete("/product/:pid", productController.removeProduct);

module.exports = router;