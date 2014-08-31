TwitterClone.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',
  
  tweets: function() {
    if (!this._tweets) {
      this._tweets = new TwitterClone.Collections.Tweets([], { user: this });
    }
    
    return this._tweets;
  },
  
  parse: function(response) {
    if (response.tweets) {
      this.tweets().set(response.tweets, { parse: true });
      delete response.tweets;
    }
    
    return response;
  }
});