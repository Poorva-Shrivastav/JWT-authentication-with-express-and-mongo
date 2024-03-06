const jwt = require("jsonwebtoken");
const jwt_maxAge = require("./constants");

const options = { expiresIn: jwt_maxAge };

const generateToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRETKEY, options);
  return token;
};

module.exports = { generateToken };
