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
    var tweetData = $(event.target).serializeJSON();
    tweetData['tweet']['user_id'] = TwitterClone.currentUser.id;

    var newTweet = new TwitterClone.Models.Tweet(tweetData);
    newTweet.save();

    // TwitterClone.currentUser.tweets().create(tweetData, {
    //   url: TwitterClone.currentUser.tweets().url()
    // });

    TwitterClone.currentUser.tweets().unshift(newTweet);
    TwitterClone.feed.unshift(newTweet);

    this.remove();
  },

  remove: function() {
    window.history.back();
    Backbone.View.Prototype.remove.call(this);
  }
});