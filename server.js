const express = require('express');
const metricRoutes = require('./routes/metric');
const schedule = require('node-schedule');
const { clearOldRecords } = require('./helpers/metricHelper');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(metricRoutes);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
  const every5minutes = ' */5 * * * *';
  schedule.scheduleJob(every5minutes, clearOldRecords);
});

module.exports = app;
