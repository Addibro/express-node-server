var express = require('express'); // the express framework
var app = express();
var bodyParser = require('body-parser'); // express middleware to use if doing anything with forms. Will add a body object to your request so that you can access POST param.
var routes = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats'); // creates a db called cats

app.use(bodyParser.json()); // gives the app the ability to parse json. Necessary when sending data in json.
app.use(bodyParser.urlencoded({
    extended: true // allows your app to read data from URLs (GET requests)
}));

var catRoutes = require('./routes/cat')(app);

var server = app.listen(3002, function () {
    console.log('Cat server running at localhost:3002');
});

module.exports = routes;