const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, "secret");
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
