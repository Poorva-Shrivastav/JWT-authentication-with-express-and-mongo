const express = require("express");
const router = express.Router();
const auth = require("./auth");
const user = require("./register");
const checkUser = require("./checkUser");

router.use("/", checkUser);
router.use("/api/register", user);
router.use("/api/auth", auth);

module.exports = router;
