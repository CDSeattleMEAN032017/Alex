var mongoose = require('mongoose');
var people = require('../controllers/people.js');
// import models here too
module.exports = function(app) {
  app.get('/', function(req, res) {
    // display full list of json data
    people.showAll(req, res);
  });

  app.get('/new/:name', function(req, res) {
    // add a name to database from route param
    people.addPerson(req, res);
    console.log('added new name to db: ' + req.params.name);
  });

  app.get('/remove/:name', function(req, res) {
    // remove name from database from route param
    people.removePerson(req, res);
  });

  app.get('/:name', function(req, res) {
    // display document from route param
    people.showPerson(req, res);
  });
};
