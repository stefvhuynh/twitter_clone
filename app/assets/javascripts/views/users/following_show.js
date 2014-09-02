TwitterClone.Views.FollowingShow = Backbone.View.extend({
  template: JST['users/following'],

  render: function() {
    var content = this.template({ following: this.collection });
    this.$el.html(content);
    return this;
  }
});