const express = require("express");
const productsController = require("../controllers/products-controller");

const router = express.Router();

router.get("/", productsController.getProducts);
router.post("/", productsController.postProduct);
router.put("/", productsController.putProduct);
router.delete("/:productId", productsController.deleteProduct);

module.exports = router;
