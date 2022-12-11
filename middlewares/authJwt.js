const { JsonWebTokenError } = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).json({
      message: "Invalid token",
    });
    return;
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.userId = decoded.userId;
    next();
  });
};
module.exports = {
  verifyToken,
};
