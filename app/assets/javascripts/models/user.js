TwitterClone.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

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

  toJSON: function() {
    return {
      user: _.clone(this.attributes)
    }
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
    
    this.tweetCount = parseInt(response.tweet_count);
    this.followedCount = parseInt(response.followed_count);
    this.followerCount = parseInt(response.follower_count);
    this.pageNumber = parseInt(response.page_number);
    this.totalPages = parseInt(response.total_pages);
    
    delete response.tweet_count;
    delete response.followed_count;
    delete response.follower_count;
    delete response.page_number;
    delete response.total_pages;

    return response;
  }
});


