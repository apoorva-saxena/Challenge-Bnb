var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var User = require('./src/user');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/users/new", function(req, res) {
  res.render("users/new");
});

var thinky = require('thinky')({
  host: 'localhost',
  port: 28015,
  db: 'challengeBnbTest'
});

var r = thinky.r;
var type = thinky.type;

var User = thinky.createModel("User", {
  name: type.string(),
  email: type.string(),
  password: type.string()
});

app.post("/users", function(req, res) {
  var user = new User({
    name: req.body.name,
     email: req.body.email,
     password: req.body.password
  });
  user.save().then(function(result) {
        res.json({
            result: result
        });
    });
  res.redirect("/");
});

app.get("/", function(req, res) {
  res.render("index");
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
