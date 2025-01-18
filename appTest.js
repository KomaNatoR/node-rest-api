const express = require("express");
const fs = require("fs/promises");
const path = require('path');


const contactsPath = path.join(__dirname,"./db/contacts.json");
const app = express();

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
    console.log(JSON.parse(contacts));
  return JSON.parse(contacts);
}
listContacts()


app.listen(3003, () => {
  console.log("Server is running. Use our API on port: 3003");
});