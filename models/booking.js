const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
   name: String,
   contact: Number,
   email: String,
   EventName: String,
   EventType: String,
   locstion: String,
   date: String,
   visibility: String,
   ticket: {type: Number, default: 0},
   ticketPrice: {type: Number, default: 0},
   cost: Number,
   Details: String,
   due: Number,
   loss: Number,
   collectedAmt: Number,
   vendorAmt: Number,
   ticketSale: Number,
   venueAmt: Number,
   display: {type: String, default: "No"},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookings", bookingSchema);