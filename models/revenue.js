const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema ({
    month: String,
    due: Number,
    loss: Number,
    totalEvent: Number,
    pendingEvent: Number,
    completeEvent: Number,
    cancelledEvent: Number,
    totalRevenue: Number,
    collectedAmt: Number,
    vendor: Number,
    venue: Number,
    ticketCost: Number,
    Avg: Number
});

module.exports = new mongoose.model("Revenues", revenueSchema);