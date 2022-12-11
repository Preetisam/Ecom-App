const express = require("express");
let CategoryRouter = express.Router();
let categoryController = require("./../controller/catergory.controller");
const requestValidator = require("./../middlewares/RequestValidator");

CategoryRouter.get("/", categoryController.getAllCategories);

CategoryRouter.get(
  "/:categoryId",
  [requestValidator.validateReqForCategoryId],
  categoryController.getCategoryById
);
//addition of validtor in the middle
CategoryRouter.post(
  "/",
  [requestValidator.validateReqForCategoryName],
  categoryController.addNewCategory
);
CategoryRouter.delete(
  "/:categoryId",
  [requestValidator.validateReqForCategoryId],
  categoryController.deleteCategoryById
);
CategoryRouter.put(
  "/:categoryId",
  [
    requestValidator.validateReqForCategoryName,
    requestValidator.validateReqForCategoryId,
  ],
  categoryController.updateCategoryById
);

module.exports = CategoryRouter;
