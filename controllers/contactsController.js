const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (req, res) => {
  const contactsList = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contactsList,
    },
  });
};
const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getById(contactId);

  if (!contact) {
    return res.json({
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};
const postContact = async (req, res) => {
  const contact = await addContact(req.body);
  res.json({
    code: 201,
    message: "Created",
    data: {
      contact,
    },
  });
};
const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    return res.json({
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    code: 200,
    message: "contact deleted",
  });
};
const putContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  if (!updatedContact) {
    return res.json({
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      updatedContact,
    },
  });
};
module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
};
