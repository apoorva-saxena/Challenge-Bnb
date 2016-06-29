casper.test.begin("Locate the first page", 1, function(test) {
  casper.start('http://localhost:3000/users/new', function() {
    test.assertSelectorExists("h1", "Please sign up");
  }).run(function() {
        test.done();
    });
});
