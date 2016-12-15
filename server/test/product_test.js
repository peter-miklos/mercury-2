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

    it("does not save product w/o category", (done) => {
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

    it("does not save product w/o group", (done) => {
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

    it("does not save product w/o name", (done) => {
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

    it("does not save product w/o price", (done) => {
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

    it("does not save product with price less than 0.01", (done) => {
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

    it("does not save product w/o origin", (done) => {
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

  describe('/GET product', () => {
    beforeEach((done) => {
      chai.request(server)
          .post('/api/v1/product')
          .send(product)
          .end((err, res) => { done(); })
    })

    it('returns the product details', (done) => {
      mongoose.model('Product').findOne({name: 'test product'}, (err, productInDb) => {
        chai.request(server)
            .get(`/api/v1/product/${productInDb._id}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a('object');
              expect(res.body.category).to.be.eql("category 1");
              expect(res.body.group).to.be.eql("group 1");
              expect(res.body.name).to.be.eql("test product");
              expect(res.body.price).to.be.eql(7.99);
              expect(res.body.origin).to.be.eql("Hungary");
              done();
            })
      })
    })

    it('returns error if unvalid product id is used', (done) => {
      chai.request(server)
          .get(`/api/v1/product/1`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('name').eql('CastError');
            done();
          })
    })
  })

  describe('/PUT product', () => {
    beforeEach((done) => {
      chai.request(server)
          .post('/api/v1/product')
          .send(product)
          .end((err, res) => { done(); })
    })

    it('updates the product details', (done) => {
      let updatedProduct = {
        category: "category 2",
        group: "group 2",
        name: "other product",
        price: 17.99,
        origin: "UK"
      }
      mongoose.model('Product').findOne({name: "test product"}, (err, productInDb) => {
        chai.request(server)
            .put(`/api/v1/product/${productInDb._id}`)
            .send(updatedProduct)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a('object');
              expect(res.body.category).to.be.eql("category 2");
              expect(res.body.group).to.be.eql("group 2");
              expect(res.body.name).to.be.eql("other product");
              expect(res.body.price).to.be.eql(17.99);
              expect(res.body.origin).to.be.eql("UK");
              done();
            })
      })
    })
  })

  describe('/DELETE product', () => {
    beforeEach((done) => {
      chai.request(server)
          .post('/api/v1/product')
          .send(product)
          .end((err, res) => { done(); })
    })

    it('deletes the product in db', (done) => {
      mongoose.model('Product').findOne({name: "test product"}, (err, productInDb) => {
        chai.request(server)
            .delete(`/api/v1/product/${productInDb._id}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a('object');
              done();
            })
        chai.request(server)
            .get('/api/v1/products')
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a('array');
              expect(res.body.length).to.be.eql(0);
              done();
            })
      })
    })
  })

})
