const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
const cors = require("cors");
require("dotenv").config();

const loginRoutes = require("./routes/login-routes");
const configRoutes = require("./routes/config-routes");
const dashboardRoutes = require("./routes/dashboard-routes");
// const plantsVarietiesRoutes = require("./routes/plants-varieties-routes");
// const fieldsRoutes = require("./routes/fields-routes");
// const ownersRoutes = require("./routes/owners-routes");
// const plantersRoutes = require("./routes/planters-routes");
const companiesRoutes = require("./routes/companies-routes");
const greenhousesRoutes = require("./routes/greenhouses-routes");
const productsRoutes = require("./routes/products-routes");

////
const app = express();

app.use(cors());
app.use(bodyParser.json());

////
//routes
app.use("/api/login", loginRoutes);
app.use("/api/config/", configRoutes);
app.use("/api/dashboard/", dashboardRoutes);
// app.use("/api/plant-varieties/", plantsVarietiesRoutes);
// app.use("/api/fields/", fieldsRoutes);
// app.use("/api/owners/", ownersRoutes);
// app.use("/api/planters/", plantersRoutes);
app.use("/api/companies/", companiesRoutes);
app.use("/api/greenhouses/", greenhousesRoutes);
app.use("/api/products/", productsRoutes);

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
