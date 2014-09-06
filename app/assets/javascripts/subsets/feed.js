TwitterClone.Subsets.Feed = Backbone.Subset.extend({
  url: '/api/feed',
  
  parse: function(response) {
    this.pageNumber = parseInt(response.page_number);
    this.totalPages = parseInt(response.total_pages);
    
    delete response.page_number;
    delete response.total_pages;
    
    return response.feed;
  }
});