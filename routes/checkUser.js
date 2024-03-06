const express = require("express");
const userSchema = require("../mongoose/schemas/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRETKEY, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = userSchema.findById(decodedToken.id);
        if (user) res.json({ status: true, user: user.email });
        else res.json({ status: false });
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
});

module.exports = router;
