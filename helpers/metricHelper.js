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

module.exports = { addMetric };
