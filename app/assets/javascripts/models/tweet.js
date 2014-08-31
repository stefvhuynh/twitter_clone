TwitterClone.Models.Tweet = Backbone.Model.extend({
  urlRoot: '/api/tweets',
  
  user: function() {
    if (!this._user) {
      // Consider refactoring for modularity...
      this._user = TwitterClone.users.getOrFetch(this.get('user_id'));
    }
    
    return this._user;
  },
  
  mentionedUsers: function() {
    if (!this._mentionedUsers) {
      this._mentionedUsers = new TwitterClone.Subsets.MentionedUsers([], { 
        tweet: this,
        // Consider refactoring for modularity...
        parentCollection: TwitterClone.users
      });
    }
    
    return this._mentionedUsers;
  },
  
  parse: function(response) {
    if (response.mentioned_users) {
      this.mentionedUsers().set(response.mentioned_users, { parse: true });
      delete response.mentioned_users;
    }
    
    return response;
  }
});


