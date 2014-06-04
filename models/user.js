var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model('User', new Schema({
  fbid: { type: String, required: true, unique: true },
  list: [{
  	food    : { type: String, required: true },
  	location: { type: String, default: ""},
  	brand   : { type: String, default: ""}
  }]
}));