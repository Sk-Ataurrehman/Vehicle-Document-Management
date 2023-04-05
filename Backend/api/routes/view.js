const router = require("express").Router();
const Contract = require("../../Contract");
const contract = new Contract();
const instance = contract.initContract();

router.post("/", async (req, res, next) => {
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

  return res.status(200).json({
    userDetails: userDetails,
    rcDetails: rcDetails,
    pucDetails: pucDetails,
    insuranceDetails: insuranceDetails,
  });
});

module.exports = router;
