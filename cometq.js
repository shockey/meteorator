if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    ServiceConfiguration.configurations.remove({
      service: "github"
    });
    ServiceConfiguration.configurations.insert({
      service: "github",
      clientId: process.env.GH_CLIENT_ID,
      loginStyle: "popup",
      secret: process.env.GH_SECRET
    });
  });
}
