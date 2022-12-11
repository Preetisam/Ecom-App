const db = require("./../Model/index");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("./../config/auth.config");

const User = db.user;
const Roles = db.roles;

let signup = async (req, res) => {
  let user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  if (req.body.roles) {
    let roles = await Roles.findAll({
      where: {
        name: {
          [Sequelize.Op.or]: req.body.roles,
        },
      },
    });
    await user.setRoles(roles);
    res.status(200).json({
      message: "User reqistration successfully ",
    });
  } else {
    await user.setRoles([1]);
    res.status(200).json({
      message: "Registered with  user roles",
    });
  }
};

let signin = async (req, res) => {
  // let password = req.body.password;
  let userName = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  //when user is not registired
  if (!userName) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }
  //check password valid or not
  let isValiadPassword = bcrypt.compareSync(
    req.body.password, //it will compare valid password
    userName.password
  );

  if (!isValiadPassword) {
    res.status(401).json({
      message: "password is incorrect",
    });
    return;
  }
  //generate token json wed token
  var token = jwt.sign({ id: userName.id }, authConfig.secret, {
    expiresIn: 86400,
  });
  let authorities = [];
  let roles = await userName.getRoles();
  for (let i = 0; i < roles.length; i++) {
    authorities.push("ROLE_ " + roles[i].name.toUpperCase());
  }
  res.status(200).send({
    id: userName.id,
    userName: userName.userName,
    email: userName.email,
    roles: authorities,
    accessToken: token,
  });
};
module.exports = {
  signin,
  signup,
};
