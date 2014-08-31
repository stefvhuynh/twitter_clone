TwitterClone.Views.UserShow = Backbone.View.extend({
  tagName: 'main',

  className: 'clear-fix',

  template: JST['users/show'],

  subTemplate: JST['tweets/tweets'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(
      this.model.tweets(), 
      'sync add remove reset destroy', 
      this.renderTweets
    );
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.renderTweets();
    return this;
  },

  renderTweets: function() {
    var content = this.subTemplate({ 
      tweets: this.model.tweets(),
      user: this.model
    });
    
    $('.tweets-list').html(content);
    return this;
  }
});


