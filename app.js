var express = require('express'); // the express framework
var path = require('path'); // core Node module for working with paths
var favicon = require('serve-favicon'); // the icon in the tab, prior to the site name
var logger = require('morgan'); // express middleware for logging requests and responses. Used during dev.
var cookieParser = require('cookie-parser'); // express middleware handling cookies. Your request object will have a cookie object which you can access in your app.
var bodyParser = require('body-parser'); // express middleware to use if doing anything with forms. Will add a body object to your request so that you can access POST param.

// instantiate the express app
var app = express();

// route files
var index = require('./routes/index');
var users = require('./routes/users');
var petRoutes = require('./routes/pet')(app);

// view engine setup
// path.join() will normalize all the arguments into a path string
app.set('views', path.join(__dirname, 'views')); // tells express to use views in /Users/andreas/Documents/Web/Node/server-test/views

// console.log(path.join(__dirname), 'views');
app.set('view engine', 'jade'); // tells express to use the Jade templating engine.

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// tell the app to use some stuff
app.use(logger('dev')); // logs the requests to the console. The dev param means it will log a lot of info about the request (method, status code and res time)
app.use(bodyParser.json()); // gives the app the ability to parse json. Necessary when sending data in json.
app.use(bodyParser.urlencoded({
    extended: true // allows your app to read data from URLs (GET requests)
}));
app.use(cookieParser()); // adds a cookie object to all the requests you get

app.use(express.static(path.join(__dirname, 'public'))); // tells your app to use the /public folder where you store images, stylesheets and scripts

// separate route files
app.use('/', index); // routing method. Path and the function to execute.
app.use('/users', users);


// catch 404 and forward to error handler
// once the request doesn't match any of the routes, it will reach the following function:
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err); // forward to error handler
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
