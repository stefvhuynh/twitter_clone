TwitterClone.Views.FollowButton = Backbone.View.extend({
  template: JST['pages/follow_button'],

  render: function() {
    var content = this.template({ user: this.model });
  }
});