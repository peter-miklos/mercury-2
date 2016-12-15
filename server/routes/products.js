let mongoose = require('mongoose');
    product = require('../models/product');
    Product = mongoose.model('Product');
    products = {
      getAll: function(req, res) {
        Product.find({}).exec((err, products) => {
          if(err) res.send(err);
          res.json(products);
        })
      },

      getOne: function(req, res) {
        let id = req.params.id
        Product.findOne({_id: id}).exec((err, product) => {
          if(err) res.send(err);
          res.json(product);
        })
      },

      create: function(req, res) {
        Product.create({category: req.body.category,
                        group: req.body.group,
                        name: req.body.name,
                        price: req.body.price,
                        origin: req.body.origin
        }, function(err, product) {
          if (err) res.send(err);
          res.json(product)
        })
      },

      update: function(req, res) {
        let id = req.params.id
        Product.findByIdAndUpdate(id, {$set: {
          category: req.body.category,
          group: req.body.group,
          name: req.body.name,
          price: req.body.price,
          origin: req.body.origin
        }}, {new: true}, (err, product) => {
          if(err) res.send(err);
          res.json(product);
        })
      }
}

module.exports = products;
