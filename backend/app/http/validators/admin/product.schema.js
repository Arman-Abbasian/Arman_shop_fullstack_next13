const createError = require("http-errors");
const Joi = require("joi");
const { MongoIDPattern } = require("../../../../utils/constants");

const addProductSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(30)
    .error(createError.BadRequest("title is not true")),
  description: Joi.string()
    .required()
    .error(createError.BadRequest("description is not true")),
  slug: Joi.string()
    .required()
    .error(createError.BadRequest("slug is not true")),
  brand: Joi.string()
    .required()
    .error(createError.BadRequest("brand is not true")),
  countInStock: Joi.number()
    .required()
    .error(createError.BadRequest("count in stock is not true")),
  imageLink: Joi.string()
    .required()
    .error(createError.BadRequest("image link is not true")),
  tags: Joi.array()
    .min(0)
    .max(20)
    .error(createError.BadRequest("tags could not be more than 20 Items")),
  category: Joi.string()
    .required()
    .regex(MongoIDPattern)
    .error(createError.BadRequest("category is not true")),
  offPrice: Joi.number().error(
    createError.BadRequest("off price is not true")
  ),
  price: Joi.number()
    .required()
    .error(createError.BadRequest("price is not true")),
  discount: Joi.number()
    .allow(0)
    .error(createError.BadRequest("discount is not true")),
});

const changeCourseDiscountSchema = Joi.object({
  offPrice: Joi.number()
    .required()
    .error(createError.BadRequest("off price is not true")),
  discount: Joi.number()
    .required()
    .allow(0)
    .error(createError.BadRequest("price is not true")),
});

module.exports = {
  addProductSchema,
  changeCourseDiscountSchema,
};
