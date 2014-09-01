TwitterClone.Views.Home = Backbone.View.extend({
  template: JST['pages/home'],
  tagName: 'main',
  className: 'clear-fix',

  initialize: function() {
    this.listenTo(TwitterClone.feed, 'sync add', this.render);
  },

  render: function() {
    var content = this.template({
      user: TwitterClone.currentUser,
      tweets: TwitterClone.feed
    });

    this.$el.html(content);
    return this;
  }
});