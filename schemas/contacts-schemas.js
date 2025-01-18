const Joi = require("joi");



const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Перевірка формату імейла
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/) // Перевірка міжнародного формату телефонного номера
    .required()
    .messages({
      "string.pattern.base": "Phone number must be in the format (888) 888-8888",
      "string.empty": "Phone number is required",
    }),
})


module.exports = {
    addSchema,
};