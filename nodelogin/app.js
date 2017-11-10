var express = require('express');
var path = require('path');
var logger = require('morgan');
var multer = require('multer');
var glob = require('glob');
const fs = require('fs');
const fse = require('fs-extra');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var passport = require('passport');
require('./routes/passport');

var kafka = require('./routes/kafka/client');
var index = require('./routes/index');
var users = require('./routes/users');
var mysql = require('./routes/mysql');
var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({ credentials: true }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());
app.use(passport.session());

//method to serialize user for storage
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

// method to de-serialize back for auth
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});



app.use('/', index);
app.use('/users', users);
app.use('/files', users);
//app.use('./public/uploads', express.static(path.join(__dirname, 'uploads')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});




app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    res.status(err.status || 500);
    res.json('error');
});


module.exports = app;
