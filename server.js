require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin")

const app = express();

mongoose.connect("mongodb://localhost:27017/Event-Management");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/admin", adminRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is started on port 3000!!");
});