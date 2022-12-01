const express = require("express");
let router = express.Router();
const CategoryRoutes = require("./categories.route");
const ProductRoutes = require("./products.route");

router.use("/ecomm/api/v1/categories", CategoryRoutes);
router.use("/ecomm/api/v1/products", ProductRoutes);
module.exports = router;

//ecomm/api/v1/categories
//ecomm/api/v1/products
