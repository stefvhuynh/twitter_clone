TwitterClone.Views.TweetNew = Backbone.View.extend({
  template: JST['tweets/new'],

  events: {
    'submit form': 'submit',
    'click .new-tweet-modal-close': 'remove',
    'keyup .new-tweet-textbox': 'updateCount'
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();

    var tweetData = $(event.target).serializeJSON().tweet;
    TwitterClone.currentUser.tweets().create(tweetData);

    this.remove();
  },
  
  updateCount: function(event) {
    var $countEl = this.$('.character-count');
    var count = 140 - $(event.currentTarget).val().length;
    $countEl.html(count);
    
    if (count < 0) {
      $countEl.addClass('under-count');
      this.$('.user-card-button').prop('disabled', true);
    } else if (count === 140) {
      this.$('.user-card-button').prop('disabled', true);
    } else {
      $countEl.removeClass('under-count');
      this.$('.user-card-button').prop('disabled', false);
    }
  },

  remove: function() {
    window.history.back();
    Backbone.View.prototype.remove.call(this);
  }
});