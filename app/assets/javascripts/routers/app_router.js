TwitterClone.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    // Consider passing in global users & tweets collections for modularity...
  },

  routes: {
    '': 'home',
    'edit': 'currentUserEdit',
    'mentions': 'currentUserMentions',
    'users/:id': 'userShow',
    'tweets/new': 'tweetNew',
    'tweets/:id': 'tweetShow',
    'search': 'searchShow'
  },

  home: function() {
    var view = new TwitterClone.Views.Home();
    this._swapView(view);
    TwitterClone.feed.fetch();
  },

  currentUserEdit: function() {
    var view = new TwitterClone.Views.UserEdit({
      model: TwitterClone.currentUser
    });

    this._swapView(view);
  },
  
  currentUserMentions: function() {
    var mentions = new TwitterClone.Subsets.MentionedTweets([], {
      parentCollection: TwitterClone.tweets
    });
    
    mentions.fetch({
      success: function(models, response) {
        var view = new TwitterClone.Views.MentionsShow({
          collection: models
        });
        
        this._swapView(view);
      }.bind(this)
    });
  },

  userShow: function(id) {
    TwitterClone.users.getOrFetch(id, function(user) {
      var view = new TwitterClone.Views.UserShow({ model: user });
      this._swapView(view);
    }.bind(this));
  },

  tweetNew: function() {
    var view = new TwitterClone.Views.TweetNew();
    this.$rootEl.append(view.render().$el);
  },

  tweetShow: function(id) {
    TwitterClone.tweets.getOrFetch(id, function(tweet) {
      var view = new TwitterClone.Views.TweetShow({ model: tweet });
      this._swapView(view);
    }.bind(this));
  },

  searchShow: function(query) {
    var that = this;

    $.ajax({
      type: 'GET',
      url: '/api/search?' + query,
      dataType: 'json',
      success: function(data) {
        var users = TwitterClone.users.add(data.users, {
          merge: true,
          parse: true
        });

        var tweets = new TwitterClone.Subsets.SearchedTweets(data.tweets, {
          parentCollection: TwitterClone.tweets,
          parse: true
        });

        var view = new TwitterClone.Views.SearchShow({
          users: users,
          tweets: tweets,
          query: query,
          pageNumber: data.page_number,
          totalPages: data.total_pages
        });

        that._swapView(view);
      }
    });
  },

  _swapView: function(view) {
    // Put in a loading screen when you remove a view so that there is no lag...
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});






