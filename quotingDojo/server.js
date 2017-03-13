const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

var app = express();

// export moment to work in templates
exports.index = function(req, res) {
    // send moment to your ejs
    res.render('index', { moment: moment });
};

// mongoose setup
mongoose.connect('mongodb://localhost/mongooseApp');
// fix deprecation error
mongoose.Promise = global.Promise;

// schemas
var QuoteSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  quote: { type: String, required: true, minlength: 2 },
  postedAt: { type: Date, default: Date.now },
  likes: {type: Number, default: 0}
});

mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');

// body parser
app.use(bodyParser.urlencoded({extended: true}));

// serve static content
app.use(express.static(__dirname + "/static"));

// use templating engine and set views folder
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// base route
app.get('/', function(req, res) {
  res.render("index");
});

// add a quote to db
app.post('/quotes', function(req, res) {
  // gets quote data out of req.body (post data)
  // mongoose callback takes error as first param
  // if there are errors, render the error template and display them
  var quote = new Quote({ name: req.body.name, quote: req.body.quote });
  quote.save(function(err) {
    if(err){
      console.log("Something went wrong!");
      res.render('error', { errors: quote.errors });
    } else {
      console.log("Quote successfully added to database");
      res.redirect('/quotes');
    }
  });
});

// show all quotes in db
app.get('/quotes', function(req, res) {
  // mongoose finds all results in collection, returns as second param in callback (in this case 'quotes')
  Quote.find({}, null, {sort: '-likes'}, function(err, quotes) {
    if(err) {
      res.render('error', { errors: quotes.errors });
    } else {
      res.render('quotes', {data: quotes, moment: moment});
    }
  });
});

// like a post
// this hits the like route on the id of the post
app.post('/like', function(req, res) {
  // get the id from the hidden form input
  var id = req.body.id;
  console.log(req.body);
  // update the like field by using mongoose's inc method
  Quote.update({_id : id}, {$inc: { likes: 1 }}, function(err) {
    if(err) {
      console.log("Something went wrong!");
      res.render('error', { errors: quote.errors });
    } else {
      console.log("A quote has been liked!");
      res.redirect('/quotes');
    }
  });
});

// start server up
app.listen(8000, function() {
  console.log("Server started on port 8000");
});
