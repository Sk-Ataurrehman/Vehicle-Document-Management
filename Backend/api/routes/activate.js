const router = require("express").Router();
const Contract = require("../../Contract");
const Provider = require("../../Provider");
const contract = new Contract();
const provider = new Provider();
const web3 = provider.web3;
const instance = contract.initContract();

router.post("/", async (req, res, next) => {
  const account = req.body.account;
  const boolStatus = await instance.methods.setVerified().call();

  console.log(account);
  if (!boolStatus) {
    return res.status(200).json({
      message: "Please Upload all Documents",
    });
  } else {
    return res.status(200).json({
      message: "QR-Code activated",
      link: "http://localhost:3000/view/" + account,
    });
  }
});

module.exports = router;
