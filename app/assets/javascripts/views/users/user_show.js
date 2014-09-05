TwitterClone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  events: {
    'click #tweets-link': 'renderTweets',
    'click #following-link': 'renderFolloweds',
    'click #followers-link': 'renderFollowers',
    'submit #follow-button-form': 'follow',
    'submit #unfollow-button-form': 'unfollow'
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.tweets(), 'sync add remove', this.render);
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

  follow: function(event) {
    event.preventDefault();
    var followData = $(event.target).serializeJSON();
    console.log(followData);

    $.ajax({
      type: 'POST',
      url: '/api/follows',
      data: followData,
      success: function(data) {

      }
    });
  },

  unfollow: function(event) {
    event.preventDefault();
    var followData = $(event.target).serializeJSON();

    $.ajax({
      type: 'DELETE',
      url: '/api/follows',
      data: followData,
      success: function(data) {

      }
    });
  },

  remove: function() {
    this.currentSubview.remove();
    Backbone.View.prototype.remove.call(this);
  },

  _swapSubview: function(subview) {
    this.currentSubiew && this.currentSubview.remove();
    this.currentSubview = subview;
    this.$subviewEl.html(subview.render().$el);
  }
});




