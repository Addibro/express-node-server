var express = require('express'); // the express framework
var app = express();
var bodyParser = require('body-parser'); // express middleware to use if doing anything with forms. Will add a body object to your request so that you can access POST param.
var routes = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs'); // creates a db called cats

app.use(bodyParser.json()); // gives the app the ability to parse json. Necessary when sending data in json.
app.use(bodyParser.urlencoded({
    extended: true // allows your app to read data from URLs (GET requests)
}));

var dogRoutes = require('./routes/dog')(app);

var server = app.listen(3003, function () {
    console.log('Dog server running at localhost:3003');
});

module.exports = routes;