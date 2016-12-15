let jwt = require('jsonwebtoken');
    validateUser = require('../routes/auth').validateUser;

module.exports = (req, res, next) => {
  let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  // let key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  jwt.verify(token, require('../config/secret.js')(), { algorithms: ['HS512'] }, function(err, decoded) {
    if (err) {
      console.log(err)
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid Token or Key"
      });
      return;
    } else {
      let dbUser = validateUser(decoded.user);
      if (dbUser) {
        if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
          next(); // To move to next middleware
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized"
          });
          return;
        }
      } else {
        // No user with this name exists, respond back with a 401
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid User"
        });
        return;
      }
    }
  });
}
