const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Booking = require("../models/booking");
const {requireUser} = require("../utils/auth.js");

router.use(requireUser);

router.get("/", async(req, res) => {
    const user = await User.findById(req.session.userId);
    
    res.render("user", {
        user
    });
});

module.exports = router;