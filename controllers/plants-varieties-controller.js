const HttpError = require("../models/http-error");
const plantsVarietiesData = require("../models/plantsVarietiesDummy");

////logic
function getResponse() {
  return {
    result: plantsVarietiesData,
    count: plantsVarietiesData.length,
  };
}

////GET
const getPlantVarieties = async (req, res, next) => {
  //tymczas sprawdzanie tokena
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbGtzZGN1eTJ5N2NiYWNvYWRjYjg3YyIsImV4cGlyYXRpb25EYXRlIjoiMjA1MC0xMi0xMlQwMjowMDowMC4wMDBaIiwiaWF0IjoxNjU5MDgzMTM4fQ.xP9ofsTqha8bcO8v2xl1gk8DZEVe3OzxnmX_3poCjRU";
  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  res.status(200).json(getResponse());

  // setTimeout(function () {
  //   res.status(200).json(config);
  // }, 4000);
};

exports.getPlantVarieties = getPlantVarieties;
