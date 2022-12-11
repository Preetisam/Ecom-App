const db = require("../Model/index");
const Roles = db.roles;
const User = db.user;

let checkDuplicateUserName = async (req, res, next) => {
  let user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (user) {
    //user is null and undefined
    res.status(400).json({
      message: "User already exist",
    });
    return;
  }
  next(); //controller method if user is null or undefined
};
let checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.length; i++) {
      if (!Roles.inculdes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist =" + req.body.username,
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUserName: checkDuplicateUserName,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
