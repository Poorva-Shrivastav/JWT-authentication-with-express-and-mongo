const bcrypt = require("bcrypt");

const saltRounds = 10;

const hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPwd = await bcrypt.hash(password, salt);

  return hashedPwd;
};

const comparePwd = async (password, hashedPwd) => {
  const result = await bcrypt.compare(password, hashedPwd);
  return result;
};

module.exports = { hashedPassword, comparePwd };
