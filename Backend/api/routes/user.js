const User = require("../models/User");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { fullName, email, aadharno, phoneno, password } = req.body;
  const user = new User({
    email: email,
    fullName: fullName,
    aadharno: aadharno,
    phoneno: phoneno,
    password: password,
  });

  try {
    var existuser = await User.findOne({ email: email }).exec();

    if (existuser) {
      return res.status(500).json({
        msg: "Account already exists",
      });
    }

    await user.save();
    return res.status(200).json({
      msg: "User Registered Successfully",
      data: "",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error while registering user",
      data: "",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email: email });
  if (!userExist) {
    return res.status(400).json({
      msg: "Wrong username or password",
      data: "",
    });
  } else {
    if (userExist.password === password) {
      return res.status(200).json({
        msg: "Login Successful",
        data: userExist,
      });
    } else {
      return res.status(400).json({
        msg: "Wrong password",
        data: "",
      });
    }
  }
});

router.post("/update-user", async (req, res) => {
  const { email, fullName, phoneno } = req.body;
  await User.findOneAndUpdate(
    { email: email },
    { fullName: fullName, phoneno: phoneno }
  );
});

module.exports = router;
