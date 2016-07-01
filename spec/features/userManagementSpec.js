casper.test.begin('Sign Up page', 2, function(test) {
    casper.start('http://localhost:3000/users/new', function() {
        test.assertSelectorExists("h1", "Please sign up");

        this.fill('form[action="/users"]', {
          email: "test@test.com",
          name: "Apoorva",
          password: "secret"
        });
        this.click("[name='signup']");
        this.echo("redirected to new page");
        test.assertExists("h1", "Hello");

    }).run(function() {
        test.done();
    });
});
