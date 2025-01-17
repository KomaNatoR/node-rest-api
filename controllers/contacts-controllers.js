const Joi = require("joi");

const {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateById,
} = require("../services/contacts-services.js");
const { HttpError } = require("../helpers/index.js");
const { ctrlWrapper } = require("../utils");


const schema = Joi.object({
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

const getAllContacts = async (_, res) => {
  const data = await getAll();
  res.json(data);
};
const getOneContact = async (req, res) => {
  const { id } = req.params;
  const data = await getContactById(id);
  if (!data) {
    throw HttpError(404, `Contact with ${id} not found!`)
  }
  res.json(data);
};
const createContact = async (req, res) => {
  const { error } = schema.validate(req.body)
  if (error) {
    throw HttpError(400, error.message)
  }
  const result = await addContact(req.body);
  res.status(201).json(result);
};
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { error } = schema.validate(req.body)
  if (error) {
    throw HttpError(400, error.message)
  }
  const result = await updateById(id, req.body)
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found!`)
  }
  res.json(result);
};
const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await removeContact(id);
    if (!data) {
      throw HttpError(404, `Contact with ${id} not found!`)
    }
    res.json(data);
  } catch (error) {
    next(error)
  }
};


module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact,
};