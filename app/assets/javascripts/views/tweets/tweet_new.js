TwitterClone.Views.TweetNew = Backbone.View.extend({
  template: JST['tweets/new'],
  className: 'modal-overlay',

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});