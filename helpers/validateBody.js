// const Joi = require("joi");
const HttpError = require("./HttpError");


// const schema = Joi.object({
//     name: Joi.string().required(),
//     email: "name@name.com",
//     phone: "(000) 000-0000",
// })

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};


export default validateBody;
