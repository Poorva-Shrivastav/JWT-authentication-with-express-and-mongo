const validator = require("validator");

const validateUser = (email, password) => {
  if (!email || !password) throw Error("All fields must be filled");
  if (!validator.isEmail(email)) throw Error("Invalid email");
  if (!validator.isStrongPassword(password))
    throw Error("Password is not strong");
  // { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: }
};

module.exports = validateUser;
