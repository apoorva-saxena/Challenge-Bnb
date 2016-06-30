var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var user = require('./src/user');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'hello kitty'
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

passport.use(new LocalStrategy(
    function(email, password, done) {
        User.getUser({
            email: email
        }, function(err, user) {
          console.log(err);
          console.log(user);
            if (err) {
                return done(err);
            }
            if (!user) {
              console.log('user not found');
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!User.isValidPassword(user, password)) {
              console.log('incorrect password not found');
              console.log(user, password);
                return done(null, false, {
                    message: 'Incorrect password'
                });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.email);
});

passport.deserializeUser(function(id, done) {
    User.getUser(email, function(err, user) {
        done(err, user);
    });
});

app.get("/users/new", function(req, res) {
    res.render("users/new");
});

app.post("/users/new", function(req, res) {
    user.add(req, res);
    res.redirect("/");
});

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/users/login", function(req, res) {
    res.render("users/login");
});

app.get("/users/:email", function(req, res) {
    user.getUser(req, res);
});

app.post('/users/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login'
        // failureFlash: true
        // successFlash: true
    })
);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
