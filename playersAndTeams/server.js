var express = require('express');
var PORT = 8000;
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

app.listen(PORT, function() {
  console.log("Server listening on port " + PORT);
});
