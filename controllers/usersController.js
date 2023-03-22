const { SubscriptionError } = require("../helpers/errorHandler");
const sgMail = require("@sendgrid/mail");

const {
  registration,
  login,
  logout,
  currentUser,
  changeSubscription,
  changeAvatar,
  verify,
  repeatedVerify,
} = require("../service/userService");

const registrationController = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;

  const verificationToken = await registration(email, password, subscription);

  res.json({
    code: 201,
    status: "Created",
    user: {
      email,
      subscription,
    },
  });

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: process.env.EMAIL,
    subject: "Please, confirm your email",
    html: `<a href="${process.env.HOST}:${process.env.PORT}/api/users/verify/${verificationToken}">Confirm<a/>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
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
const verifyController = async (req, res) => {
  const { verificationToken } = req.params;
  await verify(verificationToken);
  res.json({
    code: 200,
    status: "OK",
    message: "Verification successful",
  });
};
const repeatedVerifyController = async (req, res) => {
  const { email } = req.body;
  const user = await repeatedVerify(email);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: process.env.EMAIL,
    subject: "Please, confirm your email",
    html: `<a href="${process.env.HOST}:${process.env.PORT}/api/users/verify/${user.verificationToken}">Confirm<a/>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.json({
        code: 200,
        status: "OK",
        body: {
          message: "Verification email sent",
        },
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  changeSubscriptionController,
  changeAvatarController,
  verifyController,
  repeatedVerifyController,
};
