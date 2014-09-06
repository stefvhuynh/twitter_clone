TwitterClone.Views.SearchShow = Backbone.View.extend({
  template: JST['pages/search'],
  tweetsTemplate: JST['tweets/tweets'],
  tagName: 'main',
  className: 'search-results clear-fix',

  events: {
    'submit .follow-button-form': 'follow',
    'submit .unfollow-button-form': 'unfollow'
  },

  initialize: function(options) {
    this.users = options.users;
    this.tweets = options.tweets;
    this.query = options.query;
    this.pageNumber = options.pageNumber;
    this.totalPages = options.totalPages;
    
    this.listenTo(this.tweets, 'sync add', this.renderTweets);
  },

  render: function() {
    var content = this.template({
      users: this.users,
      querySubject: this.query.split('=')[1]
    });
    
    this.$el.html(content);
    this.renderTweets();
    return this;
  },
  
  renderTweets: function() {
    var content = this.tweetsTemplate({ tweets: this.tweets });
    this.$el.find('.tweets-list').html(content);
    this.listenForScroll();
  },

  unfollow: function(event) {
    event.preventDefault();
    var that = this;
    var followData = $(event.target).serializeJSON();

    $.ajax({
      type: 'DELETE',
      url: '/api/follows',
      data: followData,
      success: function(data) {
        var unfollowed = TwitterClone.users.add(data, { merge: true });
        unfollowed.followers().remove(that.model);
        TwitterClone.currentUser.followeds().remove(unfollowed);
      }
    });

    $(event.target).removeClass('unfollow-button-form')
      .addClass('follow-button-form')
      .find('.unfollow-button')
      .removeClass('blue-button')
      .addClass('white-button')
      .removeClass('unfollow-button')
      .addClass('follow-button')
      .html('Follow');
  },

  follow: function(event) {
    event.preventDefault();
    var that = this;
    var followData = $(event.target).serializeJSON();

    $.ajax({
      type: 'POST',
      url: '/api/follows',
      data: followData,
      success: function(data) {
        var followed = TwitterClone.users.add(data, { merge: true });
        followed.followers().add(that.model);
        TwitterClone.currentUser.followeds().add(followed);
      }
    });

    $(event.target).removeClass('follow-button-form')
      .addClass('unfollow-button-form')
      .find('.follow-button')
      .removeClass('white-button')
      .addClass('blue-button')
      .removeClass('follow-button')
      .addClass('unfollow-button')
      .html('Following');
  },
  
  listenForScroll: function() {
    $(window).off('scroll');
    var throttledCallback = _.throttle(this.nextPage.bind(this), 500);
    $(window).on('scroll', throttledCallback);
  },

  nextPage: function() {
    var that = this;

    if ($(window).scrollTop() === $(document).height() - $(window).height()) {
      if (this.pageNumber < this.totalPages) {
        $.ajax({
          type: 'GET',
          url: '/api/search?' + this.query,
          data: { page: this.pageNumber + 1 },
          dataType: 'json',
          success: function(data) {
            that.pageNumber = parseInt(data.page_number);
            that.tweets.add(data.tweets);
          }
        });
      }
    }
  }
});