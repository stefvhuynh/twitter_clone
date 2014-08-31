TwitterClone.Subsets.MentionedUsers = Backbone.Subset.extend({
  initialize: function(models, options) {
    this._tweet = options.tweet;
  }
});