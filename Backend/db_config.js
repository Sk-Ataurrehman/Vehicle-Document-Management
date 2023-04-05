const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(
  process.env.DB_PROD_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("Connected to Database");
  }
);
