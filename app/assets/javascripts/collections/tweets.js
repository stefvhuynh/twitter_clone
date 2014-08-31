TwitterClone.Collections.Tweets = Backbone.Collection.extend({
  url: function() {
    return '/api/users/' + this._user + '/tweets';
  },
  
  model: TwitterClone.Models.Tweet,
  
  initialize: function(options) {
    this._user = options.user;
  }
});