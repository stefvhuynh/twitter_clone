TwitterClone.Views.MentionsShow = Backbone.View.extend({
  template: JST['pages/mentions'],
  tagName: 'main',
  className: 'search-results clear-fix',
  
  initialize: function() {
    this.listenTo(this.collection, 'sync add remove', this.render);
  },
  
  render: function() {
    var content = this.template({ tweets: this.collection });
    this.$el.html(content);
    return this;
  }
});