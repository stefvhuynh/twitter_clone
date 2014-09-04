TwitterClone.Views.TweetNew = Backbone.View.extend({
  template: JST['tweets/new'],

  events: {
    'submit form': 'submit',
    'click .new-tweet-modal-close': 'remove'
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();

    var tweetData = $(event.target).serializeJSON().tweet;
    TwitterClone.currentUser.tweets().create(tweetData);
    // REQUESTING GET API/USERS

    this.remove();
  },

  remove: function() {
    window.history.back();
    Backbone.View.prototype.remove.call(this);
  }
});