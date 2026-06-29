const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/", (req, res) => {
  res.render("login", {
    signupError: "",
    activeTab: "login",
  });
});

// create user
router.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render("login", {
        signupError: "",
        activeTab: "signup",
      });
    }

    const user = new User(req.body); // Use the correct model name
    await user.save();

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// login user
router.post("/", async(req, res) => {

});

module.exports = router;
