const jwt = require("jsonwebtoken");

const storeUser = (req, res, user) => {
  res.locals.user = user;
};

const getUser = (req, res) => {
  return res.locals.user;
};

const checkTokenMiddleware = (req, res, next) => {
  const header = req.get("Authorization") || "";
  const token = header.replace("Bearer ", "");
  // console.log("header,token",header,token)
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    storeUser(req, res, payload.user);
    next();
  } catch (error) {
    storeUser(req, res, null);
    next();
  }
};

module.exports = {
  checkTokenMiddleware,
  storeUser,
  getUser,
};
