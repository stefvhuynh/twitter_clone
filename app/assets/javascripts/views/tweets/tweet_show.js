TwitterClone.Views.TweetShow = Backbone.View.extend({

  // Will need to add a partial template for replies...

  template: JST['tweets/show'],
  tagName: 'main',
  className: 'tweet-main',

  initialize: function(options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({
      tweet: this.model,
      user: this.model.user()
    });

    this.$el.html(content);
    return this;
  }
});


