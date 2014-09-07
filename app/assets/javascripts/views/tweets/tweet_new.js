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
    var $countEl = $('.character-count');
    var count = parseInt($countEl.html());
    
    if (event.keyCode === 8) {
      if (count < 140) count += 1;
    } else {
      count -= 1;
    }
    
    $countEl.html(count);
    
    if (count < 0) {
      $countEl.addClass('under-count');
    } else {
      $countEl.removeClass('under-count');
    }
  },

  remove: function() {
    window.history.back();
    Backbone.View.prototype.remove.call(this);
  }
});