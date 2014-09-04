window.TwitterClone = {
  Models: {},
  Collections: {},
  Subsets: {},
  Views: {},
  Routers: {},

  initialize: function(options) {
    TwitterClone.users = new TwitterClone.Collections.Users();
    TwitterClone.tweets = new TwitterClone.Collections.Tweets();
    TwitterClone.feed = new TwitterClone.Subsets.Feed([], {
      parentCollection: TwitterClone.tweets
    });

    TwitterClone.currentUser = new TwitterClone.Models.User({
      id: window.currentUserId
    });

    TwitterClone.currentUser.fetch({
      success: function(model, response) {
        TwitterClone.users.add(model);
        new TwitterClone.Routers.AppRouter({ $rootEl: $('#content') });
        Backbone.history.start();
      }
    });
  }
};
