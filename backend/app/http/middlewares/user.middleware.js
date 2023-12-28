const cookieParser = require("cookie-parser");
const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../../models/user");

//! this middleware check the existance and validation of accessToken
async function verifyAccessToken(req, res, next) {
  try {
    //! here you get the accessToken cookie form user's request cookies
    const accessToken = req.signedCookies["accessToken"];
    //! if the access token is not existed return =>401 unauthorized
    if (!accessToken) {
      throw createHttpError.Unauthorized("plase enter your account");
    }
    const token = cookieParser.signedCookie(
      accessToken,
      process.env.COOKIE_PARSER_SECRET_KEY
    );
    JWT.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      async (err, payload) => {
        try {
          if (err) throw createHttpError.Unauthorized("token is not valid");
          const { _id } = payload;
          const user = await UserModel.findById(_id, {
            password: 0,
            otp: 0,
          });
          if (!user)
            throw createHttpError.Unauthorized("user account was not found");
          //! attach the user to req=> req.user
          req.user = user;
          return next();
        } catch (error) {
          next(error);
        }
      }
    );
  } catch (error) {
    next(error);
  }
}

function decideAuthMiddleware(req, res, next) {
  //!get the access token cookie that user sent with request
  const accessToken = req.signedCookies["accessToken"];
  if (accessToken) {
    return verifyAccessToken(req, res, next);
  }
  //! skip this middleware
  next();
}

module.exports = {
  verifyAccessToken,
  decideAuthMiddleware,
};
