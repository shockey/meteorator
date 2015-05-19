if (Meteor.isClient) {
  $( document ).ready(function() {
    $('body').append(
      '<a href="http://hackreactor.com"> \
      <img style="position: fixed; top: 0; right: 0; border: 0;" \
      src="http://i.imgur.com/x86kKmF.png" \
      alt="Built at Hack Reactor"> \
      </a>'
    );
  });
}