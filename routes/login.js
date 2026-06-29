const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

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
    const { email, phone } = req.body;

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

    const user = new User(req.body);
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

    if(user.password === password) {
        if(user.role === "User"){
            res.redirect("/user");
        } else if(user.role === "Admin") {
            res.redirect("/admin");
        }
    } else {
        res.render("login", {
            loginError: "Invalid Password",
            signupError: "",
            activeTab: "login"
        })
    }

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
