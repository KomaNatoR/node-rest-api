const {
  getAll,
  getContactById,
  addContact,
  updateById,
  removeContact,
} = require("../services/contacts-services.js");
const { HttpError, ctrlWrapper } = require("../utils");



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
  const result = await addContact(req.body);
  res.status(201).json(result);
};
const updateContact = async (req, res) => {
  const { id } = req.params;
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