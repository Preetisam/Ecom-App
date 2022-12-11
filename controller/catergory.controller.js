let Categories = require("./../Model/Category");
let sequelizeInstance = require("./../config/db.config");

// let createTable = async () => {
//   await sequelizeInstance.sync({ froce: true });
//   console.log("Table created Successfully");
//   insertCategories();
// };
// let insertCategories = async () => {
//   await Categories.bulkCreate([
//     {
//       name: "Fashion",
//     },
//     {
//       name: "Mobile",
//     },
//     {
//       name: "Electronics",
//     },
//     {
//       name: "Appiliances",
//     },
//   ]);
// };

let getAllCategories = async (req, res, next) => {
  let categories = await Categories.findAll();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(categories));
  res.end();
};
const getCategoryById = async (req, res) => {
  const id = req.params.categoryId;
  if (!id) {
    res.status(400).json({
      message: "Please enter valid id",
    });
  }
  const category = await Categories.findAll({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    message: "Success",
    data: category,
  });
};

let addNewCategory = async (req, res, next) => {
  try {
    // let arr;
    // arr[undefined] = 5;
    // let c = 5 / 0;
    // if (c == Infinity) {
    //   throw new Error("Dont want Infinity");
    // }
    let categoryToAdd = req.body;
    await Categories.create(categoryToAdd);
    res.status(201).send("new category added");
    res.end();
  } catch (err) {
    next(err);
  }
};
let deleteCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;
  const category = await Categories.findByPk(id);
  try {
    if (!category) {
      // 2nd way to get error
      throw new Error("Category not found");
    }

    await Categories.destroy({
      where: {
        Id: id,
      },
    });
    res.status(200).send("Category deleted");
    res.end();
  } catch (err) {
    next(err);
  }
};
let updateCategoryById = async (req, res, next) => {
  if (!req.body.name) {
    res.status(500).send("Please pass category name");
    res.end();
  }
  let id = req.params.categoryId;
  let categoryToUpdate = {
    name: req.body.name,
    price: req.body.price,
  };
  await Categories.update(categoryToUpdate, {
    where: {
      Id: id,
    },
  });
  let updateCategory = await Categories.findByPk(id);
  res.status(200).send(updateCategory);
};

//createTable();

let all = {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  deleteCategoryById,
  updateCategoryById,
};
module.exports = all;
