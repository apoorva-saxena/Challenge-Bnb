var thinky = require('thinky')({
    host: 'localhost',
    port: 28015,
    db: 'challengeBnbTest'
});
var r = thinky.r;
var type = thinky.type;

var Space = thinky.createModel("Space", {
  name: type.string(),
  description: type.string(),
  price: type.number(),
  available: type.boolean(),
});

exports.add = function(req, res) {
    var space = new Space({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      available: true
    });
    space.save().then(function(result) {
        res.json(result);
    });
};

exports.getSpaceWithName = function(req, res) {
    User.get(req.params.id).run().then(function(gspace) {
        res.json(gspace);
    });
};
