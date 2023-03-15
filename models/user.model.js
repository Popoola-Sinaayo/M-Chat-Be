const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  number: Number,
  otp: Number,
  name: String,
  is_active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
