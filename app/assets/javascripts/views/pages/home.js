TwitterClone.Views.Home = Backbone.View.extend({
  template: JST['pages/home'],
  tagName: 'main',
  className: 'clear-fix',

  events: {
    'click #user-card-new-tweet': 'toggleNewTweetForm',
    'blur .new-tweet-textbox': 'toggleNewTweetForm',
    'submit #user-card-new-tweet-form': 'submit'
  },

  initialize: function() {
    this.listenTo(TwitterClone.feed, 'sync add remove', this.render);
  },

  render: function() {
    var content = this.template({
      user: TwitterClone.currentUser,
      tweets: TwitterClone.feed
    });

    this.$el.html(content);
    return this;
  },

  toggleNewTweetForm: function(event) {
    if (!$(event.relatedTarget).hasClass('user-card-button')) {
      event.preventDefault();
      $('#user-card-new-tweet').toggleClass('display-off');
      $('#user-card-new-tweet-form').toggleClass('display-off');
      $('.new-tweet-textbox').val('');
      $('.new-tweet-textbox').focus();
    }
  },

  submit: function(event) {
    event.preventDefault();

    var tweetData = $(event.target).serializeJSON().tweet;
    TwitterClone.currentUser.tweets().create(tweetData);

    this.toggleNewTweetForm(event);
    TwitterClone.feed.fetch();
  }
});



