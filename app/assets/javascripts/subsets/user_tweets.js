TwitterClone.Subsets.UserTweets = Backbone.Subset.extend({
  initialize: function(models, options) {
    this._user = options.user;
  }// ,
//
//   parse: function(response) {
//     this.pageNumber = parseInt(response.page_number);
//     this.totalPages = parseInt(response.total_pages);
//     return response.models;
//   }
});