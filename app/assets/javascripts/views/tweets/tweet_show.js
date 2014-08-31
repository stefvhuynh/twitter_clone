TwitterClone.Views.TweetShow = Backbone.View.extend({
  template: JST['tweets/show'],
  
  tagName: 'main',
  
  render: function() {
    var content = this.template({ tweet: this.model });
    this.$el.html(content);
    return this;
  }
});