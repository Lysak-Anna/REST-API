const {
  getAllContacts,
  getContactById,
  updateContact,
  removeContact,
  createContact,
  updateStatusContact,
} = require("../service/contactsService");

const getContactsController = async (req, res) => {
  const { _id: owner } = req.user;
  let { page = 1, limit = 20, favorite = [true, false] } = req.query;
  limit = +limit > 20 ? 20 : +limit;
  const contactsList = await getAllContacts(owner, { page, limit, favorite });
  res.json({
    status: "success",
    code: 200,
    data: {
      contactsList,
      page,
      limit,
    },
  });
};
const getContactByIdController = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const contact = await getContactById(contactId, owner);

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
  const { _id: owner } = req.user;
  const { name, email, phone, favorite } = req.body;
  const contact = await createContact({ name, email, phone, favorite }, owner);
  res.json({
    code: 201,
    message: "Created",
    data: {
      contact,
    },
  });
};
const deleteContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await removeContact(contactId, owner);
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
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  const updatedContact = await updateContact(
    contactId,
    {
      name,
      email,
      phone,
      favorite,
    },
    owner
  );
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
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updatedStatus = await updateStatusContact(contactId, favorite, owner);
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
