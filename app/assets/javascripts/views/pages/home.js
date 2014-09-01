TwitterClone.Views.Home = Backbone.View.extend({
  template: JST['pages/home'],
  feedTemplate: JST['tweets/tweets'],
  tagName: 'main',
  className: 'clear-fix',
  
  initialize: function() {
    this.listenTo(TwitterClone.currentUser, 'sync', this.render);
  },
  
  render: function() {
    var content = this.template({ 
      currentUser: TwitterClone.currentUser,
      feedTemplate: this.feedTemplate
    });
    
    this.$el.html(content);
    return this;
  }
});