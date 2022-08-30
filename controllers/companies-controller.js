const HttpError = require("../models/http-error");
let companiesData = require("../models/companiesDummy");
const dummyToken = require("../models/token");

const token = dummyToken;

////logic
function getResponse() {
  return companiesData;
}

////GET
const getCompanies = async (req, res, next) => {
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

// router.post("/", companiesController.postCompanies);

////POST
const postCompanies = async (req, res, next) => {
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

  companiesData.splice(0, 0, reqBody);

  res.status(200).json(req.body);
};

// ////PUT
// const putFields = async (req, res, next) => {
//   const reqBody = req.body;

//   if (!req.headers.authorization || req.headers.authorization !== token) {
//     return next(
//       new HttpError(
//         "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
//         401
//       )
//     );
//   }

//   const isReqDataCorrect = checkIsReqDataCorrect(reqBody);

//   if (!reqBody || !isReqDataCorrect)
//     return next(new HttpError("Złe dane. Spróbuj ponownie.", 403));

//   const index = fieldsData.findIndex(
//     (field) => field.fieldId === reqBody.fieldId
//   );
//   fieldsData.splice(index, 1, reqBody);

//   res.status(200).json(getResponse());
// };

// router.delete("/:companyId", companiesController.deleteCompany);

////DELETE
const deleteCompany = async (req, res, next) => {
  console.log("delete");
  const companyId = req.params.companyId;

  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  if (!companyId)
    return next(
      new HttpError("Nie mogę znaleźć id firmy do skasowania .", 401)
    );

  const index = companiesData.findIndex((company) => company.id === companyId);

  console.log({ companyId: companyId });
  console.log({ index });

  if (index === -1)
    return next(new HttpError("Nie mogę znaleźć takiej firmy.", 401));

  companiesData = companiesData.filter((company) => {
    return company.id !== companyId;
  });

  res.status(200).json(getResponse());
};

//utils
function checkIsReqDataCorrect(reqBody) {
  return reqBody && reqBody.id && reqBody.name;
}

exports.getCompanies = getCompanies;
exports.postCompanies = postCompanies;
// exports.putFields = putFields;
exports.deleteCompany = deleteCompany;
