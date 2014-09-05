TwitterClone.Views.SearchShow = Backbone.View.extend({
  template: JST['pages/search'],
  tagName: 'main',
  className: 'search-results clear-fix',

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
  }
});