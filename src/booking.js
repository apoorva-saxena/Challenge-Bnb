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
  },
    {
      pk: 'guestemailid'

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

//get bookings by email
exports.getBookingsByEmail = function(req, res) {
  Booking.get(req.params.guestemailid).run().then(function(bookingdetails){
    res.json(bookingdetails);
  });
};
