const router = require("express").Router();
const Contract = require("../../Contract");
const contract = new Contract();
const instance = contract.initContract();

const verifyCop = require("../middlewares/verifyCop");

var User = require("../models/User");

router.post("/", verifyCop, async (req, res, next) => {
  console.log(req.body.account);
  const id = await instance.methods.getId().call();
  const userDetails = await instance.methods.get_user_details(id).call();
  console.log(userDetails);
  const rcDetails = await instance.methods.get_rc_details(id).call();
  console.log(rcDetails);
  const pucDetails = await instance.methods.get_puc_details(id).call();
  console.log(pucDetails);
  const insuranceDetails = await instance.methods
    .get_insurance_details(id)
    .call();
  console.log(insuranceDetails);
  var account = req.body.account;
  var user = await User.find({ account: account }).exec();

  return res.status(200).json({
    userDetails: user[0],
    rcDetails: rcDetails,
    pucDetails: pucDetails,
    insuranceDetails: insuranceDetails,
  });
});

module.exports = router;
