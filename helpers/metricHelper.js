const metrics = {};

const getTimestampThreshold = () => {
  const timestampThreshold = new Date();
  timestampThreshold.setHours(timestampThreshold.getHours() - 1);
  return timestampThreshold.getTime();
};

const addMetric = (key, value) => {
  if (Object.keys(metrics).includes(key))
    metrics[key].push({
      timestamp: Date.now(),
      value: Math.round(value),
    });
  else metrics[key] = [{ timestamp: Date.now(), value: Math.round(value) }];
  return metrics;
};

const getTotalOfOneMetricForTheLastHour = (key) => {
  if (!metrics[key]) return 0;
  const timestampThreshold = getTimestampThreshold();

  return metrics[key]
    .filter(({ timestamp }) => timestampThreshold <= timestamp)
    .reduce((acc, { value }) => {
      return acc + value;
    }, 0);
};

const clearOldRecords = () => {
  const timestampThreshold = getTimestampThreshold();
  console.log('Cleaning old records');
  Object.keys(metrics).forEach((key) => {
    metrics[key] = metrics[key].filter(
      ({ timestamp }) => timestampThreshold <= timestamp
    );
  });
};

module.exports = {
  addMetric,
  getTotalOfOneMetricForTheLastHour,
  metrics,
  clearOldRecords,
};
