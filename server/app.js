var express = require('express');
var logger = require('./utils/logger').httpLogger;
var cookieParser = require('cookie-parser');
const nocache = require('nocache');
var cors = require('cors');
const log4js = require('log4js');
const timeout = require('connect-timeout');

// require all the js files from routes folder
var apiRoute = require('./routes/index');

var app = express();
require('dotenv').config();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};
app.use(nocache());
app.set('trust proxy', 1);
app.use(cors(corsOptions));

app.use(
  log4js.connectLogger(logger, {
    level: 'info',
    format: (req, res, format) =>
      format(
        ':remote-addr - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"'
      ),
  })
);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(timeout('120s'));

// paths
app.use('/', apiRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //next(err);
  res.redirect('/');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
