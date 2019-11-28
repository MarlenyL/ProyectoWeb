var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var passport   = require('passport');
var bodyParser = require('body-parser');

//Routes
var indexRouter = require('./routes/index');
var authRoute = require('./routes/auth');
var principalERouter = require('./routes/principalE');
var transaccionesRouter = require('./routes/transaccionesE');
var cloudiRouter = require('./routes/imgChange');
var session = require('express-session')
var logoutRouter = require('./routes/logout');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/imgChange', express.static('uploads'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// For Passport
app.use(session({
  secret: 'burritos pastor',
  resave: true,
  saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Models
var usuario = require("./models/usuario");
var transaccion = require("./models/Transaccion");
var lugar = require("./models/lugar");
var beneficiario = require("./models/beneficiario");
var empleado = require("./models/empleado");
var transferencia = require("./models/transferencia");
var compra = require("./models/compra");
var trabaja = require("./models/Trabaja");
var efectua = require("./models/efectua");
var realiza = require("./models/realiza");
var relaciones = require('./models/keys');

/*sequelize.sync({force:true})
         .then(function() {

             console.log('Nice! Database looks fine')

         }).catch(function(err) {

             console.log(err, "Something went wrong with the Database Update!")

         });*/
relaciones.init(usuario, transaccion, lugar, beneficiario, empleado, transferencia, compra, trabaja, efectua, realiza);

//load passport strategies

require('./config/passport.js')(passport, usuario);
app.use('/imgChange', cloudiRouter);
app.use('/', indexRouter);
app.use('/signin',authRoute);
app.use('/principalE',principalERouter);
app.use('/transaccionesE', transaccionesRouter);
app.use('/logout',logoutRouter);
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

module.exports = app;
