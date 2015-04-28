//////// HELPERS

Template.forum.helpers({
  
})

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

//////// EVENTS

Template.forums.events({
  'click .delete': function() {
    console.log(Forums);
    Forums.remove({_id: this._id});
  }
})

Template.createNew.events({
  'click .submit': function(){
    var title = document.getElementById('newForumTitle');
    var desc = document.getElementById('newForumDescription');
    if(title.value === "" || desc.value === "") {
      alert("Fill out the form, yo!");
      return;
    }
    Forums.insert({
      title: title.value,
      description: desc.value,
      owner: Meteor.userId()
    }, function() {
      title.value = "";
      desc.value = "";
    });
  }
});