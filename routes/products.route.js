let express = require("express");
let ProductRouter = express.Router();
let productController = require("./../controller/product.controller");

ProductRouter.get("/", productController.getAllProducts);
ProductRouter.get("/:productId", productController.getProductById);
ProductRouter.post("/", productController.addNewProduct);
ProductRouter.delete("/:productId", productController.deleteProductById);
ProductRouter.put("/:productId", productController.updateProductById);
module.exports = ProductRouter;
