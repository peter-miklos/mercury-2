let express = require('express');
    router = express.Router();
    auth = require('./auth.js');
    products = require('./products.js');
    // user = require('./users.js');
    expressJWT = require('express-jwt');
    jwt = require('jsonwebtoken');


app.use(expressJWT({
  secret: require('../config/secret.js')(),
  credentialsRequired: true,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}).unless({ path: ['/login']}));

// Routes that can be accessed by anyone
router.post('/login', auth.login);

// Routes that can be accessed only by authenticated users
router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);

// Routes that can be access only by authenticated and authorized users
// router.get('/api/v1/users', users.getAll);
// router.get('/api/v1/admin/user/:id', user.getOne);
// router.post('/api/v1/admin/user/', user.create);
// router.put('/api/v1/admin/user/:id', user.update);
// router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;
