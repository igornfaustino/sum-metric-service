const Joi = require('@hapi/joi');

const metric = Joi.object({
  value: Joi.number().required(),
});

module.exports = { metric };
