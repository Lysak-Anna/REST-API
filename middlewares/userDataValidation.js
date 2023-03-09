const Joi = require("joi");
function validateUserData(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(/^(?=.*\d)(?=.*[A-Z])(.{8,12})$/),
  });
  const validatedData = schema.validate(req.body);
  if (validatedData.error) {
    return res.json({
      code: 400,
      status: "Bad request",
      message: validatedData.error.details,
    });
  }
  next();
}
module.exports = {
  validateUserData,
};
