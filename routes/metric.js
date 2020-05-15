const express = require('express');
const { metric } = require('../validations/schemas');
const validate = require('../validations/middleware');
const { addMetric } = require('../helpers/metricHelper');

const router = express.Router();

router.post('/metric/:key', validate(metric, 'body'), (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  addMetric(key, value);
  res.send();
});

module.exports = router;
