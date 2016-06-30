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
    password: type.string(),
    passwordConfirmation: type.string()
}, {
    pk: 'email'
});

//implementing CRUD functions
exports.add = function(req, res) {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
    });
    user.save().then(function(result) {
        res.json(result);
    });
};

exports.getUser = function(req, res) {
    User.get(req.params.email).run().then(function(guser) {
        res.json(guser);
    });
};

exports.isValidPassword = function(email, input_password) {
  this.val = false;
  User.get(email).run().then(function(guser) {
    if (guser.password == input_password) {

        return true;
    } else {

        return false;
    }
  });
  return this.val;
};
