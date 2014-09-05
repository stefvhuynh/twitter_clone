TwitterClone.Views.SearchShow = Backbone.View.extend({
  template: JST['pages/search'],
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
  },

  render: function() {
    var content = this.template({
      users: this.users,
      tweets: this.tweets,
      query: this.query
    });

    this.$el.html(content);
    return this;
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
  }
});