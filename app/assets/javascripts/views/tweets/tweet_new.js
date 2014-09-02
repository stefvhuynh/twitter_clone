TwitterClone.Views.TweetNew = Backbone.View.extend({
  template: JST['tweets/new'],

  events: {
    'submit form': 'submit'
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var tweetData = $(event.target).serializeJSON();
    TwitterClone.currentUser.tweets().create(tweetData);
    this.remove();

  }
});