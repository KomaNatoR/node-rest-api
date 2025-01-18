const fs = require("fs/promises");
const path = require('path');
const { nanoid } = require("nanoid");



const contactsPath = path.join(__dirname,"../db/contacts.json");
// const contactsPath = path.resolve("./db/contacts.json");
// console.log(contactsPath);

const getAll = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}
async function getById(contactId) {
  const contacts = await getAll();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
}
async function add({name, email, phone}) {
  const contacts = await getAll();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts,null,2));
  return newContact;
}
const updateById = async (id, data) => {
  const contacts = await getAll();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}
async function remove(contactId) {
  const contacts = await getAll();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}


module.exports = {
  getAll,
  getById,
  add,
  updateById,
  remove,
};