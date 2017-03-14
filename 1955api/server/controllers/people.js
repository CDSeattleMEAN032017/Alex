var mongoose = require('mongoose');
var Person = mongoose.model('Person');

module.exports = {
  showAll : function(req, res) {
    Person.find({}, function(err, people) {
      res.json(people);
    });
  },
  addPerson : function(req, res) {
    var person = new Person({ name: req.params.name });
    person.save(function(err) {
      if(err) {
        console.log("Something went wrong");
        res.render('error', {errors: post.errors});
      } else {
        console.log("Person added to DB: " + req.params.name);
        res.redirect('/');
      }
    });
  },
  removePerson : function(req, res) {
    Person.remove({ name : req.params.name }, function(err) {
      if(err) {
        console.log("Errors occured");
      } else {
        console.log("Removed from DB: " + req.params.name);
      }
    });
  },
  showPerson : function(req, res) {
    var personToShow = Person.find({ name : req.params.name }, function(err, data) {
      if(err) {
        console.log("Errors occured");
      } else {
        console.log("Displaying details for: " + req.params.name);
        res.json(data);
      }
    });
  }
};
