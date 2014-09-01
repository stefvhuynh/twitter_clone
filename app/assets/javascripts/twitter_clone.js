window.TwitterClone = {
  Models: {},
  Collections: {},
  Subsets: {},
  Views: {},
  Routers: {},

  initialize: function() {
    TwitterClone.users = new TwitterClone.Collections.Users();
    TwitterClone.tweets = new TwitterClone.Collections.Tweets();

    TwitterClone.currentUser = new TwitterClone.Models.User({
      id: window.currentUserId
    });

    TwitterClone.feed = new TwitterClone.Subsets.Feed([], {
      parentCollection: TwitterClone.tweets
    });

    TwitterClone.feed.fetch();

    TwitterClone.currentUser.fetch({
      success: function(model, response) {
        TwitterClone.users.add(model);
        new TwitterClone.Routers.AppRouter({ $rootEl: $('#content') });
        Backbone.history.start();
      }
    });
  }
};
