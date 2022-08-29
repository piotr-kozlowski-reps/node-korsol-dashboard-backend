const HttpError = require("../models/http-error");
const dashboard = require("../models/dashboardDummy");
const dummyToken = require("../models/token");

const fetchDashboard = async (req, res, next) => {
  //tymczas sprawdzanie tokena

  const token = dummyToken;
  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  res.status(200).json(dashboard);

  // setTimeout(function () {
  //   res.status(200).json(dashboard);
  // }, 4000);
};

exports.fetchDashboard = fetchDashboard;
