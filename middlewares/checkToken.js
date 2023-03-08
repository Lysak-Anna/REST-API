const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../helpers/errorHandler");

const checkToken = (req, res, next) => {
  try {
    // const { authorization } = req.header;
    // if (!authorization) {
    //   next(new UnauthorizedError("Invalid token"));
    // }
    const [, token] = req.headers.authorization.split(" ");
    if (!token) {
      next(new UnauthorizedError("Not authorized"));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    if (!req.user) {
      next(new UnauthorizedError("Not authorized"));
    }
    next();
  } catch (err) {
    next(new UnauthorizedError("Not authorized"));
  }
};

module.exports = {
  checkToken,
};
