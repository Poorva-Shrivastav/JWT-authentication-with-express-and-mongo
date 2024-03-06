const express = require("express");
const router = express.Router();
// const validator = require("validator");
const { hashedPassword } = require("../utils/helpers");
const jwt = require("jsonwebtoken");
const userSchema = require("../mongoose/schemas/user");
const validateUser = require("../utils/validator");
const user = require("../mongoose/schemas/user");
const { generateToken } = require("../utils/jwt");
const jwt_maxAge = require("../utils/constants");

router.get("/", (req, res) => {
  return res.status(200).json({
    users: ["Manish", "Poorva", "Manya"],
  });
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  validateUser(email, password);

  const hashedPwd = await hashedPassword(password);
  const user = { email: email, password: hashedPwd };
  const newUser = new userSchema(user);
  try {
    const savedUser = await newUser.save();
    const token = generateToken(savedUser._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: jwt_maxAge * 1000,
    });
    res.status(201).json({ user: savedUser._id, created: true });
  } catch (err) {
    console.log(err);
    res.status(401).json({ created: false });
  }
});

module.exports = router;
