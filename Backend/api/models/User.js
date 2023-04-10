const mongoose = require("mongoose");

var pucSchema = new mongoose.Schema({
  uploadImage: String,
  validity: String,
  regNo: String,
  certificate: String,
  regDate: String,
});

var rcSchema = new mongoose.Schema({
  uploadImage: String,
  validity: String,
  regNo: String,
  chNo: String,
  engNo: String,
  manufacturer: String,
  owner: String,
  type: String,
});

var insuranceSchema = new mongoose.Schema({
  uploadImage: String,
  validity: String,
  policy: String,
  owner: String,
  engNo: String,
  regNo: String,
  chNo: String,
  model: String,
});

var UserSchema = new mongoose.Schema(
  {
    account: String,
    email: {
      type: String,
    },
    fullName: {
      type: String,
    },
    aadharno: {
      type: String,
    },
    phoneno: {
      type: String,
    },
    password: {
      type: String,
    },
    rc: [rcSchema],
    pucc: [pucSchema],

    insurance: [insuranceSchema],
  },
  { timestamps: true }
);

var User = mongoose.model("User", UserSchema);
module.exports = User;
