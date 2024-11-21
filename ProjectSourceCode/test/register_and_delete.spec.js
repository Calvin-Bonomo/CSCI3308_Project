// COPY THESE LINES INTO NEW FILE TO CREATE A SEPARATE TEST FILE: **************

const server = require('../index');
const chai = require('chai'); 
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

// ********** EVERYTHING BELOW HERE IS DIFFERENT FOR EACH TEST FILE ************

describe('Server!', () => {
  // Check that register exists
  it('/register page exists', done => {
    chai
      .request(server)
      .get('/register')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('/register doesn\'t accept empty', done => {
    chai
      .request(server)
      .post('/register')
      .send({username: '', password: ''})
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('/register check requires password', done => {
    chai
      .request(server)
      .post('/register')
      .send({username: 'test123', password: ''})
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('/register check requires username', done => {
    chai
      .request(server)
      .post('/register')
      .send({username: '', password: 'test123'})
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  // This one will fail unless running for the first time since it creates a new user which will
  // succeed the first time but will not succeed again because registering the same user twice
  // causes an error
  // 
  // it('/register functionality works', done => {
  //   chai
  //     .request(server)
  //     .post('/register')
  //     .send({username: 'test123', password: 'test123'})
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       done();
  //     });
  // });
});
