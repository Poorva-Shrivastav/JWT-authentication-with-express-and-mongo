const express = require("express");
const validateUser = require("../utils/validator");
const { comparePwd } = require("../utils/helpers");
const user = require("../mongoose/schemas/user");
const { generateToken } = require("../utils/jwt");
const jwt_maxAge = require("../utils/constants");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  validateUser(email, password); //validates the input credentials

  try {
    const findUser = await user.findOne({ email });
    if (!findUser) throw Error("Invalid Email"); //if email is present in db

    const match = comparePwd(password, findUser.password);
    if (!match) throw Error("Incorrect Password"); //if passwords match

    const token = generateToken(findUser._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: jwt_maxAge * 1000 });

    res.status(200).json({ user: findUser._id, status: true });
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: err, status: false });
  }
});

module.exports = router;
