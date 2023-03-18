const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("./schemas/user");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const {
  UnauthorizedError,
  ConflictError,
  NotFoundError,
} = require("../helpers/errorHandler");
const resizeImg = require("../helpers/resizeImg");

const registration = async (email, password, subscription) => {
  try {
    const avatarURL = gravatar.url(email);
    const user = new User({
      email,
      password,
      avatarURL,
      subscription,
      verificationToken: uuidv4(),
    });

    await user.save();
    return user.verificationToken;
  } catch (error) {
    throw new ConflictError();
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedError("Email or password is wrong");
  }
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      subscription: user.subscription,
    },
    process.env.JWT_SECRET
  );
  await User.findOneAndUpdate({ email }, { token });
  return token;
};

const logout = async (id) => {
  await User.findOneAndUpdate({ _id: id }, { token: "" });
};

const currentUser = async (id) => {
  const user = await User.findById(id);
  const decode = jwt.decode(user.token);
  const { email, subscription } = decode;
  return { email, subscription };
};
const changeSubscription = async (id, subscription) => {
  const user = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );
  return user.subscription;
};
const changeAvatar = async (req, _id) => {
  await resizeImg(req);
  const filename = `${_id}_${req.file.originalname}`;
  const avatarsDir = path.join(__dirname, "../", "public", "avatars");
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(
    path.join(__dirname, "../", "tmp", req.file.originalname),
    resultUpload
  );
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  return avatarURL;
};
const verify = async (verifyToken) => {
  const user = await User.findOne({ verificationToken: verifyToken });
  if (!user) {
    throw new NotFoundError();
  }
  await User.findOneAndUpdate(
    { verificationToken: verifyToken },
    { verificationToken: null, verify: true }
  );
};
module.exports = {
  registration,
  login,
  logout,
  currentUser,
  changeSubscription,
  changeAvatar,
  verify,
};
