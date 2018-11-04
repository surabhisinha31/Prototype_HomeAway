var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/HomeAway');
// mongoose.connect('mongodb://demo:demo273@ds117485.mlab.com:17485/homeaway');

module.exports = {mongoose};
