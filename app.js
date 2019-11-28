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
var principalVRouter = require('./routes/principalV')
var transaccionesRouter = require('./routes/transaccionesE');
var estadisticasRouter = require('./routes/estadisticasE');
var vendedorRouter = require('./routes/vendedor');
var session = require('express-session');
var logoutRouter = require('./routes/logout');
var datospRouter = require('./routes/datospersonales')
var imgchangeRouter = require('./routes/imgChange');
var recargaRouter = require('./routes/recarga');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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

var {sequelize,Sequelize} = require('./Database/connection')
//load passport strategies

require('./config/passport.js')(passport, usuario);

//Sync Database

sequelize.sync({force:true})
         .then(function() {

             console.log('Nice! Database looks fine')

         }).catch(function(err) {

             console.log(err, "Something went wrong with the Database Update!")

         });

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
relaciones.init(usuario, transaccion, lugar, beneficiario, empleado, transferencia, compra, trabaja, efectua, realiza);

app.use('/', indexRouter);
app.use('/signin',authRoute);
app.use('/principalE',principalERouter);
app.use('/principalV', principalVRouter);
app.use('/transaccionesE', transaccionesRouter);
app.use('/logout',logoutRouter);
app.use('/estadisticasE',estadisticasRouter);
app.use('/vendedor',vendedorRouter);
app.use('/datosP',datospRouter);
app.use('/imgChange',imgchangeRouter);
app.use('/recarga',recargaRouter)
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
