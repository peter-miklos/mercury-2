let mongoose = require("mongoose");
    chai = require("chai");
    chaiHttp = require('chai-http');
    server = require('../server');
    expect = chai.expect;
    product = {
      category: "category 1",
      group: "group 1",
      name: "test product",
      price: 7.99,
      origin: "Hungary"
    }
chai.use(chaiHttp);

describe('Products', () => {
  beforeEach((done) => {
    mongoose.model('Product').remove({}, (err) => {
      if (err) console.log(err);
      console.log('Products have been removed.')
      done();
    })
  })

  describe('/GET products', () => {
    it('gets all the products', (done) => {
      chai.request(server)
          .get('/api/v1/products')
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.be.eql(0);
            done();
          })
    })
  })

  describe('/POST product', () => {
    it("saves the product in the db", (done) => {
      chai.request(server)
          .post('/api/v1/product')
          .send(product)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.category).to.be.eql("category 1");
            expect(res.body.group).to.be.eql("group 1");
            expect(res.body.name).to.be.eql("test product");
            expect(res.body.price).to.be.eql(7.99);
            expect(res.body.origin).to.be.eql("Hungary");
            done();
          })
    })
  })

})
