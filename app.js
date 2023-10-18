var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');
var mongoose = require('mongoose')
var User = require("./routes/Register")
var Log = require("./routes/Login")
var Analytics = require("./routes/Create_Post")
var app = express();



mongoose.connect("mongodb://localhost:27017/sociallife")
mongoose.connection.on('connected',(err)=>{
if(err){
  console.log(err)
}console.log("Connected to server")
})



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true in a production environment with HTTPS
}));

app.use(cookieParser());

app.use("/Analytics",Analytics)
app.use("/Auth",User)
app.use("/Login",Log)



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
