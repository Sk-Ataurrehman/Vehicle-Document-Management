const mongoose = require("mongoose");

var CopSchema = new mongoose.Schema({
  email: String,
  fullName: String,
  password: String,
});

var Cop = mongoose.model("Cops", CopSchema);
module.exports = Cop;
