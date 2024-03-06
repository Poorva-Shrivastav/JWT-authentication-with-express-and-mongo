const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes/index");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());

const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ihycc6a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(routes);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  return res.sendStatus(200).json({ message: "Welcome to Swiggy backend" });
});

app.get("*", (req, res) => {
  let resObj = {
    statusCode: 404,
    statusMessage: "URL not found",
  };
  res.send(resObj);
});

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
