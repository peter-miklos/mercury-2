var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mercury-2-' + process.env.NODE_ENV);

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Successfully connected to the ${process.env.NODE_ENV} database`)
});
