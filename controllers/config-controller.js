const HttpError = require("../models/http-error");
const config = require("../models/configDummy");
const dummyToken = require("../models/token");

const token = dummyToken;

const fetchConfig = async (req, res, next) => {
  //tymczas sprawdzanie tokena
  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  res.status(200).json(config);

  // setTimeout(function () {
  //   res.status(200).json(config);
  // }, 4000);
};

exports.fetchConfig = fetchConfig;
