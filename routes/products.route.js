let express = require("express");
let ProductRouter = express.Router();
let productController = require("./../controller/product.controller");
let requestValidator = require("./../middlewares/RequestValidator");
const authJwt = require("./../middlewares/authJwt");

ProductRouter.get("/", [authJwt.verifyToken], productController.getAllProducts);

ProductRouter.get(
  "/:productId",
  [requestValidator.validateReqForCategoryId],
  productController.getProductById
);
ProductRouter.post(
  "/",
  [requestValidator.validateReqForCategoryName],
  productController.addNewProduct
);
ProductRouter.delete(
  "/:productId",
  [requestValidator.validateReqForCategoryId],
  productController.deleteProductById
);
ProductRouter.put(
  "/:productId",
  [
    requestValidator.validateReqForCategoryId,
    requestValidator.validateReqForCategoryName,
  ],
  productController.updateProductById
);

module.exports = ProductRouter;
