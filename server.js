const express = require("express");
let bodyParser = require("body-parser");
const serverConfig = require("./config/server.config");
const router = require("./routes/index");
const ErrorHandler = require("./middlewares/ErrorHandler");
const dbConnection = require("./config/db.config");
const Caterogy = require("./Model/Category");
const Products = require("./Model/Product");
const Category = require("./Model/Category");
const Roles = require("./Model/Roles");

Category.hasMany(Products);

const expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(router);
expressApp.use(ErrorHandler);

let init = async () => {
  await dbConnection.sync({ force: true });
  insertCategories();
  insertRoles();
};
let insertCategories = async () => {
  await Caterogy.bulkCreate([
    {
      name: "Fashion",
    },
    {
      name: "Mobile",
    },
    {
      name: "Electronics",
    },
    {
      name: "Appiliances",
    },
  ]);
};

let insertRoles = async () => {
  Roles.bulkCreate([
    {
      id: 1,
      name: "user",
    },
    {
      id: 2,
      name: "admin",
    },
  ]);
};
expressApp.listen(serverConfig.PORT, () => {
  console.log("server is running on port" + serverConfig.PORT);
  //init();
});
