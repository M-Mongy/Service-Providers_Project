const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().trim(),
  email: Joi.string().email().required().lowercase(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'provider').default('user')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = { signupSchema, loginSchema };