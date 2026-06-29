const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    role: {type: String, default: "User"}
});

module.exports = new mongoose.model("Users", userSchema);