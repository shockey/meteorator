
Router.configure({
  layoutTemplate: 'mainLayout'
});


Router.route('/', function () {
  this.render('forums');
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/create', function () {
  this.render('createNew');
});

Router.route('/logout', function () {
  Meteor.logout(function() {
    this.redirect('/');
  })
});

