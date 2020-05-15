const {
  addMetric,
  metrics,
  getTotalOfOneMetricForTheLastHour,
  clearOldRecords,
} = require('../helpers/metricHelper');
const expect = require('chai').expect;

const clearMetrics = () =>
  Object.keys(metrics).forEach((key) => delete metrics[key]);

describe('add new metric', () => {
  it('should create a new key and add value', (done) => {
    const metrics = addMetric('test', 20);

    expect(metrics).to.have.key('test');
    expect(metrics['test']).to.be.an.instanceof(Array);
    expect(metrics['test']).to.have.length(1);
    done();
  });
  it('should add value to an existing key', (done) => {
    const metrics = addMetric('test', 10);

    expect(metrics).to.have.key('test');
    expect(metrics['test']).to.be.an.instanceof(Array);
    expect(metrics['test']).to.have.length(2);
    done();
  });
});

describe('get total of one empty metric', () => {
  before((done) => {
    clearMetrics();
    done();
  });

  it("should return 0 if metric don't exist", (done) => {
    const total = getTotalOfOneMetricForTheLastHour('test');
    expect(total).equals(0);
    done();
  });
});

describe('get total of one metric', () => {
  before((done) => {
    clearMetrics();
    const date2hoursAgo = new Date();
    date2hoursAgo.setHours(date2hoursAgo.getHours() - 2);
    metrics['test'] = [
      { timestamp: date2hoursAgo.getTime(), value: 4 },
      { timestamp: Date.now(), value: 3 },
      { timestamp: Date.now(), value: 7 },
      { timestamp: Date.now(), value: 2 },
    ];
    done();
  });

  it('should return the total of the last hour', (done) => {
    const total = getTotalOfOneMetricForTheLastHour('test');
    expect(total).equals(12);
    done();
  });
});

describe('remove old entries', () => {
  describe('remove some entries', () => {
    before((done) => {
      clearMetrics();
      const date2hoursAgo = new Date();
      date2hoursAgo.setHours(date2hoursAgo.getHours() - 2);
      metrics['test'] = [
        { timestamp: date2hoursAgo.getTime(), value: 4 },
        { timestamp: Date.now(), value: 3 },
        { timestamp: Date.now(), value: 7 },
        { timestamp: Date.now(), value: 2 },
      ];
      done();
    });

    it('should have an array without old entries', (done) => {
      clearOldRecords();
      expect(metrics['test']).to.have.length(3);
      done();
    });
  });

  describe('Remove all entries', () => {
    before((done) => {
      clearMetrics();
      const date2hoursAgo = new Date();
      date2hoursAgo.setHours(date2hoursAgo.getHours() - 2);
      metrics['test'] = [
        { timestamp: date2hoursAgo.getTime(), value: 4 },
        { timestamp: date2hoursAgo.getTime(), value: 3 },
        { timestamp: date2hoursAgo.getTime(), value: 7 },
        { timestamp: date2hoursAgo.getTime(), value: 2 },
      ];
      done();
    });

    it('should have an empty array', (done) => {
      clearOldRecords();
      expect(metrics['test']).to.be.instanceOf(Array);
      expect(metrics['test']).to.have.length(0);
      done();
    });
  });
});
