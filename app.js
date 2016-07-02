var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var user = require('./src/user');
var space = require('./src/space');
var booking = require('./src/booking');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'hello kitty'
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/users/new", function(req, res) {
    res.render("users/new");
});

app.post("/users/new", function(req, res) {
    user.add(req, res);
    res.redirect("/");
});

app.get("/users/login", function(req, res) {
    res.render("users/login");
});

app.get("/users/:email", function(req, res) {
    user.getUser(req, res);
});

//user log in log out
app.post('/users/login', function(req, res) {
    user.isValidPassword(req, res);
});

app.post('/users/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

//spaces
app.get("/spaces/addspace", function(req, res) {
    res.render("spaces/addspace");
});

app.post("/spaces/addspace", function(req, res) {
    space.add(req, res);
    res.redirect('/');
});

app.get("/spaces/getSpace/:id", function(req, res) {
    space.getSpaceByName(req, res);
});

app.get("/", function(req, res) {
    if (!req.session.email) {
        res.send('Please login to view listings.');
    } else {
        console.log(req.session.email);
        space.getAll(req, res);
    }
});

//bookings
app.get("/booking/new", function(req, res) {
    res.render("booking/new");
});

app.post("/booking/new", function(req, res) {
    booking.add(req, res);
    res.redirect('/');
});

//get bookings by email
app.get("/booking/:guestemailid", function(req, res) {
  booking.getBookingsByEmail(req, res);
});

// app.post("/booking/:user_id"), function(req, res) {
//   if (!req.session.email) {
//       res.send('NOT LOGGED IN.')
//   } else {
//
//   }
// }

  app.listen(3000, function() {
      console.log('Example app listening on port 3000!');
  });
