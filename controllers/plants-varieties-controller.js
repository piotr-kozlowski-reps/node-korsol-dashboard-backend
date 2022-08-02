const HttpError = require("../models/http-error");
let plantsVarietiesData = require("../models/plantsVarietiesDummy");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbGtzZGN1eTJ5N2NiYWNvYWRjYjg3YyIsImV4cGlyYXRpb25EYXRlIjoiMjA1MC0xMi0xMlQwMjowMDowMC4wMDBaIiwiaWF0IjoxNjU5MDgzMTM4fQ.xP9ofsTqha8bcO8v2xl1gk8DZEVe3OzxnmX_3poCjRU";

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

////POST
const postPlantVarieties = async (req, res, next) => {
  const reqBody = req.body;

  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  const isReqDataCorrect =
    reqBody && reqBody.plantId && reqBody.name && reqBody.varietyCode;

  if (!reqBody || !isReqDataCorrect)
    return next(new HttpError("Złe dane. Spróbuj ponownie.", 403));

  plantsVarietiesData.splice(0, 0, reqBody);

  res.status(200).json(req.body);
};

////PUT
const putPlantVarieties = async (req, res, next) => {
  const reqBody = req.body;

  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  const isReqDataCorrect =
    reqBody && reqBody.plantId && reqBody.name && reqBody.varietyCode;

  if (!reqBody || !isReqDataCorrect)
    return next(new HttpError("Złe dane. Spróbuj ponownie.", 403));

  const index = plantsVarietiesData.findIndex(
    (plant) => plant.plantId === reqBody.plantId
  );
  plantsVarietiesData.splice(index, 1, reqBody);

  res.status(200).json(getResponse());
};

////DELETE
const deletePlantVarieties = async (req, res, next) => {
  console.log("delete");
  const plantId = req.params.plantId;

  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  if (!plantId)
    return next(
      new HttpError("Nie mogę znaleźć id rośliny do skasowania .", 401)
    );

  const index = plantsVarietiesData.findIndex(
    (plant) => plant.plantId === plantId
  );

  console.log({ plantId });
  console.log({ index });

  if (index === -1)
    return next(new HttpError("Nie mogę znaleźć takiej rośliny.", 401));

  plantsVarietiesData = plantsVarietiesData.filter((plant) => {
    return plant.plantId !== plantId;
  });

  console.log({ plantsVarietiesData });

  res.status(200).json(getResponse());
};

exports.getPlantVarieties = getPlantVarieties;
exports.postPlantVarieties = postPlantVarieties;
exports.putPlantVarieties = putPlantVarieties;
exports.deletePlantVarieties = deletePlantVarieties;
