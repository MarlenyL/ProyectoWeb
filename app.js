var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require('./Database/elephantsql');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var principalERouter = require('./routes/principalE');
var transaccionesRouter = require('./routes/transaccionesE');
var session = require('express-session');
var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
//app.use(bodyParser.urlencoded({extended : true}));
//app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/principalE', principalERouter);
app.use('/transaccionesE', transaccionesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

database.conn();


app.post('/', function(request, response) {
	var username = request.body.user;
  var password = request.body.password;
  console.log(username);
	if (username && password) {
		database.loga(username,password);
  }});

module.exports = app; 
