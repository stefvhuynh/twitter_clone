TwitterClone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  events: {
    'click #tweets-link': 'renderTweets',
    'click #following-link': 'renderFolloweds',
    'click #followers-link': 'renderFollowers',
    'submit .unfollow-button-form': 'unfollow',
    'submit .follow-button-form': 'follow'
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

  unfollow: function(event) {
    event.preventDefault();
    var that = this;
    var followData = $(event.target).serializeJSON();

    $.ajax({
      type: 'DELETE',
      url: '/api/follows',
      data: followData,
      success: function(data) {
        var unfollowed = TwitterClone.users.add(data, { merge: true });
        unfollowed.followers().remove(that.model);
        that.model.followeds().remove(unfollowed);
      }
    });

    $(event.target).removeClass('unfollow-button-form')
      .addClass('follow-button-form')
      .find('.unfollow-button')
      .removeClass('blue-button')
      .addClass('white-button')
      .removeClass('unfollow-button')
      .addClass('follow-button')
      .html('Follow');
  },

  follow: function(event) {
    event.preventDefault();
    var that = this;
    var followData = $(event.target).serializeJSON();

    $.ajax({
      type: 'POST',
      url: '/api/follows',
      data: followData,
      success: function(data) {
        var followed = TwitterClone.users.add(data, { merge: true });
        followed.followers().add(that.model);
        that.model.followeds().add(followed);
      }
    });

    $(event.target).removeClass('follow-button-form')
      .addClass('unfollow-button-form')
      .find('.follow-button')
      .removeClass('white-button')
      .addClass('blue-button')
      .removeClass('follow-button')
      .addClass('unfollow-button')
      .html('<span></span>');
  },

  // listenForScroll: function() {
//     $(window).off('scroll');
//     var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
//     $(window).on('scroll', throttledCallback);
//   },
//
//   nextPage: function() {
//     var that = this;
//
//     if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
//       if (this.model.tweets())
//     }
//   },

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




