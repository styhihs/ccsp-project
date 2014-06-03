var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost:27017");

// Error handler
mongoose.connection.on('error', function(err){
  console.log(err);
});

// Connection established
mongoose.connection.once('open', function(){
  console.log('database connection established');
});

require('../models/user');