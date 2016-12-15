let jwt = require('jsonwebtoken');
    auth = {
      login: function(req, res) {
        let username = req.body.username || '';
        let password = req.body.password || '';

        if (username == '' || password == '') {
          res.status(401);
          res.json({
            "status": 401,
            "message": "Invalid credentials"
          });
          return;
        }

        // Fire a query to your DB and check if the credentials are valid
        let dbUserObj = auth.validate(username, password);

        if (!dbUserObj) { // If authentication fails, we send a 401 back
          res.status(401);
          res.json({
            "status": 401,
            "message": "Invalid credentials"
          });
          return;
        }

        if (dbUserObj) {
          res.json(genToken(dbUserObj));
        }
      },

      validate: function (username, password) {
        // spoofing the DB response for simplicity
        let dbUserObj = { // spoofing a userobject from the DB.
          id: 123,
          name: 'test user',
          role: 'admin',
          username: 'test1@test.com'
        };
        return dbUserObj;
      },

      validateUser: function(username) {
        // spoofing the DB response for simplicity
        let dbUserObj = { // spoofing a userobject from the DB.
          id: 123,
          name: 'test user',
          role: 'admin',
          username: 'test1@test.com'
        };
        if (username == dbUserObj.username) {return dbUserObj;}
        else {return 'undefined'}
      }
}

function genToken(user) {
  let expires = expiresIn(1);
  let token = jwt.sign({
    exp: expires,
    iss: "http://localhost:3000",
    user: user.username
  }, require('../config/secret')(), { algorithm: 'HS512' });

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numHours) {
  return Math.floor(Date.now() / 1000) + (60 * 60 * numHours)
}

module.exports = auth;
