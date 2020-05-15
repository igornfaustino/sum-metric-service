const express = require('express');
const metricRoutes = require('./routes/metric');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(metricRoutes);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = app;
