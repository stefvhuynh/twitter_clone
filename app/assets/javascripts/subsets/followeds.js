TwitterClone.Subsets.Followeds = Backbone.Subset.extend({
  initialize: function(options) {
    this._user = options.user;
  }// ,
//
//   url: function() {
//     return '/api/users' + this._user.id + 'followeds'
//   }
});