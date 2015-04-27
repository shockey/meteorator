if (Meteor.isServer) {
  console.log();
  Meteor.startup(function () {
    ServiceConfiguration.configurations.remove({
      service: "github"
    });
    ServiceConfiguration.configurations.insert({
      service: "github",
      clientId: process.env.GH_CLIENT_ID,
      loginStyle: "popup",
      secret: process.env.GH_SECRET,
      domain: Meteor.absoluteUrl('',{})
    });
  });
}
