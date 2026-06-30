const express = require("express");
const router = express.Router(); // ← invoke the Router function
const { requireAdmin } = require("../utils/auth.js");

router.use(requireAdmin);

router.get("/", (req, res) => {
    res.render("admin");
});

module.exports = router;