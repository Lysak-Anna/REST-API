const {
  getAllContacts,
  getContactById,
  updateContact,
  removeContact,
  createContact,
  updateStatusContact,
} = require("../service/contactsService");

const getContactsController = async (req, res) => {
  const contactsList = await getAllContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contactsList,
    },
  });
};
const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

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
const postContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const contact = await createContact({ name, email, phone, favorite });
  res.json({
    code: 201,
    message: "Created",
    data: {
      contact,
    },
  });
};
const deleteContactController = async (req, res) => {
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
const putContactController = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  const updatedContact = await updateContact(contactId, {
    name,
    email,
    phone,
    favorite,
  });
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
const updateStatusContactController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updatedStatus = await updateStatusContact(contactId, favorite);
  if (!updatedStatus) {
    return res.json({
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      updatedStatus,
    },
  });
};
module.exports = {
  getContactsController,
  getContactByIdController,
  postContactController,
  deleteContactController,
  putContactController,
  updateStatusContactController,
};
