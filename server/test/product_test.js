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

    it("product cannot be save w/o category", (done) => {
      let incompleteProduct = {
        group: "group 1",
        name: "test product",
        price: 7.99,
        origin: "Hungary"
      }
      chai.request(server)
          .post('/api/v1/product')
          .send(incompleteProduct)
          .end((err,res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('errors');
            expect(res.body.errors).to.have.property('category');
            expect(res.body.errors.category).to.have.property('kind').eql('required');
            done();
          })
    })

    it("product cannot be save w/o group", (done) => {
      let incompleteProduct = {
        category: "category 1",
        name: "test product",
        price: 7.99,
        origin: "Hungary"
      }
      chai.request(server)
          .post('/api/v1/product')
          .send(incompleteProduct)
          .end((err,res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.errors.group).to.have.property('kind').eql('required');
            done();
          })
    })

    it("product cannot be save w/o name", (done) => {
      let incompleteProduct = {
        group: "group 1",
        category: "category 1",
        price: 7.99,
        origin: "Hungary"
      }
      chai.request(server)
          .post('/api/v1/product')
          .send(incompleteProduct)
          .end((err,res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.errors.name).to.have.property('kind').eql('required');
            done();
          })
    })

    it("product cannot be save w/o price", (done) => {
      let incompleteProduct = {
        group: "group 1",
        category: "category 1",
        name: "product 1",
        origin: "Hungary"
      }
      chai.request(server)
          .post('/api/v1/product')
          .send(incompleteProduct)
          .end((err,res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.errors.price).to.have.property('kind').eql('required');
            done();
          })
    })

    it("product cannot be save with price less than 0.01", (done) => {
      let incompleteProduct = {
        group: "group 1",
        category: "category 1",
        name: "product 1",
        price: -3.00,
        origin: "Hungary"
      }
      chai.request(server)
          .post('/api/v1/product')
          .send(incompleteProduct)
          .end((err,res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.errors.price).to.have.property('message').eql('Price cannot be less than 0.01');
            done();
          })
    })

    it("product cannot be save w/o origin", (done) => {
      let incompleteProduct = {
        group: "group 1",
        category: "category 1",
        name: "product 1",
        price: 7.99
      }
      chai.request(server)
          .post('/api/v1/product')
          .send(incompleteProduct)
          .end((err,res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.errors.origin).to.have.property('kind').eql('required');
            done();
          })
    })
  })

})
