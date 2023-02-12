const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join("./models/contacts.json");

// Common function to read file
async function read() {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);
  return contactsList;
}

// Function to get all contacts
const listContacts = async () => {
  try {
    const contactsList = await read();
    return contactsList;
  } catch (error) {
    return error.message;
  }
};
// Function to get contact by id
const getById = async (contactId) => {
  try {
    const contactsList = await read();
    const contact = contactsList.find((cont) => cont.id === contactId);
    return contact;
  } catch (error) {
    return error.message;
  }
};
// Function to delete contact by id
const removeContact = async (contactId) => {
  try {
    const contactsList = await read();
    const index = contactsList.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return undefined;
    }
    contactsList.splice(index, 1);
    const newContactList = JSON.stringify(contactsList, null, "\t");
    fs.writeFile(contactsPath, newContactList);
    return 1;
  } catch (error) {
    return error.message;
  }
};
// Function to add contact
const addContact = async ({ name, email, phone }) => {
  try {
    const contactsList = await read();
    const newContact = { id: nanoid(), name, email, phone };
    const newContactsList = JSON.stringify(
      [newContact, ...contactsList],
      null,
      "\t"
    );
    fs.writeFile(contactsPath, newContactsList);
    return newContact;
  } catch (error) {
    return error.message;
  }
};
// Function to update contact by id
const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const contactsList = await read();
    const contact = contactsList.find((cont) => cont.id === contactId);
    if (!contact) {
      return undefined;
    }
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    fs.writeFile(contactsPath, JSON.stringify(contactsList, null, "\t"));
    return contact;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
