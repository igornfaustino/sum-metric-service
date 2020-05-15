const express = require('express');
const { metric } = require('../validations/schemas');
const validate = require('../validations/middleware');
const {
  addMetric,
  getTotalOfOneMetricForTheLastHour,
} = require('../helpers/metricHelper');

const router = express.Router();

router.post('/metric/:key', validate(metric, 'body'), (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  addMetric(key, value);
  res.send();
});

router.get('/metric/:key', (req, res) => {
  const { key } = req.params;
  const total = getTotalOfOneMetricForTheLastHour(key);
  res.send(`${total}`);
});

module.exports = router;
