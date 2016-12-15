let mongoose = require('mongoose');
    product = require('../models/product');
    Product = mongoose.model('Product');
    products = {
      getAll: (req, res) => {
        Product.find({}).exec((err, products) => {
          if(err) res.send(err);
          res.json(products);
        })
      },

      getOne: (req, res) => {
        let id = req.params.id;
        Product.findOne({_id: id}).exec((err, product) => {
          if(err) res.send(err);
          res.json(product);
        })
      },

      create: (req, res) => {
        Product.create({category: req.body.category,
                        group: req.body.group,
                        name: req.body.name,
                        price: req.body.price,
                        origin: req.body.origin
        }, (err, product) => {
          if (err) res.send(err);
          res.json(product)
        })
      },

      update: (req, res) => {
        let id = req.params.id;
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
      },

      delete: (req, res) => {
        let id = req.params.id;
        Product.remove({_id: id}, (err) => {
          if (err) res.send(err);
          res.json("Product has been removed.")
        })
      }
}

module.exports = products;
