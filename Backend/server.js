const express = require("express");
const app = express();
require("dotenv").config();
require("./db_config.js");

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// const Contract = new require("./Contract");
// const Provider = new require("./Provider");
// const contract = new Contract();
// const provider = new Provider();
// const web3 = provider.web3;
// const instance = contract.initContract();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/uploads', express.static(__dirname + '/uploads'))

const uploadRoute = require("./api/routes/upload");
const userRoute = require("./api/routes/user");
const activateRoute = require("./api/routes/activate");
const viewRoute = require("./api/routes/view");
const copRoute = require("./api/routes/cop.js");

app.use("/upload", uploadRoute);
app.use("/auth", userRoute);
app.use("/activate", activateRoute);
app.use("/view", viewRoute);
app.use("/cop", copRoute);

app.get("/test", (req, res, next) => {
  console.log("test route");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
