let express = require('express');
    path = require('path');
    logger = require('morgan');
    bodyParser = require('body-parser');
    app = express();
    mongoose = require('mongoose');
    db = require('./config/dbConfig');
    port = 4000;

// Don't show the log when it is test
if(process.env.NODE_ENV != "test") {
  // use morgan to log at command line
  app.use(logger('combined')); // 'combined' outputs the Apache style logs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
})

app.use('/', require('./routes'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.listen(port, function() {
  console.log("Express server listening on port " + port)
})

module.exports = app;
