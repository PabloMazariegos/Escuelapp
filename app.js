var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var logger        = require('morgan');
var jwt           = require('./jwt');
/*VARIABLES DE SESION*/

var indexRouter         = require('./routes/index');
var loginRouter         = require('./routes/login');
var mainRouter          = require('./routes/main');
var inscripcionRouter   = require('./routes/inscripcionRouter');
var personalRouter      = require('./routes/personal');
var CerrarSesionRouter      = require('./routes/CerrarSesion');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/login', loginRouter)
app.use('/CerrarSesionRouter', loginRouter)
app.use('/main', jwt.ValidaToken , mainRouter);
app.use('/inscripciones', jwt.ValidaToken , inscripcionRouter);
app.use('/personal', jwt.ValidaToken , personalRouter);


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
