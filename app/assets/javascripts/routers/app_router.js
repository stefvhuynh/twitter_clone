TwitterClone.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    // Consider passing in global users collection for modularity...
  },
  
  routes: {
    'users/:id': 'userShow'
  },
  
  userShow: function(id) {
    var user = TwitterClone.users.getOrFetch(id);
    var view = new TwitterClone.Views.UserShow({ model: user });
    this._swapView(view);
  },
  
  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});