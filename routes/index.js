const express = require("express");
const app = express();
let router = express.Router();

const CategoryRoutes = require("./categories.route");
const ProductRoutes = require("./products.route");
const authRoute = require("./auth.route");
const cartRouter = require("./cart.route");
//home page

router.get("/ecomm/api/v1", (req, res, next) => {
  res.send("this is home page").status(200);
  res.end();
});

router.use("/ecomm/api/v1/categories", CategoryRoutes);
router.use("/ecomm/api/v1/products", ProductRoutes);
router.use("/ecomm/api/v1/auth", authRoute);
router.use("/ecomm/api/v1/cart", cartRouter);
module.exports = router;

//ecomm/api/v1/categories
//ecomm/api/v1/products
