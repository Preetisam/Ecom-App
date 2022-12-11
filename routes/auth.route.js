const controller = require("./../controller/auth.controller");
const express = require("express");
const verifySignUp = require("./../middlewares/VerifySignUp");
const expressApp = express();
const router = express.Router();

expressApp.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-acess-token,Orgin,Content-Type,Accept"
  );
  next();
});
router.post(
  "/signUp",
  [verifySignUp.checkDuplicateUserName, verifySignUp.checkRolesExisted],
  controller.signup
);
router.post("/signIn", controller.signin);
module.exports = router;

//localhost:8080/ecomm/api/v1/auth/signUp
