// COPY THESE LINES INTO NEW FILE TO CREATE A SEPARATE TEST FILE: **************

const server = require('../index');
const chai = require('chai'); 
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

// ********** EVERYTHING BELOW HERE IS DIFFERENT FOR EACH TEST FILE ************


describe('Login Functionality', () => {
  
  
  // Sample test case given to test / endpoint.
  it('Should respond succes if login credentials are valid', done => {
    chai
      .request(server)
      .post('/login')
      .send({ username: 'Technostalgic', password: 'password' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  


  it('responds succes if logout is succesful', done => {
    chai
      .request(server)
      .get('/logout')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });


});

