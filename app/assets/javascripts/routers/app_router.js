TwitterClone.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    // Consider passing in global users & tweets collections for modularity...
  },
  
  routes: {
    'users/:id': 'userShow',
    'tweets/:id': 'tweetShow'
  },
  
  userShow: function(id) {
    TwitterClone.users.getOrFetch(id, function(user) {
      var view = new TwitterClone.Views.UserShow({ model: user });
      this._swapView(view);
    }.bind(this));
  },
  
  tweetShow: function(id) {
    TwitterClone.tweets.getOrFetch(id, function(tweet) {
      var view = new TwitterClone.Views.TweetShow({ model: tweet });
      this._swapView(view);
    }.bind(this));
  },
  
  _swapView: function(view) {
    // Put in a loading screen when you remove a view so that there is no lag...
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});

