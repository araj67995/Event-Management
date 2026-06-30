const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Booking = require("../models/booking");
const { requireUser } = require("../utils/auth");
const { formatDateToDDMMYYYY } = require("../utils/date");

router.use(requireUser);

router.get("/", async (req, res) => {
  const user = await User.findById(req.session.userId);

  res.render("user", {
    user,
  });
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, EventName, type, location, date, details } =
      req.body;

    const booking = new Booking({
      name,
      phone,
      email,
      EventName,
      EventType: type,
      location,
      date: formatDateToDDMMYYYY(date),
      details,
    });

    await booking.save();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
