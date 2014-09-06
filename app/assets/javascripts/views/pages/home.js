TwitterClone.Views.Home = Backbone.View.extend({
  template: JST['pages/home'],
  tagName: 'main',
  className: 'clear-fix',

  events: {
    'click #user-card-new-tweet': 'toggleNewTweetForm',
    'blur .new-tweet-textbox': 'toggleNewTweetForm',
    'submit #user-card-new-tweet-form': 'submit'
  },

  initialize: function(options) {
    this.listenTo(TwitterClone.feed, 'sync', this.render);
    this.listenTo(TwitterClone.currentUser, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
      user: TwitterClone.currentUser,
      tweets: TwitterClone.feed
    });

    this.$el.html(content);
    this.listenForScroll();
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
  
  listenForScroll: function() {
    $(window).off('scroll');
    var throttledCallback = _.throttle(this.nextPage.bind(this), 1000);
    $(window).on('scroll', throttledCallback);
  },

  nextPage: function() {
    var that = this;

    if ($(window).scrollTop() === $(document).height() - $(window).height()) {
      if (TwitterClone.feed.pageNumber < TwitterClone.feed.totalPages) {
        $.ajax({
          type: 'GET',
          url: '/api/feed',
          data: { page: TwitterClone.feed.pageNumber + 1 },
          success: function(data) {
            TwitterClone.feed.pageNumber++;
          }
        });
      }
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



