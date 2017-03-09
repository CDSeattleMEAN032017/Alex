const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var app = express();

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

// testing params
app.get('/:path', function(req, res) {
  console.log("Someone just requested the path: ", req.params.path);
  res.redirect('/');
});

app.post('/result', function(req, res) {
  console.log(req.body);
  res.render('result', {data: req.body});
});

// start server up
app.listen(8000, function() {
  console.log("Server started on port 8000");
});
