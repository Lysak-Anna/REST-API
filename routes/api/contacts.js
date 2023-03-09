const express = require("express");
const { errorHandler } = require("../../helpers/errorHandler");
const {
  postValidation,
  putValidation,
  patchValidation,
} = require("../../middlewares/validation");
const { checkToken } = require("../../middlewares/checkToken");
const {
  getContactsController,
  getContactByIdController,
  postContactController,
  deleteContactController,
  putContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");

const router = express.Router();
router.use(checkToken);
router.get("/", errorHandler(getContactsController));

router.get("/:contactId", errorHandler(getContactByIdController));
router.post("/", postValidation, errorHandler(postContactController));

router.delete("/:contactId", errorHandler(deleteContactController));

router.put("/:contactId", putValidation, errorHandler(putContactController));
router.patch(
  "/:contactId/favorite",
  patchValidation,
  errorHandler(updateStatusContactController)
);

module.exports = router;
