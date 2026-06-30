require('dotenv').config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const session = require("express-session");


const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const homeRoutes = require("./routes/home");
const loginRoutes = require("./routes/login");
const { setUserData } = require("./utils/auth.js");

const app = express();

mongoose.connect("mongodb://localhost:27017/Event-Management");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(setUserData);

app.use("/", homeRoutes);
app.use("/login", loginRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is started on port 3000!!");
});