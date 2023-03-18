const express = require("express");

const { errorHandler } = require("../../helpers/errorHandler");
const { validateUserData } = require("../../middlewares/userDataValidation");
const { checkToken } = require("../../middlewares/checkToken");
const multerMiddleware = require("../../middlewares/multerMiddleware");
const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  changeSubscriptionController,
  changeAvatarController,
} = require("../../controllers/usersController");

const router = express.Router();

router.post(
  "/register",
  validateUserData,
  errorHandler(registrationController)
);
router.post("/login", validateUserData, errorHandler(loginController));
router.post("/logout", checkToken, errorHandler(logoutController));
router.get("/current", checkToken, errorHandler(currentUserController));
router.patch("/", checkToken, errorHandler(changeSubscriptionController));
router.patch(
  "/avatars",
  checkToken,
  multerMiddleware.single("avatar"),
  errorHandler(changeAvatarController)
);
module.exports = router;
