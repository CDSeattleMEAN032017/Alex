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

// declare mongoose schemas
var CommentSchema = new mongoose.Schema({
  content: {type: String, required: true, minlength: 2 },
  name: { type: String, required: true, minlength: 2 },
  postedAt: { type: Date, default: Date.now }
});

var PostSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  content: { type: String, required: true, minlength: 2 },
  postedAt: { type: Date, default: Date.now },
  likes: {type: Number, default: 0},
  comments: [CommentSchema],
});

// declare mongoose models
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);
var Post = mongoose.model('Post'),
    Comment = mongoose.model('Comment');

// body parser
app.use(bodyParser.urlencoded({extended: true}));

// serve static content
app.use(express.static(__dirname + "/static"));

// use templating engine and set views folder
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// show all messages in db
app.get('/', function(req, res) {
  // mongoose finds all results in collection, returns as second param in callback (in this case 'posts')
  Post.find({}, null, {sort: '-postedAt'}, function(err, posts) {
    if(err) {
      res.render('error', { errors: posts.errors });
    } else {
      res.render('index', {data: posts, moment: moment});
    }
  });
});

// add a message to db
app.post('/', function(req, res) {
  // gets message data out of req.body (post data)
  // mongoose callback takes error as first param
  // if there are errors, render the error template and display them
  var post = new Post({ name: req.body.name, content: req.body.content });
  post.save(function(err) {
    if(err){
      console.log("Something went wrong!");
      res.render('error', { errors: post.errors });
    } else {
      console.log("Message successfully added to database");
      res.redirect('/');
    }
  });
});

// post a comment based on id route param
app.post('/comment/:id', function(req, res) {
  // gets a post by id
  var post = Post.findOne({ '_id' : req.params.id }, function (err, post) {
    if(err) {
      res.render('error', { errors: post.errors });
    } else {
      // pushes comment to embedded comments document and then saves it
      // alternatively you could use mongoose's update method
      post.comments.push({ name: req.body.name, content: req.body.content });
      post.save();
      res.redirect('/');
    }
  });
});

// start server up
app.listen(8000, function() {
  console.log("Server started on port 8000");
});
