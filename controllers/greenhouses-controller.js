const HttpError = require("../models/http-error");
let greenhousesData = require("../models/greenhousesDummy");
const dummyToken = require("../models/token");

const token = dummyToken;

////logic
function getResponse() {
  return greenhousesData;
}

////GET
const getGreenhouses = async (req, res, next) => {
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
};

////POST
const postGreenhouse = async (req, res, next) => {
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

  greenhousesData.splice(0, 0, reqBody);

  res.status(200).json(req.body);
};

////PUT
const putGreenhouse = async (req, res, next) => {
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

  const index = greenhousesData.findIndex(
    (greenhouse) => greenhouse.id === reqBody.id
  );

  if (index === -1)
    return next(
      new HttpError(
        "Złe dane. Nie ma takiej szklarni w bazie. Spróbuj ponownie.",
        403
      )
    );

  greenhousesData.splice(index, 1, reqBody);

  res.status(200).json(getResponse());
};

////DELETE
const deleteGreenhouse = async (req, res, next) => {
  const greenhouseId = req.params.greenhouseId;

  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  if (!greenhouseId)
    return next(
      new HttpError("Nie mogę znaleźć id szklarni do skasowania .", 401)
    );

  const index = greenhousesData.findIndex(
    (greenhouse) => greenhouse.id === greenhouseId
  );

  console.log({ greenhouseId: greenhouseId });
  console.log({ index });

  if (index === -1)
    return next(new HttpError("Nie mogę znaleźć takiej szklarni.", 401));

  greenhousesData = greenhousesData.filter((greenhouse) => {
    return greenhouse.id !== greenhouseId;
  });

  res.status(200).json(getResponse());
};

//utils
function checkIsReqDataCorrect(reqBody) {
  return reqBody && reqBody.id && reqBody.name;
}

exports.getGreenhouses = getGreenhouses;
exports.postGreenhouse = postGreenhouse;
exports.putGreenhouse = putGreenhouse;
exports.deleteGreenhouse = deleteGreenhouse;
