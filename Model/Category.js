let sequelizeInstance = require("./../config/db.config");
let sequelize = require("sequelize");

let Category = sequelizeInstance.define(
  "categories",
  {
    id: {
      type: sequelize.DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      type: sequelize.DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = Category;
