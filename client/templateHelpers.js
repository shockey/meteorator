Template.nav.helpers({
  isUserLoggedIn: function() {
    var user = Meteor.user();

    if(user) {
      return true;
    } else{
      return false;
    }
  },
  forumCount: function() {
    return Forums.find().count();
  }
});

Template.forums.helpers({
  forums: function(){
    return Forums.find();
  }
});