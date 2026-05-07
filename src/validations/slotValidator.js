const Joi = require('joi');

const createSlotSchema = Joi.object({
  date: Joi.date().greater('now').required().messages({
    'date.greater': 'Appointment date must be in the future'
  }),
  startTime: Joi.string().regex(/^([0-9]{2}):([0-9]{2})$/).required(),
  endTime: Joi.string().regex(/^([0-9]{2}):([0-9]{2})$/).required(),
  duration: Joi.number().integer().min(15).max(120).required()
});

const updateSlotSchema = Joi.object({
  date: Joi.date().greater('now'),
  startTime: Joi.string().regex(/^([0-9]{2}):([0-9]{2})$/),
  endTime: Joi.string().regex(/^([0-9]{2}):([0-9]{2})$/),
  duration: Joi.number().integer().min(15).max(120)
}).min(1);

module.exports = { createSlotSchema, updateSlotSchema };