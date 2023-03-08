const Contact = require("./schemas/contact");

const getAllContacts = async (owner, { page, limit, favorite }) => {
  return Contact.find({ owner })
    .select({ __v: 0 })
    .skip(page * limit - limit)
    .limit(limit)
    .where("favorite")
    .equals(favorite);
};
const getContactById = async (id, owner) => {
  return Contact.findOne({ _id: id, owner });
};
const createContact = async ({ name, email, phone, favorite }, owner) => {
  return Contact.create({ name, email, phone, favorite, owner });
};
const updateContact = async (
  id,
  { name, email, phone, favorite = false },
  owner
) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner },
    { name, email, phone, favorite },
    { new: true }
  );
};
const removeContact = async (id, owner) => {
  return Contact.findOneAndRemove({ _id: id, owner });
};
const updateStatusContact = async (id, favorite, owner) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner },
    { favorite },
    { new: true }
  );
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
