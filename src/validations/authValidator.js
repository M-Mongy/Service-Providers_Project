const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(2)
    .max(50)
    .trim()
    .required()
    .messages({
      "string.pattern.base": "Name must contain letters only",
    }),

  email: Joi.string()
    .email()
    .lowercase()
    .required(),

  password: Joi.string()
    .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters",
    }),

  role: Joi.string()
    .valid("user", "provider")
    .default("user"),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required(),
});

module.exports = {
  signupSchema,
  loginSchema,
};