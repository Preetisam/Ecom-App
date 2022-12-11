// const db = require("./../model");
const ProductRouter = require("../routes/products.route");
const Cart = require("./../Model/Cart");

let createCart = async (req, res, next) => {
  let cart = req.body;
  try {
    // await Cart.create({ cost: 0 });
    await Cart.create(cart);
    res.status(200).json({
      message: "Cart Created",
    });
  } catch (err) {
    res.status(401).json({
      message: "Some internal error happened",
    });
  }
};
let updateCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  let cartToUpdate = await Cart.findByPK(cartId);
  if (cartToUpdate) {
    let productsToAdd = await ProductRouter.findAll({
      where: {
        id: req.body.productIds,
      },
    });
    if (productsToAdd) {
      await cartToUpdate.serProducts(productsToAdd);
      console.log("Products added");
      let totalcost = 0;
      let productsSelected = [];
      let products = await cartToUpdate.getProducts();
      for (i = 0; i < products.length; i++) {
        totalcost = totalcost + products[i].price;
        productsSelected.push({
          id: products[i].id,
          name: products[i].name,
          cost: products[i].price,
        });
      }
      res.status(200).json({
        id: cartToUpdate.id,
        productsSelected,
        totalcost,
      });
    }
  }
};
let getCart = async (req, res, next) => {
  let cart = await Cart.findByPK(req.params.cartId);
  let totalcost = 0;
  let productsSelected = [];
  let products = await cart.getProducts();
  for (i = 0; i < products.length; i++) {
    totalcost = cost + products[i].cost;
    productsSelected.push({
      id: products[i].id,
      name: products[i].name,
      cost: products[i].cost,
    });
  }
  res.status(200).json({
    id: cartId.id,
    productsSelected,
    totalcost,
  });
};
module.exports = {
  createCart,
  updateCart,
  getCart,
};
