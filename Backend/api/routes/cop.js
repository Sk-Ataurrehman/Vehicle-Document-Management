const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Cop = require("../models/Cop");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const copExist = await Cop.findOne({ email: email });
  if (!copExist) {
    return res.status(400).json({
      msg: "Authentication Failed",
      data: "",
    });
  } else {
    if (copExist.password === password) {
      // Token generation
      var token = jwt.sign(
        { copId: copExist._id, email: copExist.email },
        "secret",
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        msg: "Login Successful",
        data: copExist,
        token: token,
      });
    } else {
      return res.status(400).json({
        msg: "Authentication Failed",
        data: "",
      });
    }
  }
});

router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;
  const cop = new Cop({
    email: email,
    fullName: fullName,
    password: password,
  });

  try {
    var existcops = await Cop.findOne({ email: email }).exec();
    if (existcops) {
      return res.status(500).json({
        msg: "Account already exists",
      });
    }

    await cop.save();
    return res.status(200).json({
      msg: "Cop Registered Successfully",
      data: cop,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error while registering cop",
    });
  }
});

module.exports = router;
