const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./schemas/user");
const { UnauthorizedError, ConflictError } = require("../helpers/errorHandler");

const registration = async (email, password, subscription) => {
  try {
    const user = new User({
      email,
      password,
      subscription,
    });

    await user.save();
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

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  changeSubscription,
};
