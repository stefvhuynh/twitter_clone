window.TwitterClone = {
  Models: {},
  Collections: {},
  Subsets: {},
  Views: {},
  Routers: {},
  
  initialize: function() {
    TwitterClone.users = new TwitterClone.Collections.Users();
    
    TwitterClone.currentUser = new TwitterClone.Models.User({ 
      id: window.currentUserId 
    });
    
    TwitterClone.currentUser.fetch({
      success: function(model, response) {
        TwitterClone.users.add(model);
        console.log(
          'Do something with the home page view now that we have the user!'
        );
      }
    });
    
    console.log('Instantiate router and render something!');
  }
};
