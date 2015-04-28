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
  },
  friendlyUsername: function() {
    return Meteor.users.findOne({_id: this.owner}).profile.name;
  }
});

Template.createNew.events({
  'click .submit': function(){
    var title = document.getElementById('newForumTitle').value;
    var desc = document.getElementById('newForumDescription').value;
    Forums.insert({
      title: title,
      description: desc,
      owner: Meteor.userId()
    });
  }
});