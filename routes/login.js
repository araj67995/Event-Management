require('dotenv').config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {capitalizeWords, formatMonthYear} = require("../utils/date");

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

router.get("/", (req, res) => {
  res.render("login", {
    loginError: "",
    signupError: "",
    activeTab: "login",
  });
});

// create user
router.post("/signup", async (req, res) => {
  try {
    const {name, email, phone, password } = req.body;

    const existingUser = await User.findOne({
      $or: [
        { email: email },
        { phone: phone }
      ]
    });

    if (existingUser) {
      let signupError = "";

      if (existingUser.email === email && existingUser.phone === phone) {
        signupError = "User already exist.";
      } else if (existingUser.email === email) {
        signupError = "Email already exists.";
      } else if (existingUser.phone === phone) {
        signupError = "Phone number already exists.";
      }

      return res.render("login", {
        loginError: "",
        signupError,
        activeTab: "signup",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

   
    const user = new User({
      name: capitalizeWords(name),
      email,
      phone, 
      password: hashedPassword,
      date: formatMonthYear(new Date()),
    });
    await user.save();

    return res.redirect("/login");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// login user
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: username }, { phone: username }],
    });

     if (!user) {
      res.render("login", {
         loginError: "User not found",
        signupError: "",
        activeTab: "login",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
          return res.render("login", {
            loginError: "Incorrect password.",
            signupError: "",
            activeTab: "login"
          });
        }

    // Set session data
    req.session.userId = user._id;

     let toRedirect = "";

    switch (user.role) {
      case "User":
        toRedirect = `/User`;
        break;

      case "admin":
        toRedirect = `/admin`;
        break;

      default:
        return res.render("login", {
          loginError: "Error! Please try again.",
        });
    }

    res.redirect(toRedirect);


  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
