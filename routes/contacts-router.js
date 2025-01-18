const express = require("express");

const ctrl = require("../controllers/contacts-controllers.js");
const { validateBody } = require("../utils");
const schemas = require("../schemas/contacts-schemas.js");



const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);
contactsRouter.get("/:id", ctrl.getOneContact);
contactsRouter.post("/", validateBody(schemas.addSchema), ctrl.createContact);
contactsRouter.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);
contactsRouter.delete("/:id", ctrl.deleteContact);


module.exports = contactsRouter;