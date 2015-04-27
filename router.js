
Router.configure({
  layoutTemplate: 'mainLayout'
});


Router.route('/', function () {
  this.render('forums');
});

Router.route('/login', function () {
  this.render('login');
});

