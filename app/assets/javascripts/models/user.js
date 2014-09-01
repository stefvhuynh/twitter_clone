TwitterClone.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  getOrFetchFeed: function() {
    if (!this._feed) {
      this._feed = new TwitterClone.Subsets.Feed([], {
        user: this,
        parentCollection: TwitterClone.tweets
      });

      var that = this;
      this._feed.add(this.tweets().toJSON());

      this.followeds().forEach(function(followed) {
        TwitterClone.users.getOrFetch(followed.id, function(user) {
          that._feed.add(user.tweets().toJSON());
        });
      });
    }

    return this._feed;
  },

  tweets: function() {
    if (!this._tweets) {
      this._tweets = new TwitterClone.Subsets.UserTweets([], {
        user: this,
        parentCollection: TwitterClone.tweets
      });
    }

    return this._tweets;
  },

  followeds: function() {
    if (!this._followeds) {
      this._followeds = new TwitterClone.Subsets.Followeds([], {
        user: this,
        parentCollection: TwitterClone.users
      });
    }

    return this._followeds;
  },

  followers: function() {
    if (!this._followers) {
      this._followers = new TwitterClone.Subsets.Followers([], {
        user: this,
        parentCollection: TwitterClone.users
      });
    }

    return this._followers;
  },

  parse: function(response) {
    if (response.tweets) {
      this.tweets().set(response.tweets, { parse: true });
      delete response.tweets;
    }

    if (response.followeds) {
      this.followeds().set(response.followeds, { parse: true });
      delete response.followeds;
    }

    if (response.followers) {
      this.followers().set(response.followers, { parse: true });
      delete response.followers;
    }

    return response;
  }
});


