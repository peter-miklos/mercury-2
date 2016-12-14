let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mercury-2-' + process.env.NODE_ENV);

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Successfully connected to the ${process.env.NODE_ENV} database`)
});
