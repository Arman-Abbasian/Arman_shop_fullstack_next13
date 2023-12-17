const Joi = require("joi");
const createHttpError = require("http-errors");

const getOtpSchema = Joi.object({
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.BadRequest("mobile number is not true")),
});

const checkOtpSchema = Joi.object({
  otp: Joi.string()
    .min(6)
    .max(6)
    .error(createHttpError.BadRequest("code is not true")),
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.BadRequest("mobile number is not true")),
});

const completeProfileSchema = Joi.object({
  name: Joi.string().not().empty("please enter the Full name")
    .min(2)
    .max(100)
    .error(createHttpError.BadRequest("Full name format is not true")),
  email: Joi.string().not().empty("please enter the email")
    .email()
    .error(createHttpError.BadRequest("email format is not true")),
});

const updateProfileSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(50)
    .required()
    .error(createHttpError.BadRequest("full name format is not true")),
  email: Joi.string()
    .required()
    .email()
    .error(createHttpError.BadRequest("email is not true")),
  biography: Joi.string()
    .max(30)
    .allow("")
    .error(createHttpError.BadRequest("biography is not true")),
});

module.exports = {
  getOtpSchema,
  completeProfileSchema,
  checkOtpSchema,
  updateProfileSchema,
};
