TwitterClone.Views.FollowButton = Backbone.View.extend({
  template: JST['pages/follow_button'],

  events: {
    'submit #follow-button-form': 'follow',
    'submit #unfollow-button-form': 'unfollow'
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  },

  follow: function(event) {
    event.preventDefault();
    var followData = $(event.target).serializeJSON();
    console.log(followData);

    $.ajax({
      type: 'POST',
      url: '/api/follows',
      data: followData,
      success: function(data) {

      }
    });
  },

  unfollow: function(event) {
    event.preventDefault();
    var followData = $(event.target).serializeJSON();

    $.ajax({
      type: 'DELETE',
      url: '/api/follows',
      data: followData,
      success: function(data) {

      }
    });
  }
});




