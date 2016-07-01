var thinky = require('thinky')({
    host: 'localhost',
    port: 28015,
    db: 'challengeBnbTest'
});
var r = thinky.r;
var type = thinky.type;

var Booking = thinky.createModel("Booking", {
    spacename: type.string(),
    date: type.date(),
    guestemailid: type.string()
});

exports.add = function(req, res) {
  var booking = new Booking({
    spacename: req.body.spacename,
    date: req.body.date,
    guestemailid: req.body.guestemailid
  });
  booking.save().then(function(result) {
    res.json(result);
  });
};
