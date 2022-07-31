const HttpError = require("../models/http-error");
const { compare, hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  /**
   * Zostawiona metoda tylko by podejrzeć jakie hasło bedzie zahashowane bcryptem
   */
  // hash(req.body.password, 12, async (err, hash) => {
  //   console.log({ hash });
  // });

  const userToCompare = {
    userId: "alksdcuy2y7cbacoadcb87c",
    email: "test@test.pl",
    password: "$2b$12$XL2EhkRmsmcXJDFHTKRaxeTngzGh/BJJYBjJXQ1xtqck5HcNHR7la",
  };

  //token generator
  const claims = {
    userId: userToCompare.userId,
    expirationDate: new Date(
      new Date("2050-12-12").getTime() + 1000 * 60 * 120 //narazie ustawione na 2h
    ).toISOString(),
  };
  const jwt_secret = process.env.JWT_SECRET;

  let jwt;
  // try {
  //   jwt = sign(claims, jwt_secret);
  // } catch (error) {
  //   return next(
  //     new HttpError(
  //       "Could not log you in, please check your credentials and try again.",
  //       403
  //     )
  //   );
  // }
  jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbGtzZGN1eTJ5N2NiYWNvYWRjYjg3YyIsImV4cGlyYXRpb25EYXRlIjoiMjA1MC0xMi0xMlQwMjowMDowMC4wMDBaIiwiaWF0IjoxNjU5MDgzMTM4fQ.xP9ofsTqha8bcO8v2xl1gk8DZEVe3OzxnmX_3poCjRU"; //someTokenHardcoded

  const infoToBeSent = {
    authToken: jwt,
  };

  /**
     * Req credentials, które zwracają poprawne dane
     * json chwilowo
     * {
      "email": "test@test.pl",
      "password": "sdcsDSFS12344!!"
      }
     */
  compare(req.body.password, userToCompare.password, function (err, result) {
    if (req.body.email !== userToCompare.email)
      return next(new HttpError("Złe dane. Spróbuj ponownie.", 403));

    if (err || !result)
      return next(new HttpError("Złe dane. Spróbuj ponownie.", 403));

    if (result) {
      res.status(200).json(infoToBeSent);
    }
  });
};

exports.login = login;
