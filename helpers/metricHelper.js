const metrics = {};

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

  const timestampThreshold = new Date();
  timestampThreshold.setHours(timestampThreshold.getHours() - 1);

  return metrics[key]
    .filter(({ timestamp }) => timestampThreshold.getTime() <= timestamp)
    .reduce((acc, { value }) => {
      return acc + value;
    }, 0);
};

module.exports = { addMetric, getTotalOfOneMetricForTheLastHour, metrics };
