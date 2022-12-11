let db = {};

db.roles = require("./Roles");
db.user = require("./User");
db.product = require("./Product");
db.cart = require("./Cart");

db.roles.belongsToMany(db.user, {
  //establish relation b/w user and roles userid id
  through: "user_roles", //innerjoin
  forigenKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.roles, {
  through: "user_roles",
  froigenKey: "userId",
  otherKey: "roleId",
});
db.product.belongsToMany(db.cart, {
  through: "cart_products",
  forigenKey: "productId",
  otherKey: "cartId",
});
db.cart.belongsToMany(db.product, {
  through: "cart_products",
  forigenKey: "cartId",
  otherKey: "productId",
});
db.Roles = ["user", "admin"];

module.exports = db;
