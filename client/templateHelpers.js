//////// HELPERS

Template.prototype.helpers

Template.forum.helpers({
  questions: function(){
    return Questions.find({forum: this._id});
  },
  friendlyUsername: function() {
    return Meteor.users.findOne({_id: this.asker}).profile.name;
  },
  isAsker: function(){
    return !!(Meteor.userId() === this.asker)
  }
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
  },
  questionCount: function() {
    return Questions.find({forum: this._id}).count();
  }
});

//////// EVENTS

Template.forums.events({
  'click .delete': function() {
    console.log(Forums);
    Forums.remove({_id: this._id});
  }
});

Template.forum.events({
  'click .submit': function(){
    var content = document.getElementById('newQuestion');

    Questions.insert({
      content: content.value,
      asker: Meteor.userId(),
      forum: this._id
    }, function(){
      content.value = "";
    })
  },
  'click .deleteQ': function(){
    Questions.remove({_id: this._id});
  }
});

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