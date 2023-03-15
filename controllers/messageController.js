const Message = require("../models/message.model");
require("dotenv").config();

const createMesage = async (req, res, next) => {
  const { sender, receiver, message } = req.body;
  console.log(sender, receiver, message);
  if (!sender || !receiver || !message) next("Please supply all parameters");
  try {
    const newMessage = await Message.create({
      sender: sender,
      receiver: receiver,
      message: message,
      users: [{ user: sender }, { user: receiver }],
      date: new Date(),
    });
    return res.status(200).json({ message: "success", data: newMessage });
  } catch (error) {
    console.log(error);
    next("Error in creating user");
  }
};

const fetchMessage = async (req, res, next) => {
  const id = req.id;
  console.log(typeof id);
  try {
    const messages = await Message.find()
      .where("users")
      .elemMatch({
        user: { $eq: id },
      });
    return res.status(200).json({ message: "success", data: messages });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedMessage = await Message.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        message: "",
      },
      { new: true }
    );
    return res.status(200).json({ message: "success", data: deletedMessage });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { createMesage, fetchMessage, deleteMessage };
