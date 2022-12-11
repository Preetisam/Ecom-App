let sequelizeInstance = require("./../config/db.config");
let sequelize = require("sequelize");

let Products = sequelizeInstance.define(
  "products",
  {
    id: {
      type: sequelize.DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      notNull: false,
    },
    name: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: sequelize.DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = Products;
