const Joi = require('joi');

const fieldsRequired = 'Some required fields are missing';

const registerSchema = Joi.object({
  name: Joi.string().required().min(12).messages({
    'string.empty': fieldsRequired,
  }),
  email: Joi.string().email().required().messages({
    'string.empty': fieldsRequired,
  }),
  password: Joi.string().required().min(6).messages({
    'string.empty': fieldsRequired,
  }),
});

const validateRegisterFields = (body) => {
  const { error } = registerSchema.validate(body);
  if (error) return error.details[0].message;
};

module.exports = validateRegisterFields;
