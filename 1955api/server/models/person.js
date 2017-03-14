var mongoose = require('mongoose');

// create schema
var PersonSchema = new mongoose.Schema({
  name: String
});

// register schema as a model
var Person = mongoose.model('Person', PersonSchema);
