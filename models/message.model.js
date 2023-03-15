const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: mongoose.SchemaTypes.ObjectId,
  receiver: mongoose.SchemaTypes.ObjectId,
  message: String,
  users: [{ user: String }],
  date: String,
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Message", messageSchema);
