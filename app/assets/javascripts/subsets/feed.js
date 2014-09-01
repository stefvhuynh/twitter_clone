TwitterClone.Subsets.Feed = Backbone.Subset.extend({
  initialize: function(options) {
    this._user = options.user;    
    this.add(this._user.tweets());
    this._user.followeds().forEach(function(followed) {
      this.add(followed.tweets());
    }.bind(this));
  }
});