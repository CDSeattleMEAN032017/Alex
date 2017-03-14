const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// setting up static files
app.use(express.static(path.join(__dirname, './static')));

// setting up templating engine and views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// require mongoose config which sets up db connection
require('./server/config/mongoose.js');

// store routes function in a variable
var setRoutes = require('./server/config/routes.js');

// invoke the function stored in setRoutes and pass it to app variable
setRoutes(app);

// start server listening on a port
app.listen(8000, function() {
  console.log("Server listening on port 8000");
});
