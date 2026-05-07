const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // You may need to npm install joi-objectid

const appointmentIdSchema = Joi.object({
  appointmentId: Joi.string().hex().length(24).required()
});

const slotIdSchema = Joi.object({
  slotId: Joi.string().hex().length(24).required()
});

module.exports = { appointmentIdSchema, slotIdSchema };