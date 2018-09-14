var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var passport=require('passport');
var mongo=require('mongodb');
var mongoose=require('mongoose');
var multer=require('multer');
var upload=multer({dest:'./uploads'});

var expres=require('express-messages');
var expressValidator=require('express-validator');
var session=require('express-session');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup

 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'jade');

 app.use(logger('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



//file upload 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



//Session Handling 

app.use(session({

  secret:'secret',
  saveUninitialized:true,
  resave:true
}));

//Express validator missing 
// app.use(expressValidator({
// errorFormatter:function(param,msg,values){
//   var namespace=param.split('.'),
//   root=namespace.shift(),
//   formParam=root;
//   while(namespace.length){
//     formParam += '['+namespace.shift+']';
//   }
//   return {
//     param:formParam,
//     msg:msg,
//     values:values
//   };
// }
// }));

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));







//Flash 
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
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
