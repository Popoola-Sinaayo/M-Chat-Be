const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "success", data: users });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const createUser = async (req, res, next) => {
  const { number, name } = req.body;
  let otp = Math.floor(Math.random() * 1000000);
  console.log(otp);
  try {
    const person = await User.create({ name: name, number: number, otp: otp });
    return res.json({ message: "success", data: person });
  } catch (error) {
    console.log(error);
    next("An error occured while creating user");
  }
};

const verifyUser = async (req, res, next) => {
  const { id, otp } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) res.json({ message: "User with id does not exist" });
    console.log(user.otp, otp);
    if (user.otp !== otp) {
      next("Invalid Otp");
    } else {
      console.log(process.env.JWT_TOKEN_SECRET);
      const token = jwt.sign({ data: id }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: "100h",
      });
      user.is_active = true;
      user.otp = null;
      user.save();
      return res
        .status(200)
        .json({ message: "User verification complete", token: token });
    }
  } catch (error) {
    console.log(error);
    next("An error occured while validatin user");
  }
};

const loginUser = async (req, res, next) => {
  const { number } = req.body;
  try {
    const user = await User.findOne({ number: number });
    if (!user) next("user not found");
    let otp = Math.floor(Math.random() * 1000000);
    console.log(otp);
    user.otp = otp;
    user.save();
    return res.status(200).json({ message: "success", data: user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getVerifiedUser = async (req, res, next) => {
  const id = req.id;
  console.log(id);
  try {
    const user = await User.findById(id);
    if (user) {
      return res.status(200).json({ message: "User found", data: user });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { createUser, verifyUser, getVerifiedUser, loginUser, fetchAllUsers };
