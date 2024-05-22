const express = require("express");
const router = express.Router();
const productController = require("../../controllers/api/productsController");

router.get("/home", productController.index);
router.get("/:productId", productController.productDetails);
router.post("/createnew", productController.createProduct);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
