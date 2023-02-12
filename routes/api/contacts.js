const express = require("express");
const {
  postValidation,
  putValidation,
} = require("../../middlewares/validation");
const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactById);
router.post("/", postValidation, postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putValidation, putContact);

module.exports = router;
