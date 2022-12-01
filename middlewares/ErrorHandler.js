let path = require("path");
const ErrorHandler = (err, req, res, next) => {
  console.log("MiddleWare Error Handling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  //   res.status(errStatus).json({
  //     success: false,
  //     status: errStatus,
  //     message: errMsg,
  //   });
  res.sendFile(path.join(__dirname + "./../views/error.html"));
};
module.exports = ErrorHandler;
