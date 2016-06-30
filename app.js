var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var user = require('./src/user');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/users/new", function(req, res) {
  res.render("users/new");
});

app.post("/users", function(req, res) {
  user.add(req, res);
  res.redirect("/");
});

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/users/signin", function(req, res) {
  res.render("users/signin");
});

app.get("/users/:email", function(req, res) {
  user.getUser(req, res);
});

app.post('/users/signin', function(req, res) {
  user.getUser(req, res);
  console.log(res);
  if (req.params.password === res.password) {
    console.log('correct password');
    res.redirect('/');
  } else {
    console.log('invalid');
    res.send('invalid password');
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
