const { addMetric } = require('../helpers/metricHelper');
const expect = require('chai').expect;

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
