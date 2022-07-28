const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const cors = require("cors");
require("dotenv").config();

const loginRoutes = require("./routes/login-routes");

////
const app = express();

app.use(cors());
app.use(bodyParser.json());

////
//routes
app.use("/api/login", loginRoutes);

//errors
app.use((req, res, next) => {
  return next(new HttpError("Could not find this route.", 404));
});
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred." });
});

////
//listener
app.listen(process.env.PORT || 5000);
