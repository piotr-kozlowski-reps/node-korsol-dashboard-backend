const HttpError = require("../models/http-error");
let plantersData = require("../models/plantersDummy");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbGtzZGN1eTJ5N2NiYWNvYWRjYjg3YyIsImV4cGlyYXRpb25EYXRlIjoiMjA1MC0xMi0xMlQwMjowMDowMC4wMDBaIiwiaWF0IjoxNjU5MDgzMTM4fQ.xP9ofsTqha8bcO8v2xl1gk8DZEVe3OzxnmX_3poCjRU";

////logic
function getResponse() {
  return {
    result: plantersData,
    count: plantersData.length,
  };
}

////GET
const getPlanters = async (req, res, next) => {
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
const postPlanter = async (req, res, next) => {
  const reqBody = req.body;

  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  const isReqDataCorrect = checkIsReqDataCorrect(reqBody);

  if (!reqBody || !isReqDataCorrect)
    return next(new HttpError("Złe dane. Spróbuj ponownie.", 403));

  plantersData.splice(0, 0, reqBody);

  res.status(200).json(req.body);
};

////PUT
const putPlanter = async (req, res, next) => {
  const reqBody = req.body;

  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  const isReqDataCorrect = checkIsReqDataCorrect(reqBody);

  if (!reqBody || !isReqDataCorrect)
    return next(new HttpError("Złe dane. Spróbuj ponownie.", 403));

  const index = plantersData.findIndex(
    (planter) => planter.planterId === reqBody.planterId
  );
  plantersData.splice(index, 1, reqBody);

  res.status(200).json(getResponse());
};

////DELETE
const deletePlanter = async (req, res, next) => {
  const planterId = req.params.planterId;

  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  if (!planterId)
    return next(
      new HttpError("Nie mogę znaleźć id sadzarki do skasowania .", 401)
    );

  const index = plantersData.findIndex(
    (planter) => planter.planterId === planterId
  );

  console.log({ planterId: planterId });
  console.log({ index });

  if (index === -1)
    return next(new HttpError("Nie mogę znaleźć takiej sadzarki.", 401));

  plantersData = plantersData.filter((planter) => {
    return planter.planterId !== planterId;
  });

  res.status(200).json(getResponse());
};

//utils
function checkIsReqDataCorrect(reqBody) {
  return reqBody && reqBody.name && reqBody.planterId;
}

exports.getOwners = getPlanters;
exports.postOwners = postPlanter;
exports.putOwners = putPlanter;
exports.deleteOwners = deletePlanter;
