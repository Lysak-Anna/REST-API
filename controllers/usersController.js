const { SubscriptionError } = require("../helpers/errorHandler");

const {
  registration,
  login,
  logout,
  currentUser,
  changeSubscription,
  changeAvatar,
} = require("../service/userService");

const registrationController = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;

  await registration(email, password, subscription);

  res.json({
    code: 201,
    status: "Created",
    user: {
      email,
      subscription,
    },
  });
};

const loginController = async (req, res) => {
  const { email, password, subscription } = req.body;
  const token = await login(email, password);
  res.json({
    code: 200,
    status: "success",
    token,
    user: {
      email,
      subscription,
    },
  });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await logout(_id);
  res.json({
    code: 204,
    status: "No content",
  });
};

const currentUserController = async (req, res) => {
  const { _id } = req.user;
  const data = await currentUser(_id);
  res.json({
    code: 200,
    status: "OK",
    data,
  });
};

const changeSubscriptionController = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (
    subscription !== "starter" &&
    subscription !== "pro" &&
    subscription !== "business"
  ) {
    throw new SubscriptionError();
  }
  const newSubcr = await changeSubscription(_id, subscription);
  res.json({
    code: 200,
    status: "OK",
    newSubcr,
  });
};
const changeAvatarController = async (req, res) => {
  const { _id } = req.user;
  const avatarUrl = await changeAvatar(req, _id);

  res.json({
    code: 200,
    status: "OK",
    avatarUrl,
  });
};
module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  changeSubscriptionController,
  changeAvatarController,
};
