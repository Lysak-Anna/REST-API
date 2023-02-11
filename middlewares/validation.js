const Joi = require("joi");

function validateIncomeData(req, res) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string()
      .pattern(/^[0-9]+$/, "numbers")
      .min(9)
      .max(11),
  });
  const validatedData = schema.validate(req.body);
  if (validatedData.error) {
    return res.json({
      code: 400,
      message: validatedData.error.details,
    });
  }
}
function validateRequiredField(req, res) {
  const requiredField = Joi.object({
    name: Joi.required(),
    email: Joi.required(),
    phone: Joi.required(),
  });
  const fields = requiredField.validate(req.body);
  if (fields.error) {
    return res.json({
      code: 400,
      message: `missing required ${fields.error.details[0].path} field`,
    });
  }
}

module.exports = {
  postValidation: (req, res, next) => {
    validateRequiredField(req, res);
    validateIncomeData(req, res);
    next();
  },
  putValidation: (req, res, next) => {
    validateRequiredField(req, res);
    validateIncomeData(req, res);
    next();
  },
};
