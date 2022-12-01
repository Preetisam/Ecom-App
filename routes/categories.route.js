const express = require("express");
let CategoryRouter = express.Router();
let categoryController = require("./../controller/catergory.controller");

CategoryRouter.get("/", categoryController.getAllCategories);
CategoryRouter.get("/:categoryId", categoryController.getCategoryById);
CategoryRouter.post("/", categoryController.addNewCategory);
CategoryRouter.delete("/:categoryId", categoryController.deleteCategoryById);
CategoryRouter.put("/:categoryId", categoryController.updateCategoryById);
module.exports = CategoryRouter;
