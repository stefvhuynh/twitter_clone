TwitterClone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  events: {
    'click #tweets-link': 'renderTweets',
    'click #following-link': 'renderFolloweds',
    'click #followers-link': 'renderFollowers'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    // Maybe listen to the model's tweets for updates...
  },

  render: function() {
    var content = this.template({
      user: this.model
    });

    this.$el.html(content);
    this.$subviewEl = this.$el.find('#subview-container');

    this.renderTweets();
    return this;
  },

  renderTweets: function(event) {
    if (event) event.preventDefault();

    var subview = new TwitterClone.Views.TweetsIndex({
      collection: this.model.tweets()
    });

    this._swapSubview(subview);
  },

  renderFolloweds: function(event) {
    event.preventDefault();

    var subview = new TwitterClone.Views.FollowingShow({
      collection: this.model.followeds()
    });

    this._swapSubview(subview);
  },

  renderFollowers: function(event) {
    event.preventDefault();

    var subview = new TwitterClone.Views.FollowingShow({
      collection: this.model.followers()
    });

    this._swapSubview(subview);
  },

  _swapSubview: function(subview) {
    this.currentSubiew && this.currentSubview.remove();
    this.currentSubview = subview;
    this.$subviewEl.html(subview.render().$el);
  },

  remove: function() {
    this.currentSubview.remove();
    Backbone.View.prototype.remove.call(this);
  }
});




