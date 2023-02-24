const Contact = require("./schemas/contact");

const getAllContacts = async () => {
  return Contact.find();
};
const getContactById = async (id) => {
  return Contact.findById(id);
};
const createContact = async ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};
const updateContact = async (id, { name, email, phone, favorite = false }) => {
  return Contact.findByIdAndUpdate(
    id,
    { name, email, phone, favorite },
    { new: true }
  );
};
const removeContact = async (id) => {
  return Contact.findByIdAndRemove(id);
};
const updateStatusContact = async (id, favorite) => {
  return Contact.findByIdAndUpdate(id, { favorite }, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
