//////// HELPERS

Template.forum.helpers({
  friendlyUsername: function() {
    return Meteor.users.findOne({_id: this.asker}).profile.name;
  },
  isOwner: function(){
    return !!(Meteor.userId() === this.owner)
  },
  isVoteable: function(){
    return Forums.findOne(this._id).voteable;
  },
  isEditable: function(){
    return Forums.findOne(this._id).editable;
  }
});

Template.forumOwnerControls.helpers({
  isVoteable: function(){
    return Forums.findOne(this._id).voteable;
  },
  isEditable: function(){
    return Forums.findOne(this._id).editable;
  }
});

Template.questions.helpers({
  getQuestions: function(){
    return Questions.find({forum: this._id}, {sort: {score: -1}});
  },
  isAsker: function(){
    return !!(Meteor.userId() === this.asker)
  },
  friendlyUsername: function() {
    return Meteor.users.findOne({_id: this.asker}).profile.name;
  },
  qScore: function(){
    return this.score;
  },
  isVoteable: function(){
    console.log(this);
    return Forums.findOne(this.forum).voteable && !!Meteor.userId();
  },
  hasBeenUpvotedByUser: function(){
    var i = this.upvoters.indexOf(Meteor.userId());
    return i > -1 ? true : false;
  },
  hasBeenDownvotedByUser: function(){
    var i = this.downvoters.indexOf(Meteor.userId());
    return i > -1 ? true : false;
  }
});

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

Template.submitBox.helpers({
  isUserLoggedIn: function() {
    var user = Meteor.user();

    if(user) {
      return true;
    } else{
      return false;
    }
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
  'click .delete': function(){
    return Forums.remove({_id: this._id});
  },
  'click .submit': function(){
    var content = document.getElementById('newQuestion');

    Questions.insert({
      content: content.value,
      asker: Meteor.userId(),
      forum: this._id,
      upvoters: [],
      downvoters: [],
      score: 0
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
      owner: Meteor.userId(),
      editable: true,
      voteable: true
    }, function() {
      title.value = "";
      desc.value = "";
    });
  }
});

Template.questions.events({
  'click .up': function(){
    if(this.upvoters.indexOf(Meteor.userId()) === -1) {
      if(this.downvoters.indexOf(Meteor.userId()) !== -1) {
        Questions.update({_id: this._id},{$set: {score: this.score + 2}})

      } else {
        Questions.update({_id: this._id},{$set: {score: this.score + 1}})
      }
      Questions.update({_id: this._id},{$pull: {downvoters: Meteor.userId()}})
      Questions.update({_id: this._id},{$push: {upvoters: Meteor.userId()}})
      $(event.target).addClass('green');
      $(event.target).siblings('.down').removeClass('red');
    }
  },
  'click .down': function(){
    if(this.downvoters.indexOf(Meteor.userId()) === -1) {
      if(this.upvoters.indexOf(Meteor.userId()) !== -1) {
        Questions.update({_id: this._id},{$set: {score: this.score - 2}})
      } else {
        Questions.update({_id: this._id},{$set: {score: this.score - 1}})
      }
      Questions.update({_id: this._id},{$pull: {upvoters: Meteor.userId()}})
      Questions.update({_id: this._id},{$push: {downvoters: Meteor.userId()}})
      $(event.target).addClass('red');
      $(event.target).siblings('.up').removeClass('green');
    }
  },
  'click .value': function(){
    if(this.upvoters.indexOf(Meteor.userId()) !== -1) {
      Questions.update({_id: this._id},{$set: {score: this.score - 1}})
    }
    if(this.downvoters.indexOf(Meteor.userId()) !== -1) {
      Questions.update({_id: this._id},{$set: {score: this.score + 1}})
    }
    Questions.update({_id: this._id},{$pull: {upvoters: Meteor.userId()}})
    Questions.update({_id: this._id},{$pull: {downvoters: Meteor.userId()}})
    $(event.target).next().children('i').removeClass('green');
    $(event.target).next().children('i').removeClass('red');
  }
})

Template.forumOwnerControls.events({
  'click #submissionsCtrl': function(event){
    if(event.target.textContent === "New Submissions Off") {
      $(event.target).addClass('green');
      $(event.target).text('New Submissions On');
      Forums.update({_id: this._id},{$set: {editable: true}});
    } else {
      $(event.target).removeClass('green');
      $(event.target).text('New Submissions Off');
      Forums.update({_id: this._id},{$set: {editable: false}});

    }
  },
  'click #votingCtrl': function(){
    if(event.target.textContent === "Voting Off") {
      $(event.target).addClass('green');
      $(event.target).text('Voting On');
      Forums.update({_id: this._id},{$set: {voteable: true}});
    } else {
      $(event.target).removeClass('green');
      $(event.target).text('Voting Off');
      Forums.update({_id: this._id},{$set: {voteable: false}});
    }
  },

})