const express = require("express");
const router = express.Router(); // ← invoke the Router function

router.get("/", (req, res) => {
    res.render("admin");
});

module.exports = router;