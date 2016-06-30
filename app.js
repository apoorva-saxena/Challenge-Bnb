var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var user = require('./src/user');
var space = require('./src/space');
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

//need to get this working
app.post('/users/login', function(req, res) {
    // sess = req.session;
    val = user.isValidPassword(req.body.email, req.body.password);
    if (val === true )
    {
      sess.email = req.body.email;
    }

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
  space.getAll(req, res);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
