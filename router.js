
Router.configure({
  layoutTemplate: 'mainLayout'
});


Router.route('/', function () {
  this.render('forums');
});


Router.route('/login', function () {
  if(Meteor.userId()){
    this.redirect("/");
  } else {
    this.render('login');
  }
});

Router.route('/create', function () {
  this.render('createNew');
});

Router.route('/logout', function () {
  var context = this;
  Meteor.logout(function(context) {
    context.redirect('/login');
  })
  this.redirect("/login");
});



Router.route('/:_id', function () {
  if(Forums.findOne({_id: this.params._id})) {
    this.render('forum', {data: function() {
            return Forums.findOne(this.params._id);
        }});
  } else {
    this.render('404');
  }
});
