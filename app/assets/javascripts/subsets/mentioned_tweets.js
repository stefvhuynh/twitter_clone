TwitterClone.Subsets.MentionedTweets = Backbone.Subset.extend({
  url: '/api/mentions',
  
  parse: function(response) {
    return response.feed;
  }
});