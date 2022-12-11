let Products = require("./../Model/Product");
let sequelizeInstance = require("./../config/db.config");
const { Sequelize } = require("sequelize");

let createTable = async () => {
  await sequelizeInstance.sync({ froce: true });
  console.log("Table created Successfully");
};
let insertProducts = async (req, res, next) => {
  await Products.bulkCreate([
    {
      name: "Hrx",
      categoryId: 1,
      price: 18000,
    },
    {
      name: "Iphone 13",
      categoryId: 2,
      price: 60000,
    },
    {
      name: "Sony bravia",
      categoryId: 3,
      price: 40000,
    },
    {
      name: "Boat Rugged",
      categoryId: 4,
      price: 4000,
    },
    {
      name: "JBL Storm",
      categoryId: 1,
      price: 9000,
    },
    {
      name: "Vu 5",
      categoryId: 2,
      price: 32000,
    },
  ]);
  // res.status(201).json({
  //   message: "Products Added",
  // });
};
const getAllProducts = async (req, res) => {
  let categoryId = req.query.categoryId;
  let minPrice = req.query.minPrice;
  let maxPrice = req.query.maxPrice;
  let products = [];
  if (Object.keys(req.query).length == 0) {
    products = await Products.findAll(categoryId);
  } else {
    if (categoryId && !(minPrice || maxPrice)) {
      products = await filterByCategoryId(categoryId);
      // products = await Products.findAll({
      //   where: {
      //     categoryId: categoryId,
      //   },
      // });
    } else if (!categoryId && minPrice && maxPrice) {
      products = await filterByPriceRange(minPrice, maxPrice);

      // products = await Products.findAll({
      //   where: {
      //     price: {
      //       [Sequelize.Op.gte]: minPrice,
      //       [Sequelize.Op.lte]: maxPrice,
      //     },
      //   },
      // });
    } else {
      products = await Products.findAll({
        where: {
          categoryId: categoryId,
          price: {
            [Sequelize.Op.gte]: minPrice,
            [Sequelize.Op.lte]: maxPrice,
          },
        },
      });
    }
  }

  res.status(200).json({
    data: products,
  });
};

let filterByCategoryId = async (categoryId) => {
  let filteredProducts = await Products.findAll({
    where: {
      categoryId: categoryId,
    },
  });
  return filteredProducts;
};
let filterByPriceRange = async (minPrice, maxPrice) => {
  let filteredProducts = await Products.findAll({
    where: {
      price: {
        [Sequelize.Op.gte]: minPrice,
        [Sequelize.Op.lte]: maxPrice,
      },
    },
  });
  return filteredProducts;
};
// let getAllProducts = async (req, res, next) => {
//   let products = await Products.findAll();
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.write(JSON.stringify(products));
//   res.end();
// };
let getProductById = async (req, res, next) => {
  let id = req.params.productId;
  if (!id) {
    res.status(400).json({
      message: " Please enter valid id",
    });
  }
  let products = await Products.findAll({
    where: {
      id: id,
    },
  });
  res.send(200).json({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    message: "Success",
    data: products,
  });
};
let addNewProduct = async (req, res, next) => {
  const product = await Products.bulkCreate([req.body]);
  res.status(201).json({
    message: "Created",
    data: product,
  });
  // try {
  //   let ProductToAdd = req.body;
  //   await Products.create(ProductToAdd);
  //   res.status(201).send("new product added");
  //   res.end();
  // } catch (err) {
  //   next(err);
  // }
};
let deleteProductById = async (req, res, next) => {
  let id = req.params.categoryId;
  const product = await Products.findByPk(id);
  try {
    if (!product) {
      // 2nd way to get error
      throw new Error("Category not found");
    }

    await Products.destroy({
      where: {
        Id: id,
      },
    });
    res.status(200).send("Product deleted");
    res.end();
  } catch (err) {
    next(err);
  }
};
const updateProductById = async (req, res) => {
  const { name, price } = req.body;
  const id = req.params.productId;
  const product = await Products.update(
    { name, price },
    {
      where: {
        id: id,
      },
    }
  );

  let updatedProduct = await Products.findByPk(id);
  res.status(201).json({
    message: "Updated",
    data: updatedProduct,
  });
};

// let updateProductById = async (req, res, next) => {
//   let id = req.params.productId;
//   let productToUpdate = {
//     name: req.body.name,
//     price: req.body.price,
//   };
//   await Products.update(productToUpdate, {
//     where: {
//       id: id,
//     },
//   });
//   let updateProduct = await Products.findByPk(id);
//   res.status(200).send(updateProduct);
//   res.end();
// };

//createTable();
//insertProducts();
module.exports = {
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  addNewProduct,
};
