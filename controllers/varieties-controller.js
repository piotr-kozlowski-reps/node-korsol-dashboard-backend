const HttpError = require("../models/http-error");
let varietiesData = require("../models/varietiesDummy");
const dummyToken = require("../models/token");

const token = dummyToken;

////logic
function getResponse() {
  return varietiesData;
}

////GET
const getVarieties = async (req, res, next) => {
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
const postVariety = async (req, res, next) => {
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

  varietiesData.splice(0, 0, reqBody);

  res.status(200).json(req.body);
};

////PUT
const putVariety = async (req, res, next) => {
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

  const index = varietiesData.findIndex((variety) => variety.id === reqBody.id);

  if (index === -1)
    return next(
      new HttpError(
        "Złe dane. Nie ma takiej odmiany w bazie. Spróbuj ponownie.",
        403
      )
    );

  varietiesData.splice(index, 1, reqBody);

  res.status(200).json(getResponse());
};

////DELETE
const deleteVariety = async (req, res, next) => {
  const varietyId = req.params.id;

  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  if (!varietyId)
    return next(
      new HttpError("Nie mogę znaleźć id odmiany do skasowania .", 401)
    );

  const index = varietiesData.findIndex((variety) => variety.id === varietyId);

  console.log({ varietyId: varietyId });
  console.log({ index });

  if (index === -1)
    return next(new HttpError("Nie mogę znaleźć takiegj odmiany.", 401));

  varietiesData = varietiesData.filter((variety) => {
    return variety.id !== varietyId;
  });

  res.status(200).json(getResponse());
};

//utils
function checkIsReqDataCorrect(reqBody) {
  return reqBody && reqBody.id && reqBody.variety && reqBody.product;
}

exports.getVarieties = getVarieties;
exports.postVariety = postVariety;
exports.putVariety = putVariety;
exports.deleteVariety = deleteVariety;
