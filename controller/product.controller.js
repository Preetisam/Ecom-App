let Products = require("./../Model/Product");
let sequelizeInstance = require("./../config/db.config");

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
      categoryId: 5,
      price: 9000,
    },
    {
      name: "Vu 5",
      categoryId: 6,
      price: 32000,
    },
  ]);
  // res.status(201).json({
  //   message: "Products Added",
  // });
};

let getAllProducts = async (req, res, next) => {
  let products = await Products.findAll();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(products));
  res.end();
};
let getProductById = async (req, res, next) => {
  let productId = req.params.productId;
  let products = await Products.findByPk(productId);
  res.send(200).json(products);
  res.end();
};
let addNewProduct = async (req, res, next) => {
  try {
    let ProductToAdd = req.body;
    await Products.create(ProductToAdd);
    res.status(201).send("new product added");
    res.end();
  } catch (err) {
    next(err);
  }
};
let deleteProductById = async (req, res, next) => {
  let id = req.params.productId;
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
let updateProductById = async (req, res, next) => {
  let id = req.params.productId;
  let productToUpdate = {
    name: req.body.name,
    price: req.body.price,
  };
  await Products.update(productToUpdate, {
    where: {
      id: id,
    },
  });
  let updateProduct = await Products.findByPk(id);
  res.status(200).send(updateProduct);
  res.end();
};
//createTable();
//insertProducts();
module.exports = {
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  addNewProduct,
};
