require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');

const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);

app.use(session({
    secret: process.env.SESSION_SECRET,
    save: false,
    saveUninitialized: true
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// app.use(function(req, res, next) {
//     // before every route, attach the flash messages and current user to res.locals
//     res.locals.alerts = req.flash();
//     res.locals.currentUser = req.user;
//     next();
// });

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/profile', function(req, res) {
    res.render('profile');
});

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;