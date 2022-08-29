const HttpError = require("../models/http-error");
let ownersData = require("../models/ownersDummy");
const dummyToken = require("../models/token");

const token = dummyToken;

////logic
function getResponse() {
  return {
    result: ownersData,
    count: ownersData.length,
  };
}

////GET
const getOwners = async (req, res, next) => {
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
const postOwners = async (req, res, next) => {
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

  ownersData.splice(0, 0, reqBody);

  res.status(200).json(req.body);
};

////PUT
const putOwners = async (req, res, next) => {
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

  const index = ownersData.findIndex(
    (owner) => owner.ownerId === reqBody.ownerId
  );
  ownersData.splice(index, 1, reqBody);

  res.status(200).json(getResponse());
};

////DELETE
const deleteOwners = async (req, res, next) => {
  const ownerId = req.params.ownerId;

  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  if (!ownerId)
    return next(
      new HttpError("Nie mogę znaleźć id rośliny do skasowania .", 401)
    );

  const index = ownersData.findIndex((owner) => owner.ownerId === ownerId);

  console.log({ ownerId: ownerId });
  console.log({ index });

  if (index === -1)
    return next(new HttpError("Nie mogę znaleźć takiej rośliny.", 401));

  ownersData = ownersData.filter((owner) => {
    return owner.ownerId !== ownerId;
  });

  res.status(200).json(getResponse());
};

//utils
function checkIsReqDataCorrect(reqBody) {
  return reqBody && reqBody.name && reqBody.ownerId;
}

exports.getOwners = getOwners;
exports.postOwners = postOwners;
exports.putOwners = putOwners;
exports.deleteOwners = deleteOwners;
