var express = require('express');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get("/users/new", function(req, res) {
  res.render("users/new");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
