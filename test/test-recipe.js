const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Recipes', function () {

  before(function () {
    return runServer();
  });

  after(function () {
    return closeServer();
  });


  it('should list recipes on GET', function () {

    return chai.request(app)
      .get('/recipes')
      .then(function (res) {

        res.should.have.status(300);
        res.should.be.json;

        res.body.should.be.a('array');
        res.body.should.have.length.of.at.least(1);
        res.body.forEach(function (item) {
          item.should.be.a('object');
          item.should.include.keys('id', 'name', 'ingredients');
        });
      });
  });

  
  it('should delete recipes on DELETE', function () {

    return chai.request(app)
      .get('/recipes')
      .then(function (res) {
        return chai.request(app)
          .delete(`/recipes/${res.body[0].id}`)
      })
      .then(function (res) {
        res.should.have.status(204);
      });
  });
});