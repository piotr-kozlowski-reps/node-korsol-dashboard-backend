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

// ////POST
// const postFields = async (req, res, next) => {
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

//   fieldsData.splice(0, 0, reqBody);

//   res.status(200).json(req.body);
// };

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

// ////DELETE
// const deleteFields = async (req, res, next) => {
//   console.log("delete");
//   const fieldId = req.params.fieldId;

//   if (!req.headers.authorization || req.headers.authorization !== token) {
//     return next(
//       new HttpError(
//         "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
//         401
//       )
//     );
//   }

//   if (!fieldId)
//     return next(
//       new HttpError("Nie mogę znaleźć id rośliny do skasowania .", 401)
//     );

//   const index = fieldsData.findIndex((field) => field.fieldId === fieldId);

//   console.log({ fieldId });
//   console.log({ index });

//   if (index === -1)
//     return next(new HttpError("Nie mogę znaleźć takiej rośliny.", 401));

//   fieldsData = fieldsData.filter((field) => {
//     return field.fieldId !== fieldId;
//   });

//   res.status(200).json(getResponse());
// };

// //utils
// function checkIsReqDataCorrect(reqBody) {
//   return (
//     reqBody &&
//     reqBody.fieldId &&
//     reqBody.name &&
//     reqBody.fieldNumber &&
//     reqBody.area &&
//     reqBody.details &&
//     reqBody.planter &&
//     reqBody.owner
//   );
// }

exports.getCompanies = getCompanies;
// exports.postFields = postFields;
// exports.putFields = putFields;
// exports.deleteFields = deleteFields;
