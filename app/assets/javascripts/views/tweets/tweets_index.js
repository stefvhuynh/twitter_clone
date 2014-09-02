TwitterClone.Views.TweetsIndex = Backbone.View.extend({
  template: JST['tweets/index'],

  render: function() {
    var content = this.template({ tweets: this.collection });
    this.$el.html(content);
    return this;
  }
});