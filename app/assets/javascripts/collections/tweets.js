TwitterClone.Collections.Tweets = Backbone.Collection.extend({
  url: function() {
    return '/api/users/' + this._user.id + '/tweets';
  },
  
  model: TwitterClone.Models.Tweet,
  
  getOrFetch: function(id, callback) {
    var tweet = this.get(id);
    
    if (!tweet) {
      tweet = new this.model({ id: id });
      tweet.fetch({
        success: function(model, response) {
          this.add(model);
          callback(model);
        }.bind(this)
      });
    } else {
      callback(tweet);
      tweet.fetch();
    }
    
    return tweet;
  }
  
  // initialize: function(options) {
  //   this._user = options.user;
  // }
});