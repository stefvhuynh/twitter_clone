TwitterClone.Views.SearchShow = Backbone.View.extend({
  template: JST['pages/search'],
  tagName: 'main',
  className: 'search-results clear-fix',

  events: {
    'submit #follow-button-form': 'follow',
    'submit #unfollow-button-form': 'unfollow'
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

  follow: function(event) {
    event.preventDefault();
    var followData = $(event.target).serializeJSON();
    console.log(followData);

    $.ajax({
      type: 'POST',
      url: '/api/follows',
      data: followData,
      success: function(data) {

      }
    });
  },

  unfollow: function(event) {
    event.preventDefault();
    var followData = $(event.target).serializeJSON();

    $.ajax({
      type: 'DELETE',
      url: '/api/follows',
      data: followData,
      success: function(data) {

      }
    });
  }
});