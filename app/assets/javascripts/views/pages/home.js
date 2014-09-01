TwitterClone.Views.Home = Backbone.View.extend({
  template: JST['pages/home'],
  
  tagName: 'main',
  
  className: 'clear-fix',
  
  initialize: function() {
    this.listenTo(TwitterClone.currentUser, 'sync', this.render);
  },
  
  render: function() {
    var content = this.template({ currentUser: TwitterClone.currentUser });
    this.$el.html(content);
    return this;
  }
});