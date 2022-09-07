const HttpError = require("../models/http-error");
let productsData = require("../models/productsDummy");
const dummyToken = require("../models/token");

const token = dummyToken;

////logic
function getResponse() {
  return productsData;
}

////GET
const getProducts = async (req, res, next) => {
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
const postProduct = async (req, res, next) => {
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

  productsData.splice(0, 0, reqBody);

  res.status(200).json(req.body);
};

////PUT
const putProduct = async (req, res, next) => {
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

  const index = productsData.findIndex((product) => product.id === reqBody.id);

  if (index === -1)
    return next(
      new HttpError(
        "Złe dane. Nie ma takiego produktu w bazie. Spróbuj ponownie.",
        403
      )
    );

  productsData.splice(index, 1, reqBody);

  res.status(200).json(getResponse());
};

////DELETE
const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;

  if (!req.headers.authorization || req.headers.authorization !== token) {
    return next(
      new HttpError(
        "Niestety, nie jesteś zalogowany lub Twój token wygasł.",
        401
      )
    );
  }

  if (!productId)
    return next(
      new HttpError("Nie mogę znaleźć id produktu do skasowania .", 401)
    );

  const index = productsData.findIndex((product) => product.id === productId);

  console.log({ productId: productId });
  console.log({ index });

  if (index === -1)
    return next(new HttpError("Nie mogę znaleźć takiego produktu.", 401));

  productsData = productsData.filter((product) => {
    return product.id !== productId;
  });

  res.status(200).json(getResponse());
};

//utils
function checkIsReqDataCorrect(reqBody) {
  return reqBody && reqBody.id && reqBody.name;
}

exports.getProducts = getProducts;
exports.postProduct = postProduct;
exports.putProduct = putProduct;
exports.deleteProduct = deleteProduct;
