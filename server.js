require('dotenv').config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");


const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user.js");
const homeRoutes = require("./routes/home.js");
const loginRoutes = require("./routes/login.js");

const app = express();

mongoose.connect("mongodb://localhost:27017/Event-Management");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRoutes);
app.use("/login", loginRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is started on port 3000!!");
});