var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

// connect to server
mongoose.connect('mongodb://localhost/mongooseApp');
// fix deprecation error
mongoose.Promise = global.Promise;
// set path to models
var models_path = path.join(__dirname, './../models');

// read all files in the models path and require each of them
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
});
