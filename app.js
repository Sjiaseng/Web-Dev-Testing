var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/about', (req, res) => {
   res.render('about');
});

app.get('/apple_info', (req, res) =>{
  res.render('apple_info');
});

app.get('/layout', (req, res) =>{
  res.render('layout');
});


app.get('/responsivepage', (req, res) =>{
  res.render('responsivepage');
});

app.get('/todolist', (req, res) =>{
  res.render('todolist');
});


const temperatureConversion = require('./routes/temperature');

// render the temperature conversion form
app.get('/temperature', (req, res) =>{
  res.render('temperature');
})

// Handle the form submission
app.post('/convert', temperatureConversion);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


const bodyParser = require('body-parser');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todoapp',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database Connected');
  }
});

const todolistRoutes = require('./routes/todolist')(db);
app.use('/', todolistRoutes);

const addRoutes = require('./routes/add')(db);
app.use('/', addRoutes);

const completetaskRoute = require('./routes/completetask')(db);
app.use(completetaskRoute);


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
