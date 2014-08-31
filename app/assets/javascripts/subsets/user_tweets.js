TwitterClone.Subsets.UserTweets = Backbone.Subset.extend({
  initialize: function(models, options) {
    this._user = options.user;
  }
});