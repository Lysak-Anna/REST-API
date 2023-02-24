const Joi = require("joi");

function validateIncomeData(req, res) {
  const schema = Joi.object({
    name: Joi.string().pattern(/^(?=.{3,30}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/),
    email: Joi.string().email(),
    phone: Joi.string()
      .pattern(/^[0-9]+$/, "numbers")
      .min(9)
      .max(11),
    favorite: Joi.boolean(),
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
    favorite: Joi.optional(),
  });
  const fields = requiredField.validate(req.body);
  if (fields.error) {
    return res.json({
      code: 400,
      message: `missing required ${fields.error.details[0].path} field`,
    });
  }
}
function validateOneField(req, res) {
  const requiredField = Joi.object({
    favorite: Joi.required(),
  });
  const field = requiredField.validate(req.body);
  if (field.error) {
    return res.json({
      code: 400,
      message: "missing field favorite",
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
  patchValidation: (req, res, next) => {
    validateOneField(req, res);
    next();
  },
};
