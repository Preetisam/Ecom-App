const Categories = require("./../Model/Category");
const Products = require("./../Model/Product");

const validateReqForCategoryName = async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Category name is incorrect",
    });
  }
  next();
};
const validateReqForCategoryId = async (req, res, next) => {
  let categoryId = req.params.categoryId;
  if (categoryId) {
    let category = await Categories.findByPk(categoryId);
    if (!category) {
      res.status(400).send({
        message: "Catgeroy does not exits",
      });
    }
  } else {
    res.status(400).send({
      message: "Category doesnot match",
    });
  }
};
const validateReqForProductName = async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Product name is incorrect",
    });
  }
  next();
};
const validateReqForProductId = async (req, res, next) => {
  let productId = req.params.productId;
  if (categoryId) {
    let product = await Categories.findByPk(productId);
    if (!product) {
      res.status(400).send({
        message: "Prdouct does not exits",
      });
    }
  } else {
    res.status(400).send({
      message: "Product doesnot match",
    });
  }
};
module.exports = {
  validateReqForCategoryName,
  validateReqForCategoryId,
  validateReqForProductName,
  validateReqForProductId,
};
