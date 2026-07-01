const express = require("express");
const router = express.Router(); // ← invoke the Router function
const { requireAdmin } = require("../utils/auth.js");
const User = require("../models/user");
const Booking = require("../models/booking");
const { formatDateToDDMMYYYY } = require("../utils/date");

router.use(requireAdmin);

router.get("/", (req, res) => {
    res.render("admin");
});

module.exports = router;