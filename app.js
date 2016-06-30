var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var user = require('./src/user');
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

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/users/login", function(req, res) {
    res.render("users/login");
});

app.get("/users/:email", function(req, res) {

    user.getUser(req, res);
});

app.post('/users/login', function(req, res) {
    // sess = req.session;
    val = user.isValidPassword(req.body.email, req.body.password)
    if (val === true )
    {
      sess.email = req.body.email;
    }
    console.log(val)
    res.redirect('/')
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
