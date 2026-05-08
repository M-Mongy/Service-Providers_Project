const Joi = require("joi");

const appointmentIdSchema = Joi.object({
  appointmentId: Joi.string()
    .hex()
    .length(24)
    .required()
});

const slotIdSchema = Joi.object({
  slotId: Joi.string()
    .hex()
    .length(24)
    .required()
});

module.exports = {
  appointmentIdSchema,
  slotIdSchema
};