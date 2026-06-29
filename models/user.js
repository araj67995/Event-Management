const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    passsword: String,
    role: {type: String, default: "User"}
});

module.exports = new mongoose.model("Users", userSchema);