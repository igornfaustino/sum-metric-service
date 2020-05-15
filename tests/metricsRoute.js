const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('POST metric', () => {
  it('should return an error if no body', (done) => {
    chai
      .request(app)
      .post('/metric/test')
      .end((err, res) => {
        expect(res).to.have.status(422);
        done(err);
      });
  });
  it('should have status 200', (done) => {
    chai
      .request(app)
      .post('/metric/test')
      .send({ value: 10 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });
});

describe('GET metric', () => {
  it('should have status 200', (done) => {
    chai
      .request(app)
      .get('/metric/test')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });
});
